"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <nav ref={navRef} className="bg-primary">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-lighter focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center sm:justify-start flex-1">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/st-annes-bowls.png"
                  alt="St Anne's Bowls Club Logo"
                  width={64}
                  height={64}
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  href="/fixtures"
                  className="text-white hover:bg-primary-lighter hover:text-secondary-vibrant px-3 py-2 rounded-md text-lg font-medium"
                >
                  Fixtures
                </Link>
                <Link
                  href="/results"
                  className="text-white hover:bg-primary-lighter hover:text-secondary-vibrant px-3 py-2 rounded-md text-lg font-medium"
                >
                  Results
                </Link>
                <Link
                  href="/news"
                  className="text-white hover:bg-primary-lighter hover:text-secondary-vibrant px-3 py-2 rounded-md text-lg font-medium"
                >
                  News
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setMoreMenuOpen(!isMoreMenuOpen)}
                    className="text-white hover:bg-primary-lighter hover:text-secondary-vibrant px-3 py-2 rounded-md text-lg font-medium"
                  >
                    More
                  </button>
                  {isMoreMenuOpen && (
                    <div className="absolute z-10 right-0 mt-2 w-48 bg-gray-300 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                      <Link
                        href="/officers"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Officers
                      </Link>
                      <Link
                        href="/photos"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Photos
                      </Link>
                      <Link
                        href="/history"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        History
                      </Link>
                      {/* Add more options as needed */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 z-50 bg-primary sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/fixtures"
              className="text-white hover:bg-primary-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Fixtures
            </Link>
            <Link
              href="/results"
              className="text-white hover:bg-primary-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Results
            </Link>
            <Link
              href="/news"
              className="text-white hover:bg-primary-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              News
            </Link>
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!isMoreMenuOpen)}
                className="text-white hover:bg-primary-lighter hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                More
              </button>
              {isMoreMenuOpen && (
                <div className="absolute top-full left-0 w-full z-10 bg-gray-300 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link
                    href="/officers"
                    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  >
                    Officers
                  </Link>
                  <Link
                    href="/photos"
                    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  >
                    Photos
                  </Link>
                  <Link
                    href="/history"
                    className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                  >
                    History
                  </Link>
                  {/* Add more options as needed */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
