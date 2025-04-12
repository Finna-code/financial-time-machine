'use client';
import { useState } from 'react';
/* eslint-disable */


export default function WhatIfPage() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  const samplePrompts = [
    "What if I double my savings?",
    "What if I switch careers?",
    "What if I reduce expenses by 20%?",
    "What if I start investing more?"
  ];


  const askWhatIf = async () => {
    setLoading(true);
    setResponse(null);


    try {
      const userId = localStorage.getItem("user_id") || "1"; // Default to 1 for now
      const res = await fetch(`http://127.0.0.1:8000/what_if/${userId}?change_savings=500&change_expenses=-300&change_investments=200`, {
        method: 'POST'
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Failed to fetch what-if scenario:", err);
    }


    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center"> Explore "What If..." Scenarios</h1>


      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder='Ask something like "What if I save more?"'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-black border border-gray-700 p-3 rounded text-white"
        />


        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              className="bg-gradient-to-br from-gray-600 via-gray-400 to-gray-200 text-black px-4 py-2 rounded hover:opacity-80"
              onClick={() => setQuestion(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>


        <button
          onClick={askWhatIf}
          disabled={loading || !question}
          className="mt-4 bg-gradient-to-r from-[#3a3a3a] via-[#7ef9e3] to-[#9985ff] text-black px-6 py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Thinking..." : "Ask the AI"}
        </button>


        {response && (
          <div className="bg-zinc-900 p-6 mt-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">🔮 Updated Outlook</h2>
            <p><strong>New Archetype:</strong> {response.updated_archetype || "N/A"}</p>
            <p><strong>Summary:</strong> {response.updated_summary || "No summary provided."}</p>
            <ul className="list-disc list-inside mt-2">
              {(response.updated_tips || []).map((tip: string, idx: number) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}





