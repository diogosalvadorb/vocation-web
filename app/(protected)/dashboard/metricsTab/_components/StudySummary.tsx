export function StudySummary() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Study Summary</h3>
      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-gray-600">Today's Reading</p>
          <p className="text-xl font-bold">20 min</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-gray-600">Total Reading</p>
          <p className="text-xl font-bold">100 min</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-gray-600">Today's Writing</p>
          <p className="text-xl font-bold">30 min</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-gray-600">Total Writing</p>
          <p className="text-xl font-bold">150 min</p>
        </div>
      </div>
    </div>
  );
}