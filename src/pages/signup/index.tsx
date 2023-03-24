import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import formBCK from '../../../public/formBCK.png';

function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
      setIsClicked(true);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-md m-auto w-screen h-screen flex  justify-center items-center">
      <div className="border border-gray-200 px-20 py-40 rounded-lg bg-gradient-to-tr from-black to-amber-500 relative">
        <div className="relative z-50">
          <h2 className="text-4xl text-center font-bold text-gray-100 mb-6">Signup</h2>
          <form
            onSubmit={handleSignup}
          >
            <div className="mb-4">
              <label className="block text-gray-100 font-bold mb-2" htmlFor="email">
                Email
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-100 font-bold mb-2" htmlFor="password">
                Password
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </label>
            </div>
            {!isClicked ? (
              <button
                className="z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            ) : (
              <p
                className=" bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                loading...
              </p>
            )}
          </form>
        </div>
        <Image
          src={formBCK}
          alt="form image background"
          className="w-full h-full object-cover absolute top-0 left-0 mix-blend-overlay z-1"
        />
      </div>
    </div>
  );
}

export default Signup;
