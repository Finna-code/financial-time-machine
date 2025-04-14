# Financial Time Machine

IITGCS-2406-Team-66-67f7f220

**Financial Time Machine** is an interactive personal finance simulator built to explore hypothetical financial futures based on a user's financial input. It generates personalized insights using AI, simulates “What-If” scenarios, and presents dynamic visualizations to support smarter decision-making.

---

## 🔍 Features

- Archetype classification based on user financial behavior
- Tailored financial guidance using OpenAI GPT-4
- Simulation of financial futures and projections
- Dynamic charts and visualizations (income, expenses, savings)
- Downloadable summaries as PDF
- Fast, responsive UI built with modern tooling
- Local storage support for continuity

---

## 🧰 Technologies Used

### Frontend
- **Next.js 15 (App Router)**
- **React + TypeScript**
- **TailwindCSS**
- **Chart.js**
- **HTML2PDF.js**
- **Browser LocalStorage**

### Backend
- **FastAPI (Python 3.11+)**
- **SQLite**
- **OpenAI API (GPT-4)**
- **Fallback logic for offline simulation**

---

## 📁 Project Structure

<details>
<summary> <b>Click here to expand</b> </summary>

<br>

```plaintext
financial_time_machine/
├── backend/
│   ├── main.py               # FastAPI entry point
│   ├── projection.py         # Future simulation logic
│   ├── fallback.py           # GPT-free fallback engine
│   ├── session.py            # Session handling
│   ├── models.py             # SQLite schema
│   └── dataviz/              # Backend-side visualization utilities
│
├── UI/
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── styles/               # Global styles (Tailwind)
│   ├── tsconfig.json         # TypeScript config
│   └── package.json
│
├── datavis/
│   └── financial-time-machine/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── package-lock.json
│
├── README.md
└── LICENSE
```
</br>
</details>

---

## ⚙️ Local Setup

To run the project locally, you'll need to launch both the backend (FastAPI) and the frontend (Next.js) environments separately.  
Make sure you have **Python 3.11+** installed for the backend, and **Node.js (v18 or higher)** for the frontend.

Each part must be started from its respective directory.  
Follow the steps below to get both running on your local machine.

### [Backend](http://127.0.0.1:8000) (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### [Frontend](http://localhost:3000) (Next.js)
```bash
cd UI
npm install
npm run dev
```

---

## 🌐 Deployment

**Frontend: Hosted on [Vercel](https://financial-time-machine-sandy.vercel.app)**

**Backend: Hosted on [Render](https://financial-time-machine-hqta.onrender.com)**

Deployment may vary depending on the branch and configuration.
For local testing, follow the setup instructions above.

---

## 🧪 Known Issues
- GPT-based advice depends on OpenAI API key functionality

- PDF download only works in a browser context

- Backend must be running locally for full functionality if not deployed

- Some layout features may be optimized for desktop

---

## 📝 Authors

- **Aman** – Lead, Frontend, UI/UX, Integration
- **Prateek** – Backend, FastAPI, AI integration
- **Kiran** – Financial modeling, data visualisation

---

## License

- This is an academic project developed for learning and presentation purposes.

- This is a [Next.js](https://nextjs.org) project bootstrapped with [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---
