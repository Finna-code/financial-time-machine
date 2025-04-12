import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const prioritiesList = [
  "Savings",
  "Debt Clearance",
  "Insurance",
  "Investing",
  "Spending",
  "Emergency Fund",
];

const App = () => {
  const [income, setIncome] = useState(() => Number(localStorage.getItem("income")) || 3000);
  const [savings, setSavings] = useState(() => Number(localStorage.getItem("savings")) || 500);
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem("expenses")) || []);
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem("goals")) || [
    { name: "Buy a Laptop", amount: 1500, date: "2025-10-01" },
  ]);

  const [form, setForm] = useState({ name: "", age: "", occupation: "" });
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  useEffect(() => {
    localStorage.setItem("income", income);
    localStorage.setItem("savings", savings);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [income, savings, expenses, goals]);

  const handlePriorityChange = (priority) => {
    if (selectedPriorities.includes(priority)) {
      setSelectedPriorities(selectedPriorities.filter((p) => p !== priority));
    } else if (selectedPriorities.length < 2) {
      setSelectedPriorities([...selectedPriorities, priority]);
    }
  };

  const addGoal = () => setGoals([...goals, { name: "", amount: 0, date: dayjs().add(6, "month").format("YYYY-MM-DD") }]);
  const updateGoal = (index, field, value) => {
    const updated = [...goals];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setGoals(updated);
  };

  const totalMonthlyExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const netMonthlySaving = income - totalMonthlyExpenses;

  const addExpense = () => setExpenses([...expenses, { category: "", amount: 0 }]);
  const updateExpense = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = field === "amount" ? Number(value) : value;
    setExpenses(updated);
  };

  const simulation = (() => {
    const months = 6;
    const result = [];
    let net = savings;
    const today = dayjs();
    for (let i = 0; i < months; i++) {
      net += netMonthlySaving;
      result.push({ date: today.add(i, "month").format("YYYY-MM"), net });
    }
    return result;
  })();

  const chartData = {
    labels: simulation.map((d) => d.date),
    datasets: [
      {
        label: "Projected Savings",
        data: simulation.map((d) => d.net),
        borderColor: "#60a5fa",
        backgroundColor: "#93c5fd",
        fill: false,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "6-Month Financial Projection" },
    },
    scales: {
      y: { title: { display: true, text: "Net Savings (₹)" } },
    },
  };

  const getGoalAdvice = (goal) => {
    const monthsLeft = dayjs(goal.date).diff(dayjs(), "month");
    const requiredMonthly = (goal.amount - savings) / monthsLeft;
    if (requiredMonthly > netMonthlySaving)
      return `⚠️ Not on track. You need ₹${requiredMonthly.toFixed(2)}/mo to reach "${goal.name}"`;
    if (savings >= goal.amount)
      return `✅ Goal "${goal.name}" achieved!`;
    if (savings >= goal.amount / 2)
      return `🎉 Halfway there for "${goal.name}"!`;
    return `💡 Save ₹${requiredMonthly.toFixed(2)}/mo to hit "${goal.name}"`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white bg-black min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-6">💸 Financial Time Machine</h1>

      <div className="grid gap-4 mb-6">
  <div>
    <label className="block mb-1 text-sm text-gray-300">Name</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  </div>
  <div>
    <label className="block mb-1 text-sm text-gray-300">Age</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Age"
      value={form.age}
      onChange={(e) => setForm({ ...form, age: e.target.value })}
    />
  </div>
  <div>
    <label className="block mb-1 text-sm text-gray-300">Occupation</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Occupation"
      value={form.occupation}
      onChange={(e) => setForm({ ...form, occupation: e.target.value })}
    />
  </div>
  <div>
    <label className="block mb-1 text-sm text-gray-300">Monthly Income</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Monthly Income"
      type="number"
      value={income}
      onChange={(e) => setIncome(Number(e.target.value))}
    />
  </div>
  <div>
    <label className="block mb-1 text-sm text-gray-300">Monthly Expenses</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Monthly Expenses"
      type="number"
      value={totalMonthlyExpenses}
      readOnly
    />
  </div>
  <div>
    <label className="block mb-1 text-sm text-gray-300">Monthly Savings</label>
    <input
      className="bg-black border p-2 rounded text-white w-full"
      placeholder="Monthly Savings"
      type="number"
      value={savings}
      onChange={(e) => setSavings(Number(e.target.value))}
    />
  </div>
</div>


      <div className="mb-6">
        <p className="mb-2">Select up to 2 financial priorities:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {prioritiesList.map((p) => (
            <label key={p} className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedPriorities.includes(p)}
                onChange={() => handlePriorityChange(p)}
              />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Monthly Expenses</h2>
        {expenses.map((exp, idx) => (
          <div key={idx} className="flex gap-2 my-1">
            <input
              className="bg-black border p-2 text-white rounded"
              placeholder="Category"
              value={exp.category}
              onChange={(e) => updateExpense(idx, "category", e.target.value)}
            />
            <input
              className="bg-black border p-2 text-white rounded"
              placeholder="Amount"
              type="number"
              value={exp.amount}
              onChange={(e) => updateExpense(idx, "amount", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addExpense} className="text-blue-400 mt-2">+ Add Expense</button>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Goals</h2>
        {goals.map((goal, idx) => (
          <div key={idx} className="flex gap-2 my-1 flex-wrap">
            <input
              className="bg-black border p-2 text-white rounded"
              placeholder="Goal"
              value={goal.name}
              onChange={(e) => updateGoal(idx, "name", e.target.value)}
            />
            <input
              className="bg-black border p-2 text-white rounded"
              type="number"
              value={goal.amount}
              onChange={(e) => updateGoal(idx, "amount", e.target.value)}
            />
            <input
              className="bg-black border p-2 text-white rounded"
              type="date"
              value={goal.date}
              onChange={(e) => updateGoal(idx, "date", e.target.value)}
            />
          </div>
        ))}
        <button onClick={addGoal} className="text-green-400 mt-2">+ Add Goal</button>
      </div>

      <div className="mb-6">
        {goals.map((goal, idx) => (
          <p key={idx} className="mb-1 text-sm">🎯 {getGoalAdvice(goal)}</p>
        ))}
      </div>

      <div className="bg-white rounded p-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default App;