export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Kelvin Ndoma&apos;s Portfolio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Tailwind CSS is working! 
          <span className="block mt-2 text-blue-600 dark:text-blue-400">
            Dark mode should be functional now.
          </span>
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  );
}