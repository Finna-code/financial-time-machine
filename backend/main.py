from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from database import save_user_data, get_user_data
from ai_logic import generate_financial_advice, generate_financial_quest
from fallback import fallback_financial_advice
from projection import get_financial_projection
from what_if import process_what_if
from session import create_session, export_csv, export_pdf
from progress import get_user_progress
from database import initialize_database
import sqlite3
import json

app = FastAPI(title="Financial Time Machine")
initialize_database()
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to the Financial Assistant API!"}

# Database Connection
def get_db_connection():
    return sqlite3.connect("finance.db", check_same_thread=False)

# Input model
class FinanceInput(BaseModel):
    name: str
    age: int
    occupation: str
    income: float
    expenses: float
    savings: float
    priorities: str
    notes: str

# Save data endpoint
@app.post("/input")
def save_financial_data(data: FinanceInput):
    user_id = save_user_data(
        data.name, data.age, data.occupation,
        data.income, data.expenses, data.savings,
        data.priorities, data.notes
    )
    if user_id is None:
        raise HTTPException(status_code=500, detail="Failed to save user data.")
    return {"message": "Data saved!", "user_id": user_id}

# Generate advice endpoint
@app.get("/generate_advice/{user_id}")
def generate_advice(user_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user_data = cursor.fetchone()
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    name, age, occupation, income, expenses, savings, _, _, priorities, notes = user_data[1:]

    # AI-generated advice
    ai_advice = generate_financial_advice(name, age, occupation, income, expenses, savings, priorities, notes)
     
    print("Final Parsed AI Advice:", ai_advice)
    if not isinstance(ai_advice, dict) or "archetype" not in ai_advice:
            ai_advice = {
                "archetype": "Unknown",
                "summary": "No valid AI response received.",
                "tips": ["Unable to generate financial advice due to API response issues"]
            }
    
    quest = generate_financial_quest(name, income, expenses, savings)

    return {
        "user": {
            "name": name, "age": age, "occupation": occupation,
            "income": income, "expenses": expenses, "savings": savings,
            "priorities": priorities, "notes": notes
        },
        "financial_advice": {
            "archetype": ai_advice.get("archetype", "Unknown"),
            "summary": ai_advice.get("summary", "No summary provided"),
            "tips": ai_advice.get("tips", ["No tips available"])
        },
        "financial_quest": quest
    }

# Fallback route
@app.get("/fallback_advice/{user_id}")
def get_fallback_advice(user_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, age, occupation, income, expenses, savings, priorities FROM users WHERE id=?", (user_id,))
        user_data = cursor.fetchone()

    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    user_id, name, age, occupation, income, expenses, savings, priorities = user_data

    # Ensure valid financial data before passing to fallback function
    if income is None or savings is None or not priorities:
        return {
            "error": "Missing financial data",
            "message": "Ensure user has income, savings, and financial priorities recorded."
        }

    
    # Generate fallback advice
    fallback_advice = fallback_financial_advice(income, savings, priorities)

    return {
        "user": {
            "name": name,
            "age": age,
            "occupation": occupation,
            "income": income,
            "expenses": expenses,
            "savings": savings,
            "priorities": priorities
        },
        "fallback_advice": fallback_advice
}

# Projection route
@app.get("/projection/{user_id}")
def fetch_projection(user_id: int):
    return get_financial_projection(user_id)

# What-if route
@app.post("/what_if/{user_id}")
def what_if_handler(
    user_id: int,
    change_savings: float = Query(...),
    change_expenses: float = Query(...),
    change_investments: float = Query(...)
):
    return process_what_if(user_id, change_savings, change_expenses, change_investments)

# Session creation
@app.post("/create_session/{user_id}")
def create_user_session(user_id: int):
    return create_session(user_id)

#generate adv
@app.post("/generate_advice")
def generate_direct_advice(data: FinanceInput):
    advice = generate_financial_advice(
        name=data.name,
        age=data.age,
        occupation=data.occupation,
        income=data.income,
        expenses=data.expenses,
        savings=data.savings,
        priorities=data.priorities,
        notes=data.notes
    )
    quest = generate_financial_quest(data.name, data.income, data.expenses, data.savings)
    return {
        "user": data,
        "financial_advice": advice,
        "financial_quest": quest
    }




# Export CSV
@app.get("/export_csv/{user_id}")
def export_user_csv(user_id: int):
    return export_csv(user_id)

# Export PDF
@app.get("/export_pdf/{user_id}")
def export_user_pdf(user_id: int):
    return export_pdf(user_id)

# Progress tracking
@app.get("/progress/{user_id}")
def financial_progress(user_id: int):
    return get_user_progress(user_id)
