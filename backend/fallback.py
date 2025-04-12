def fallback_archetype(income, savings):
    if income is None or savings is None:
        return "Unknown"

    if savings > income * 0.5:
        return "Saver"
    elif savings > income * 0.2:
        return "Balanced Planner"
    else:
        return "Spender"

def fallback_financial_advice(income, savings, priorities):
    # Ensure all values exist before processing
    if income is None or savings is None or not priorities:
        return {
            "archetype": "Unknown",
            "summary": "Financial data missing.",
            "tips": ["Ensure your financial details are entered correctly."]
        }

    archetype = fallback_archetype(income, savings)
    summary = f"You are a {archetype}, balancing between {priorities} and financial stability."

    tips = [
        "Automate savings transfers.",
        "Invest in diverse assets for risk management.",
        "Track unnecessary expenses."
    ]

    return {"archetype": archetype, "summary": summary,"tips":tips}