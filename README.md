
# Financial Time Machine
IITGCS-2406-Team-66-67f7f220


**Financial Time Machine** is a modern, interactive personal finance simulator that helps users explore different financial outcomes based on their financial habits. It provides actionable insights, visualizations, and simulations to support smarter personal decision-making.

---

## Features

- Categorized user archetypes based on financial input
- Tailored advice and guidance
- Simulated “What-If” scenarios
- Dynamic visualizations (income, expenses, savings)
- Downloadable financial summaries (PDF)
- Modern, accessible UI

---

## Technologies Used

### Frontend
- **Next.js 15 (App Router)**
- **React + TypeScript**
- **TailwindCSS**
- **Chart.js**
- **HTML2PDF.js**
- **LocalStorage**

### Backend
- **FastAPI (Python)**
- **SQLite**
- **OpenAI API (GPT-4)** for financial guidance
- **Custom logic** for simulations and fallback scenarios

---

## Project Structure

```
financial_time_machine/
├── backend/
│   ├── ai_logic.py
│   ├── database.py
│   ├── exceptions.py
│   ├── fallback.py
│   ├── main.py
│   ├── models.py
│   ├── opentest.py
│   ├── progress.py
│   ├── projection.py
│   ├── session.py
│   ├── what_if.py
│   └── dataviz/
│       ├── __init__.py
│       └── visualization_utils.py
│
├── UI/
│   ├── app/
│   │   ├── input/
│   │   │   └── page.tsx
│   │   ├── landing/
│   │   │   └── page.tsx
│   │   ├── waiting/
│   │   │   └── page.tsx
│   │   ├── whatif/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   └── projection.tsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── tsconfig.json
│   └── package.json
│
├── datavis/
│   └── financial-time-machine/
│       ├── public/
│       │   ├── favicon.ico
│       │   ├── index.html
│       │   ├── logo192.png
│       │   ├── logo512.png
│       │   ├── manifest.json
│       │   └── robots.txt
│       ├── src/
│       │   ├── App.css
│       │   ├── App.js
│       │   ├── App.test.js
│       │   ├── chart.js
│       │   ├── index.css
│       │   ├── index.js
│       │   ├── logo.svg
│       │   ├── Pattern.js
│       │   ├── ProjectionChart.js
│       │   ├── reportWebVitals.js
│       │   └── setupTests.js
│       ├── package.json
│       └── package-lock.json
│
├── README.md
└── LICENSE
```

---

## Local Setup

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Next.js)
```bash
cd UI
npm install
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)  
Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## Deployment

- **Frontend** hosted on [Vercel](https://financial-time-machine-sandy.vercel.app)
- **Backend** hosted on [render](https://financial-time-machine-hqta.onrender.com)

---

## Known Issues

- AI advice is dependent on API key functionality; fallback system is in place
- PDF download requires frontend context and browser permission
- Currently optimized for local deployment

---

## Authors

- **Aman** – Lead, Frontend, UI/UX, Integration
- **Prateek** – Backend, FastAPI, AI integration
- **Kiran** – Financial modeling, data visualisation

---

## License

This is an academic project developed for learning and presentation purposes.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
