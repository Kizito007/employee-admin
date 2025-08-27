"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "../components/hooks/useAuth";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import DashboardStats from "../components/common/DashboardStats";
import AttendanceTable from "../components/common/AttendanceTable";
import pp from "../components/images/pp.jpg"

export default function Page() {
  useAuth();
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const response = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/stats',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        const userResponse = await axios.get(
          'https://school-project-backend-p17b.onrender.com/api/v1/auth/user',
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to today's date
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const tomorrowsDate = `${year}-${month}-${day}`;
        const attendanceResponse = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/all-attendance?startDate=2024-11-15&endDate=${tomorrowsDate}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );

        setStats(response.data.data);
        setUser(userResponse.data.data)
        setAttendance(attendanceResponse.data.data)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const fetchAttendance = async (startDate, endDate, name) => {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/all-attendance?startDate=${startDate}&endDate=${endDate}&name=${name}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      setAttendance(response.data.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container mt-10 mx-auto p-6 min-h-screen bg-gray-50 md:p-8">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-200">
          <div>
            <Image
              src={user?.photo?.url || pp}
              alt="admin-img"
              width={50} // Specify the width (in pixels)
              height={50} // Specify the height (in pixels)
              className="rounded-full" // Optional: Add any other class for styling
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Hello, {user?.username} </h1>
              <p className="text-sm text-gray-500">Welcome Back</p>
            </div>
          </div>
          <div className="text-gray-900 text-2xl font-bold md:text-base">
            {formattedDate}
          </div>
        </header>

        {/* Stats Section */}
        <DashboardStats isLoading={isLoading} stats={stats} />

        {/* Employee Attendance */}
        <AttendanceTable isLoading={isLoading} attendance={attendance} onSearch={fetchAttendance} />
      </div>
    </>
  );
}