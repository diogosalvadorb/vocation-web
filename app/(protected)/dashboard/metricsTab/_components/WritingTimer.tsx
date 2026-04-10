export function WritingTimer() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Writing Time</h3>
      <p className="text-sm text-gray-600">Today: 30 min</p>
      <p className="text-sm text-gray-600">Total: 150 min</p>
    </div>
  );
}