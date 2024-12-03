import Navbar from "../components/layout/Navbar";

export default function Page() {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">Hello, Engr. Wilson</h1>
          <p className="text-sm text-gray-600">IT Department</p>
          <address className="text-sm text-gray-500 mt-2 not-italic">
            12 OKOCHA STREET, PH<br />
            SAGBAMA, ASAMABIRI<br />
            BAYELSA STATE
          </address>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-sm text-gray-600">Working Hours</p>
            <p className="text-lg font-bold text-gray-800 mt-1">9:00 - 17:00</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-sm text-gray-600">User ID</p>
            <p className="text-lg font-bold text-gray-800 mt-1">201824301</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="text-lg font-bold text-gray-800 mt-1">+234 8037 945 1094</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow-md">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg font-bold text-gray-800 mt-1">Wilsonpatrick@gmail.com</p>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Summary Section */}
        <section className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Attendance Summary</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="date"
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Generate Report
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600 border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Check-in</th>
                  <th className="px-4 py-2 text-left">Check-out</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2">09-00</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        On-time
                      </span>
                    </td>
                    <td className="px-4 py-2">09:00</td>
                    <td className="px-4 py-2">17:10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* General Overview Section */}
        <section className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-6">General Overview</h2>
          <div className="space-y-4">
            {[
              { label: "Total Working Days", value: "100 Days" },
              { label: "Early Arrivals", value: "30" },
              { label: "Late Arrivals", value: "50" },
              { label: "Early Departures", value: "15" },
              { label: "Absent", value: "5" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-lg font-bold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
      </>
    );
  }