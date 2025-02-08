"use client"
import { useEffect, useState, } from "react";
import Link from "next/link";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import pp from "../images/pp.jpg"
// import clock from "../images/clock.svg"

export default function AttendanceTable({ attendance, isLoading, onSearch }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [stats, setStats] = useState({});
  const [loader, setLoader] = useState(false);

  const handleSearch = async () => {
    onSearch(startDate, endDate, name)
  };
  
  return (
    <>
      {
        isLoading || loader ?
          <LoadingSpinner /> :
          <>
            <section className="mt-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Employee Attendance</h2>

              {/* Filter/Search Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setName(e.target.value)}
                  className="w-full md:w-1/4 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex gap-4">
                  <div>
                    <p className="mt-2 text-sm">Start Date</p>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      className="px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <p className="mt-2 text-sm">End Date</p>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
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
                        "Status",
                        "Sign-in",
                        "Sign-out",
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
                    {attendance.map((attendee, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 flex items-center gap-2">
                          <Image
                            src={attendee.employee?.photo?.url || pp}
                            alt="profile"
                            className="w-8 h-8 rounded-full object-cover"
                            width={10} height={10}
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {attendee.employee?.firstname} {attendee.employee?.lastname}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attendee?.department}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-2">{attendee?.employeeId}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${attendee?.arrivalStatus === "EARLY"
                                ? "bg-green-100 text-green-800"
                                : attendee?.arrivalStatus === "LATE"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : attendee?.arrivalStatus === "ONTIME"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {attendee?.arrivalStatus}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          {/* <Image
                src={clock}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
              /> */}
                          {attendee?.checkIn}
                        </td>
                        <td className="px-4 py-2">
                          {
                            attendee.checkOut ?
                            <> {attendee.checkOut} </> :
                            <Link href={`/sign-out?attendanceId=${attendee.attendanceId}&employeeId=${attendee.employeeId}`} className="text-blue-600 hover:text-blue-800">sign-out</Link>
                          }
                        </td>
                        <td className="px-4 py-2">{attendee?.scheduleIn}</td>
                        <td className="px-4 py-2">{attendee?.scheduleOut}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

          </>
      }
    </>
  );
}
