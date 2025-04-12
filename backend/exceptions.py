from fastapi import HTTPException

def handle_user_not_found():
    raise HTTPException(status_code=404, detail="User not found")

def handle_database_error():
    raise HTTPException(status_code=500, detail="Server error occurred while processing your request")
