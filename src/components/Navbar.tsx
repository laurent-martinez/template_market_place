import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import pile from '../../public/pile.png';
import face from '../../public/face.png';
import { useAuth } from '../../context/authContext';
import frieze from '../../public/frieze3.png';

function Navbar() {
  const { userDeclare, logout } = useAuth();
  const router = useRouter();
  // const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  return (
    <nav className="z-500  w-full flex items-center justify-between flex-wrap bg-[#607e6b]">
      {/* Left side */}
      <Link
        href="/"
        className="flex items-center flex-shrink-0 text-white p-4"
      >
        <span className="font-semibold text-xl tracking-tight">Logo</span>
      </Link>

      {/* Right side */}
      <div className="flex items-center space-x-5 p-4">
        {/* Connect dropdown button */}
        {/* <div className="relative">
          <button
            type="button"
            className="flex items-center px-3 py-2 border rounded
             text-gray-300 border-gray-400 hover:text-white hover:border-white"
            onClick={toggleDropdown}
          >
            <span>DropDown</span>

          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
              <li>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-800
                  hover:bg-gray-100 flex flex-row justify-around items-center"
                >
                  Option 1
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100
                   flex flex-row justify-around items-center"
                >
                  Option 2
                </Link>
              </li>
            </ul>
          )}
        </div> */}

        {userDeclare ? (
          <Link
            href="/"
            className="text-white flex flex-row items-center justify-around"
            onClick={() => {
              logout();
            }}
          >
            <Image
              className="mr-5"
              src={pile}
              alt="pile"
              width={55}
              height={55}
            />
            {' '}
            Logout
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-white flex flex-row items-center justify-between"
          >
            <Image
              className="mr-5"
              src={face}
              alt="face"
              width={55}
              height={55}
            />
            {' '}
            Login
          </Link>
        )}
      </div>
      <Image
        src={frieze}
        alt="a art nouveau frieze"
        className="m-0 w-full object-cover h-10"
      />
    </nav>
  );
}

export default Navbar;
