import sqlite3
from ai_logic import generate_financial_advice

def process_what_if(user_id: int, change_savings: float, change_expenses: float, change_investments: float):
    conn = sqlite3.connect("finance.db", check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute("CREATE INDEX IF NOT EXISTS user_index ON users(id)")
    cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
    user_data = cursor.fetchone()

    if not user_data:
        return {"error": "User not found"}

    name, age, occupation, income, expenses, savings, priorities, notes = user_data[1:]

    # Modify financial inputs
    updated_savings = savings + change_savings
    updated_expenses = expenses + change_expenses
    if updated_expenses > income * 0.8:
        return {"warning": "High expense ratio detected! Consider reducing unnecessary costs."}
    updated_investments = (user_data[4] + change_investments)

    # Generate AI-based financial advice on new inputs
    updated_advice = generate_financial_advice(name, age, occupation, income, updated_expenses, updated_savings, priorities, notes)

    # Financial projection logic
    projected_growth = updated_investments * 1.05  # Assuming 5% growth
    future_savings = updated_savings + projected_growth

    return {
        "updated_archetype": updated_advice.get("archetype", "Unknown"),
        "revised_tips": updated_advice.get("tips", ["No updated advice available"]),
        "adjusted_financial_simulation": {
            "new_savings": round(updated_savings, 2),
            "new_projected_future_savings": round(future_savings, 2)
        }
    }
