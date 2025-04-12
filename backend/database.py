import sqlite3
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    conn = sqlite3.connect("finance.db", check_same_thread=False)
    try:
        yield conn
    finally:
        conn.close()

def initialize_database():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                age INTEGER NOT NULL CHECK (age >= 18),
                occupation TEXT,
                income FLOAT NOT NULL,
                expenses FLOAT NOT NULL,
                savings FLOAT DEFAULT 0,
                investments FLOAT DEFAULT 0,
                debt FLOAT DEFAULT 0,
                priorities TEXT,
                notes TEXT
            )
        ''')
        cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
        conn.commit()

def save_user_data(name, age, occupation, income, expenses, savings, priorities, notes):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO users (name, age, occupation, income, expenses, savings, priorities, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (name, age, occupation, income, expenses, savings, priorities, notes))
            conn.commit()
            return cursor.lastrowid
    except sqlite3.Error as e:
        raise Exception(f"Database error: {e}")

def get_user_data(user_id):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
            return cursor.fetchone()
    except sqlite3.Error as e:
        raise Exception(f"Database error: {e}")

# Initialize database when script runs
initialize_database()