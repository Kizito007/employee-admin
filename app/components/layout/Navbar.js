"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Patryx from "@/app/components/images/whiteP.svg"



const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Departments", href: "/departments", current: false },
  // { name: "Statistics", href: "/statistics", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [admin, setAdmin] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const jwt = localStorage.getItem('jwt')
        const adminId = localStorage.getItem('adminId')
        const response = await axios.get(
          `https://school-project-backend-p17b.onrender.com/api/v1/commerce/admin/admin-mgmt/admins/${adminId}`,
          {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
          }
        );
        setAdmin(response.data.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchAdmin();
  }, []);

  const signOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('faceMatch');
    router.push('/login');
  };
  
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" style={{ background: "#0705A2" }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Image src={Patryx} alt="patryx-logo" />
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-blue-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
              
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                <a
                    onClick={signOut}
                    className="block px-4 py-2 text-sm bg-gray-200 text-blue-900 data-[focus]:bg-gray-100 data-[focus]:outline-none hover:bg-blue-900 hover:text-gray-300 rounded-md"
                >
                    Log out
                </a>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={admin?.photo?.url}
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {admin?.username}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {admin.email}
                  </div>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </>
  );
}
