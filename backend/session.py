import sqlite3
import pandas as pd
import os
from fpdf import FPDF

# Database Connection
def get_db_connection():
    return sqlite3.connect("finance.db", check_same_thread=False)

# Ensure sessions table exists
def initialize_sessions_table():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY,
                user_id INTEGER
            )
        ''')
        conn.commit()

# Create session tracking (session ID)
def create_session(user_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO sessions (user_id) VALUES (?)", (user_id,))
        conn.commit()
        session_id = cursor.lastrowid

    return {"message": "Session created", "session_id": session_id}

# Generate CSV Report
def export_csv(user_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # Fetch column names dynamically from the database
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]  # Get column names

        # Fetch user data from the database
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user_data = cursor.fetchone()

    if not user_data:
        return {"error": "User not found"}

    # Ensure 'exports' folder exists
    os.makedirs("exports", exist_ok=True)

    try:
        # Convert SQL tuple into Pandas DataFrame with exact matching column names
        df = pd.DataFrame([user_data], columns=columns)

        # Save CSV file properly
        csv_file = f"exports/user_{user_id}.csv"
        df.to_csv(csv_file, index=False, encoding="utf-8")

        return {"message": "CSV Exported Successfully", "file": csv_file}
    
    except Exception as e:
        return {"error": f"CSV export failed: {str(e)}"}

# Generate PDF Report
def export_pdf(user_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user_data = cursor.fetchone()

    if not user_data:
        return {"error": "User not found"}

    # Ensure 'exports' folder exists
    os.makedirs("exports", exist_ok=True)

    # Create PDF Report
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Financial Report for {user_data[1]}", ln=True, align="C")
    pdf.cell(200, 10, txt=f"Occupation: {user_data[3]}", ln=True)
    pdf.cell(200, 10, txt=f"Income: {user_data[4]}", ln=True)
    pdf.cell(200, 10, txt=f"Savings: {user_data[6]}", ln=True)

    pdf_file = f"exports/user_{user_id}.pdf"
    pdf.output(pdf_file)

    return {"message": "PDF Exported", "file": pdf_file}

# Initialize Sessions Table on Startup
initialize_sessions_table()
