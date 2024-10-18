export const Appbar = () => {
    return (
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-semibold text-indigo-600">Payverse App</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium text-gray-700">Hello</div>
              <div className="rounded-full h-10 w-10 bg-indigo-100 flex items-center justify-center">
                <span className="text-lg font-medium text-indigo-600">
                  {/* User initial or icon can go here */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }