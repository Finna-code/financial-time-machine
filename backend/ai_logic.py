import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from functools import lru_cache

load_dotenv()

@lru_cache(maxsize=None)
def get_openai_api_key():
    return os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=get_openai_api_key())

def generate_financial_advice(name, age, occupation, income, expenses, savings, priorities, notes):
    print("👀 generate_financial_advice() called")
    print("🔑 API key starts with:", get_openai_api_key()[:10])

    prompt = f"""
    You are an AI financial advisor. Provide structured financial insights in JSON format only.

    User Profile:
    Name: {name}
    Age: {age}
    Occupation: {occupation}
    Income: {income}
    Expenses: {expenses}
    Savings: {savings}
    Financial Priorities: {priorities}
    Notes: {notes}

    Task:
    - Identify a financial archetype (e.g., "Risk-Taker", "Saver", "Investor").
    - Summarize their financial status concisely.
    - Suggest three actionable financial tips.
    - Assign a financial quest based on spending and savings habits.

    Response format (JSON ONLY):
    {{
        "archetype": "Saver",
        "summary": "You are cautious with spending and prioritize stability.",
        "tips": [
            "Increase investments by 10% for early retirement.",
            "Reduce unnecessary spending to boost savings.",
            "Consider tax-saving mutual funds."
        ],
        "quest": "Save ₹5000 more this month to upgrade to Smart Investor!"
    }}

    Return ONLY valid JSON. Do NOT return any extra explanations or disclaimers.
    """

    try:
        print("📡 Sending request to OpenAI...")
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        print("✅ OpenAI responded!")

        ai_output = response.choices[0].message.content
        print("🧠 AI Response:", ai_output)

        if not ai_output.startswith("{"):
            raise ValueError("Invalid AI response format")

        return json.loads(ai_output)

    except Exception as e:
        print("🔥 FULL EXCEPTION:")
        import traceback
        traceback.print_exc()

    from fallback import fallback_financial_advice
    return fallback_financial_advice(income, savings, priorities)


def generate_financial_quest(name, income, expenses, savings):
    if savings < income * 0.2:
        return f"🛡️ {name}, your goal: Save ₹{income * 0.1:.2f} more this month to level up! Unlock the 'Smart Saver' badge!"
    elif expenses > income * 0.7:
        return f"⚠️ {name}, Try cutting unnecessary spending by ₹{expenses * 0.1:.2f} to unlock new badges and gain better financial health!"
    else:
        return f"🚀 {name}, You're financially stable! Challenge: Explore new investment strategies to upgrade to 'Wealth Master'!"
