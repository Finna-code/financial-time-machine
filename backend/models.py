from pydantic import BaseModel, Field

class FinanceInput(BaseModel):
    name: str = Field(..., min_length=1)
    age: int = Field(..., ge=18)
    occupation: str
    income: float = Field(..., ge=0)
    expenses: float = Field(..., ge=0)
    savings: float = Field(..., ge=0)
    priorities: str
    notes: str
