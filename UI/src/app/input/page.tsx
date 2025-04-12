'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
/* eslint-disable */


export default function InputPage() {
  type FormDataType = {
    name: string;
    age: string;
    occupation: string;
    income: string;
    expenses: string;
    savings: string;
    priorities: string[];
    extra: string;
  };


  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    age: '',
    occupation: '',
    income: '',
    expenses: '',
    savings: '',
    priorities: [],
    extra: ''
  });


  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const priorityList = ['Savings', 'Investing', 'Debt Clearance', 'Spending', 'Insurance', 'Emergency Fund'];


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      let updated = [...prev.priorities];
      if (checked) {
        if (updated.length === 2) updated.shift();
        updated.push(value);
      } else {
        updated = updated.filter(p => p !== value);
      }
      return { ...prev, priorities: updated };
    });
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);


    const payload = {
      ...formData,
      age: parseInt(formData.age),
      income: parseInt(formData.income),
      expenses: parseInt(formData.expenses),
      savings: parseInt(formData.savings),
      priorities: formData.priorities.join(', '),
      notes: formData.extra
    };


    try {
      const res = await fetch('http://127.0.0.1:8000/generate_advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });


      const data = await res.json();
      localStorage.setItem("advice", JSON.stringify(data));
      router.push("/waiting");
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-[#121212] text-white flex flex-col gap-5 max-w-2xl mx-auto mt-10 p-6 rounded shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold text-center mb-2">📊 Enter Your Financial Profile</h1>
      <input name="name" placeholder="Name" onChange={handleChange} className="bg-black border p-2 rounded" required />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} className="bg-black border p-2 rounded" required />
      <input name="occupation" placeholder="Occupation" onChange={handleChange} className="bg-black border p-2 rounded" required />
      <input name="income" type="number" placeholder="Monthly Income" onChange={handleChange} className="bg-black border p-2 rounded" required />
      <input name="expenses" type="number" placeholder="Monthly Expenses" onChange={handleChange} className="bg-black border p-2 rounded" required />
      <input name="savings" type="number" placeholder="Monthly Savings" onChange={handleChange} className="bg-black border p-2 rounded" required />


      <div>
        <p className="mb-1">Select up to 2 financial priorities:</p>
        <div className="grid grid-cols-2 gap-2">
          {priorityList.map((priority) => (
            <label key={priority} className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer border ${formData.priorities.includes(priority) ? 'bg-gradient-to-br from-[#e0e0e0] via-[#bfbfbf] to-[#8c8c8c] text-black shadow-inner' : 'bg-black text-gray-300'} hover:bg-white hover:text-black transition`}>
              <input type="checkbox" value={priority} checked={formData.priorities.includes(priority)} onChange={handlePriorityChange} className="hidden" />
              {priority}
            </label>
          ))}
        </div>
      </div>


      <textarea name="extra" placeholder="Additional Context (optional)" onChange={handleChange} className="bg-black border p-2 rounded" />


      <button disabled={loading} type="submit" className="bg-gradient-to-r from-[#3a3a3a] via-[#7ef9e3] to-[#9985ff] text-black px-6 py-2 rounded hover:opacity-90 transition">
        {loading ? "Processing..." : "🚀 Submit"}
      </button>
    </form>
  );
}





