import Navbar from "../components/layout/Navbar";

export default function Page() {
    const departments = [
        "Business Department",
        "Customer Service",
        "Data Analysis",
        "Finance",
        "Human Resources",
        "Information Technology",
        "Legal",
        "Marketing",
        "Project Management",
      ];

    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Top Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-1/3 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create New
        </button>
      </header>

      {/* Department Filters */}
      <section className="mt-6 flex flex-wrap gap-3">
        {departments.map((dept, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              idx === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {dept}
          </button>
        ))}
      </section>

      {/* Employee Attendance Section */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Employee Attendance</h2>

        {/* Filter/Search Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Working Hours (9:00-17:00)</option>
            </select>
          </div>
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
                  "Role",
                  "ID",
                  "Status",
                  "Check-in",
                  "Check-out",
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
                  <td className="px-4 py-2">Head of Dept</td>
                  <td className="px-4 py-2">20194543</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
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
    </div>
      </>
    );
  }