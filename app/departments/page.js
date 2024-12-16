"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import LoadingSpinner from "../components/common/LoadingSpinner";
import pp from "../components/images/pp.jpg"

export default function Page() {
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
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
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

        setAttendance(attendanceResponse.data.data)
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch stats. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleClick = (dept) => {
    setDepartment(dept);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt')
    const attendanceResponse = await axios.get(
      `https://school-project-backend-p17b.onrender.com/api/v1/attendance/attendance-mgmt/all-attendance?startDate=${startDate}&endDate=${endDate}&department=${department}`,
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
      <div className="container mt-10 mx-auto p-6 min-h-screen bg-gray-50 md:p-8">

        {/* Department Filters */}
        <section className="mt-6 mb-10 flex flex-wrap gap-3">
          {departments.map((dept, idx) => (
            <button onClick={() => handleClick(dept)}
              key={idx}
              className={`px-4 py-2 rounded-md text-sm font-medium ${department === dept
                ? "bg-blue-600 text-white"
                : "border-gray-950 text-gray-800 hover:bg-blue-600 hover:text-white"
                }`}
            >
              {dept}
            </button>
          ))}
        </section>

        {/* Employee Attendance Section */}

        {
          isLoading ?
            <LoadingSpinner /> :
            <section className="mt-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Employee Attendance</h2>

              {/* Filter/Search Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full md:w-1/4 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex gap-4">
                  <div>
                    <p className="mt-2 text-sm">Start Date</p>
                    <input
                      type="date"
                      onChange={handleStartDateChange}
                      value={startDate}
                      className="px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <p className="mt-2 text-sm">End Date</p>
                    <input
                      type="date"
                      onChange={handleEndDateChange}
                      value={endDate}
                      className="px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-6"
                      onClick={() => handleSearch()}
                    >
                      Search
                    </button>
                  </div>
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
                        "Role",
                        "Status",
                        "Check-in",
                        "Check-out",
                        "Actions",
                      ].map((header, idx) => (
                        <th key={idx} className="px-4 py-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((attendee, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 flex items-center gap-2">
                          <Image
                            src={attendee.employee.photo.url || pp}
                            alt="profile"
                            className="w-8 h-8 rounded-full object-cover"
                            width={10} height={10}
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {attendee.employee.firstname} {attendee.employee.lastname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attendee.department}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2">{attendee.employeeId}</td>
                        <td className="px-4 py-2">{attendee.role}</td>
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
                        <td className="px-4 py-2">
                          {/* <Image
                src={clock}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              /> */}
                          {attendee.checkIn}
                        </td>
                        <td className="px-4 py-2">
                          {attendee.checkOut}
                        </td>
                        <td className="px-4 py-2 border-b">
                          <Link href={`/profile?employeeId=${attendee.employeeId}`} className="text-blue-600 hover:text-blue-800">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
        }
      </div>
    </>
  );
}