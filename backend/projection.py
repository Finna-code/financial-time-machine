import sqlite3

def get_financial_projection(user_id: int):
    conn = sqlite3.connect("finance.db", check_same_thread=False)
    cursor = conn.cursor()
    
    cursor.execute("SELECT income, savings, investments FROM users WHERE id=?", (user_id,))
    user_data = cursor.fetchone()

    if not user_data:
        return {"error": "User not found"}

    income, savings, investments = user_data

    # Financial projection calculations
    projected_growth = investments * 1.05  # Assuming 5% annual growth
    future_savings = savings + projected_growth

    return {
        "current_savings": savings,
        "projected_future_savings": round(future_savings, 2)
    }