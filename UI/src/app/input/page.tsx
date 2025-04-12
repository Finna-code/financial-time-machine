'use client';
import { useState } from 'react';

/* define input */
export default function InputPage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    income: '',
    expenses: '',
    savings: '',
    priorities: [],
    extra: ''
  });


const priorityList = ['Savings', 'Investing', 'Debt Clearance', 'Spending', 'Insurance', 'Emergency Fund'];

const handleChange = (e: any) => {
  const { name, value } = e.target;
  setFormData(prev => ({...prev, [name]: value }));
};

const handlePriorityChange = (e: any) => {
  const { value, checked } = e.target;
  const updated = checked
  ? [...FormData.priorities, value].slice(0, 2)
  : FormData.priorities.filter((item) => item !== value);
  setFormData(prev => ({ ...prev, priorities: updated }));
};

const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log(formData) // replace wit API call later
};

return (
<form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto mt-10 p-4">
  <input
    type="text"
    name="name"
    placeholder="Name"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />
  <input
    type="number"
    name="age"
    min="0"
    placeholder="Age"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />
  <input
    type="text"
    name="occupation"
    placeholder="Occupation"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />
  <input
    type="number"
    name="income"
    min="0"
    placeholder="Monthly Income"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />
  <input
    type="number"
    name="expenses"
    min="0"
    placeholder="Monthly Expenses"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />
  <input
    type="number"
    name="savings"
    min="0"
    placeholder="Monthly Savings"
    onChange={handleChange}
    className="border p-2 rounded"
    required
  />

    <div>
      <p>Select upto 2 financial priorities:</p>
      <div className="grid grid-cols-2 gap-2"> 
        {priorityList.map((priority) => (
          <label key={priority} className="flex gap-2 items-center">
            <input
            type="checkbox"
            value={priority}
            checked={formData.priorities.includes(priority)}
            onChange={handlePriorityChange}
            disabled = {!formData.priorities.includes(priority)}
            />
            {priority}
          </label>
        ))}
      </div>
    </div>

  <textarea name="extra" placeholder="Additional Context (optional)" onChange={handleChange} className="border p-2 rounded" />

  <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
    Submit
  </button>
  </form>
);
}