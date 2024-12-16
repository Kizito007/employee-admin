"use client"
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Image from "next/image";
import earlyA from "../components/images/earlyA.svg"
import earlyL from "../components/images/earlyL.svg"
import employeeA from "../components/images/employeeA.svg"
import lateA from "../components/images/lateA.svg"
import { useAuth } from "../components/hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";
import pp from "../components/images/pp.jpg"
import Link from "next/link";

function ProfilePage() {
  useAuth();
  const [stats, setStats] = useState(null);
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('employeeId');

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
        const employeeResponse = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/employee/employee-mgmt/employees/${employeeId}`,
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
          `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/all-attendance?employeeId=${employeeId}&startDate=2024-11-15&endDate=${tomorrowsDate}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );

        setStats(statsResponse.data.data);
        setEmployee(employeeResponse.data.data);
        setAttendance(attendanceResponse.data.data)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchEmployeeStats();
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt')
    const attendanceResponse = await axios.get(
      `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/all-attendance?startDate=${startDate}&endDate=${endDate}&employeeId=${employeeId}`,
      {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
    );

    setAttendance(attendanceResponse.data.data)
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-10 mx-auto p-6 min-h-screen bg-gray-50 lg:p-8">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between  items-start lg:items-center mb-8">
          <div className="mb-4 lg:mb-0">
            <Image src={employee?.photo?.url || pp} alt="profile-pic" width={48} height={48} className="rounded-full" />
            <h1 className="mt-2 text-2xl font-bold text-gray-800">Engr. {employee.firstname} {employee.lastname} </h1>
            <p className="mt-2 text-sm text-gray-600"> {employee.department} Department</p>
            <address className="text-sm text-gray-500 mt-2 not-italic">
              {employee.address}
            </address>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="p-6 bg-white rounded-md shadow-md">
              <p className="text-sm text-gray-600">Working Hours</p>
              <p className="text-sm font-bold text-gray-800 mt-1"> {employee.scheduleIn} - {employee.scheduleOut} </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md">
              <p className="text-sm text-gray-600">User ID</p>
              <p className="text-sm font-bold text-gray-800 mt-1"> {employee.employeeId} </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md">
              <p className="text-sm text-gray-600">Phone Number</p>
              <p className="text-sm font-bold text-gray-800 mt-1"> {employee.phone} </p>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-sm font-bold text-gray-800 mt-1"> {employee.email} </p>
            </div>
          </div>
        </header>

        {
          isLoading ? <LoadingSpinner /> :
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Attendance Summary Section */}
              <section className="lg:col-span-2 bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Attendance Summary</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <p className="mt-2 text-sm">Start Date</p>
                  <input
                    type="date"
                    onChange={handleStartDateChange}
                    value={startDate}
                    className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-2 text-sm">End Date</p>
                  <input
                    type="date"
                    onChange={handleEndDateChange}
                    value={endDate}
                    className="w-full md:w-auto px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex gap-4">
                    <button className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => handleSearch()}>
                      Search
                    </button>
                    <Link href={`/statistics?employeeId=${employeeId}`} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                      Generate Report
                    </Link>
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
                      {attendance.map((attendee, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2"> {attendee.createdAt} </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${attendee.arrivalStatus === "EARLY"
                                ? "bg-green-100 text-green-800"
                                : attendee.arrivalStatus === "LATE"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : attendee.arrivalStatus === "ONTIME"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {attendee.arrivalStatus}
                            </span>
                          </td>
                          <td className="px-4 py-2"> {attendee.checkIn} </td>
                          <td className="px-4 py-2"> {attendee.checkOut} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* General Overview Section */}
              <section className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold text-gray-800 mb-6">General Overview</h2>
                <p className="text-sm text-gray-800 mb-6">Total Working Days: {stats?.totalCount} Days </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Early Arrivals", value: stats?.status?.EARLY + stats?.status?.ONTIME || stats?.status?.ONTIME || 0, textColor: "text-green-600", icon: earlyA },
                    { label: "Late Arrivals", value: stats?.status?.LATE || 0, textColor: "text-yellow-600", icon: lateA },
                    { label: "Early Departures", value: stats?.earlyDepartures || 0, textColor: "text-purple-600", icon: earlyL },
                    { label: "Absent", value: stats?.status?.ABSENT || 0, textColor: "text-red-600", icon: employeeA },
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center gap-2 p-4 rounded-md ${item.color}`}>
                      <Image src={item.icon} alt={item.label} width={48} height={48} />
                      <div>
                        <p className={`text-xl font-bold ${item.textColor}`}>{item.value}</p>
                        <p className="text-sm text-gray-600">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
        }
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  )
}