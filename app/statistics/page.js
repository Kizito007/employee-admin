"use client"
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import Navbar from "../components/layout/Navbar";
import LoadingSpinner from "../components/common/LoadingSpinner";

function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('employeeId');
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const departments = [
    "ENGINEERING",
    "IT",
    "BUSINESS",
    "Data Analysis",
    "HR",
    "ADMINISTRATIVE",
    "FINANCE",
    "CLEANING"
  ];

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        setIsLoading(true)
        const jwt = localStorage.getItem('jwt')
        const statsResponse = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/stats?employeeId=${employeeId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setStats(statsResponse.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchEmployeeStats();
  }, []);

  // Data for the chart
  const chartData = {
    labels: ["Early Arrivals", "Late Arrivals", "Early Departures", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [
          stats?.status?.EARLY + stats?.status?.ONTIME || stats?.status?.ONTIME || 0,
          stats?.status?.LATE || 0,
          stats?.earlyDepartures || 0,
          stats?.status?.ABSENT || 0,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.6)", // Green for Early Arrivals
          "rgba(234, 179, 8, 0.6)", // Yellow for Late Arrivals
          "rgba(168, 85, 247, 0.6)", // Purple for Early Departures
          "rgba(239, 68, 68, 0.6)", // Red for Absent
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)", // Green Border
          "rgba(234, 179, 8, 1)", // Yellow Border
          "rgba(168, 85, 247, 1)", // Purple Border
          "rgba(239, 68, 68, 1)", // Red Border
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Attendance Overview",
      },
    },
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt')
    const statsResponse = await axios.get(
      `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/stats?startDate=${startDate}&endDate=${endDate}&department=${selectedDepartment}`,
      {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
    );
    setStats(statsResponse.data.data)
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-10 mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        {/* Start Date */}
        <div>
          <p className="mt-2 text-sm">Start Date</p>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* End Date */}
        <div>
          <p className="mt-2 text-sm">End Date</p>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Department Dropdown */}
        <div>
          <p className="mt-2 text-sm">Department</p>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select Department</option>
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex gap-4">
          <button
            className="px-2 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 mt-6"
            onClick={() => handleSearch()}
          >
            Search
          </button>
        </div>
      </div>
      {
        isLoading ?
          <LoadingSpinner /> :
          <div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance Comparison Chart</h1>

            {/* Summary Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Early Arrivals",
                  value: stats?.status?.EARLY + stats?.status?.ONTIME || stats?.status?.ONTIME || 0,
                  color: "bg-green-100",
                  textColor: "text-green-600",
                },
                {
                  label: "Late Arrivals",
                  value: stats?.status?.LATE || 0,
                  color: "bg-yellow-100",
                  textColor: "text-yellow-600",
                },
                {
                  label: "Early Departures",
                  value: stats?.earlyDepartures || 0,
                  color: "bg-purple-100",
                  textColor: "text-purple-600",
                },
                {
                  label: "Absent",
                  value: stats?.status?.ABSENT || 0,
                  color: "bg-red-100",
                  textColor: "text-red-600",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-md flex items-center gap-4 ${item.color}`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${item.textColor} bg-opacity-20`}
                  >
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                  <p className={`font-medium ${item.textColor}`}>{item.label}</p>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
      }
      </div>
    </>
  );
};

export default function Page() {
  return <Suspense>
    <StatisticsPage />
  </Suspense>
}

