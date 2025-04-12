from database import get_db_connection

def get_user_progress(user_id: int):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT savings FROM users WHERE id=?", (user_id,))
            result = cursor.fetchone()

            if not result:
                return {"error": "User not found"}

            savings = result[0]

        # Define progress levels based on savings
        if savings > 100000:
            return {
                "level": "Financial Mastery",
                "reward": "🏆 Elite Investor Badge!"
            }
        elif savings > 50000:
            return {
                "level": "Smart Investor",
                "reward": "💡 Advanced Wealth Planner Badge!"
            }
        elif savings > 25000:
            return {
                "level": "Saver Pro",
                "reward": "📈 Budgeting Champion Badge!"
            }
        else:
            return {
                "level": "Beginner",
                "reward": "🔰 Smart Spending Badge"
            }

    except Exception as e:
        return {"error": f"An error occurred while fetching progress: {str(e)}"}
