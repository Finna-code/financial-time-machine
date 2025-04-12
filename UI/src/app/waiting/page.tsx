'use client';
import ProjectionChart from '@/components/projection';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitingPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("advice");
    if (stored) {
      setTimeout(() => {
        setData(JSON.parse(stored));
        setLoading(false);
      }, 2500); // mimic loading delay
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212] text-white text-center">
        <h1 className="text-3xl md:text-4xl font-bold animate-pulse">🔍 Analyzing your financial mirror...</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-xl">⚠️ No financial advice data found. Please start your simulation again.</p>
      </div>
    );
  }

  const { user, financial_advice, financial_quest } = data;

  return (
    <div className="min-h-screen bg-[#121212] text-white px-6 py-10 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center">📊 Here’s your Financial Outlook, {user.name}</h1>

      <div className="bg-gradient-to-br from-[#e0e0e0] via-[#bfbfbf] to-[#8c8c8c] text-black p-6 rounded shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">🔮 Archetype</h2>
        <p className="text-lg mb-4">{financial_advice.archetype}</p>

        <h2 className="text-2xl font-semibold mb-2">📋 Summary</h2>
        <p className="mb-4">{financial_advice.summary}</p>

        <h2 className="text-2xl font-semibold mb-2">💡 Tips</h2>
        <ul className="list-disc list-inside mb-4">
          {financial_advice.tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mb-2">🎯 Quest</h2>
        <p>{financial_quest}</p>
        <div className="mt-10 w-full flex justify-center">
          <ProjectionChart />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={() => router.push('/whatif')} className="bg-gradient-to-r from-[#3a3a3a] via-[#7ef9e3] to-[#9985ff] text-black px-6 py-2 rounded hover:opacity-90 transition">
          🔄 Explore What-Ifs
        </button>
        <button onClick={() => router.push('/')} className="bg-black border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition">
          🔁 Restart Simulation
        </button>
      </div>
    </div>
  );
}



