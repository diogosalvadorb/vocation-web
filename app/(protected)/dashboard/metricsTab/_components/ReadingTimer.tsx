export function ReadingTimer() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Reading Time</h3>
      <p className="text-sm text-gray-600">Today: 20 min</p>
      <p className="text-sm text-gray-600">Total: 100 min</p>
    </div>
  );
}
