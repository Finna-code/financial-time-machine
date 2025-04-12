import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-4xl font-bold text-center">
      <strong> Financial Time Machine</strong>
      </h1>
      <p className="text-lg text-center max-w-xl">
      Visualize alternate <strong> <em> financial </em>  </strong> futures based on your choices. Discover your financial archetype, simulate different decisions, and plan smarter.
      </p>
      <Link href="/input">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
}
