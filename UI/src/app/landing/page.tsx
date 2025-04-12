'use client';
import Link from 'next/link';
import Particles from 'react-tsparticles';
/* eslint-disable */


export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-8 overflow-hidden">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 140 },
            size: { value: 3.5 },
            color: { value: '#ffffff' },
            move: { enable: true, speed: 1.5 },
            opacity: { value: 1 },
            links: { enable: true, color: '#ffffff', distance: 140, opacity: 0.9 }
          },
          background: { color: 'transparent' }
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Financial Time Machine</h1>
        <p className="text-lg max-w-xl mx-auto">
          Visualize alternate <strong><em>financial</em></strong> futures based on your choices. Discover your financial archetype, simulate different decisions, and plan smarter.
        </p>
        <Link href="/input">
          <button className="mt-6 text-lg bg-gradient-to-r from-[#3a3a3a] via-[#7ef9e3] to-[#9985ff] text-black px-8 py-3 rounded-lg hover:opacity-90 transition">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}





