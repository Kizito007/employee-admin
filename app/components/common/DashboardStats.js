import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import earlyA from "../images/earlyA.svg"
import earlyL from "../images/earlyL.svg"
import employeeA from "../images/employeeA.svg"
import lateA from "../images/lateA.svg"
import present from "../images/present.svg"

export default function DashboardStats({ stats, isLoading }) {

  return (
    <>
      {
        isLoading ?
          <LoadingSpinner /> :
          <>
            {/* Products, Orders, and Users Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
              <div className="flex items-center justify-center space-y-2">
                <Image src={present} alt="Employee Present" className="w-12 h-12 sm:w-16 sm:h-16 mx-3" />
                <div>
                  <p className="text-2xl font-bold"> {stats.totalCount || 0} </p>
                  <p className="text-sm text-gray-500">Employee Present</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-y-2">
                <Image src={earlyA} alt="Early Arrivals" className="w-12 h-12 sm:w-16 sm:h-16 mx-3" />
                <div>
                  <p className="text-2xl font-bold"> {stats.status.EARLY || 0} </p>
                  <p className="text-sm text-gray-500">Early Arrivals</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-y-2">
                <Image src={lateA} alt="Late Arrivals" className="w-12 h-12 sm:w-16 sm:h-16 mx-3" />
                <div>
                  <p className="text-2xl font-bold"> {stats.status.LATE || 0} </p>
                  <p className="text-sm text-gray-500">Late Arrivals</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-y-2">
                <Image src={earlyL} alt="Early Departures" className="w-12 h-12 sm:w-16 sm:h-16 mx-3" />
                <div>
                  <p className="text-2xl font-bold"> {stats.earlyDepartures || 0} </p>
                  <p className="text-sm text-gray-500">Early Departures</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-y-2">
                <Image src={employeeA} alt="Employee Absent" className="w-12 h-12 sm:w-16 sm:h-16 mx-3" />
                <div>
                  <p className="text-2xl font-bold"> {stats.status.ABSENT || 0} </p>
                  <p className="text-sm text-gray-500">Employee Absent</p>
                </div>
              </div>
            </div>

          </>
      }
    </>
  );
}
