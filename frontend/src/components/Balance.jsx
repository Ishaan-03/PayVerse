export const Balance = ({ value }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-lg mb-2 sm:mb-0">Your balance</div>
          <div className="text-3xl font-bold text-indigo-600">
            ₹{value}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    )
  }