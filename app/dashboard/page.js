import Navbar from "../components/layout/Navbar";

export default function Page() {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Hello, Engr. Wilson</h1>
          <p className="text-sm text-gray-500">Welcome Back</p>
        </div>
        <div className="text-gray-700 text-sm md:text-base">
          5 Sept. 2024
        </div>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {[
          { label: "Employee Present", count: 50, color: "bg-blue-100 text-blue-800" },
          { label: "Early Arrivals", count: 12, color: "bg-green-100 text-green-800" },
          { label: "Late Arrivals", count: 10, color: "bg-orange-100 text-orange-800" },
          { label: "Early Departures", count: 15, color: "bg-purple-100 text-purple-800" },
          { label: "Employee Absent", count: 5, color: "bg-red-100 text-red-800" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg shadow-md ${stat.color} flex flex-col items-center justify-center`}
          >
            <h2 className="text-2xl font-bold">{stat.count}</h2>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Employee Attendance */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Employee Attendance</h2>

        {/* Filter/Search Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-1/4 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex gap-4">
            <input
              type="date"
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Name",
                  "ID",
                  "Status",
                  "Check-in",
                  "Check-out",
                  "Schedule-in",
                  "Schedule-out",
                ].map((header, idx) => (
                  <th key={idx} className="px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">Williams Patrick</td>
                  <td className="px-4 py-2">20192456</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      On-time
                    </span>
                  </td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">17:10</td>
                  <td className="px-4 py-2">09:00</td>
                  <td className="px-4 py-2">17:00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
      </>
    );
  }