import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Alert from '@/components/Alert';
import { useAuth } from '../../../context/authContext';
import formBCK from '../../../public/formBCK.png';
import { auth, googleProvider } from '../../../firebase/firebase';

function Login() {
  const router = useRouter();
  const { userDeclare, login } = useAuth();
  const [errors, setErrors] = useState < any>(null); // [
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const signWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error : any) {
      setErrors(error.message);
    }
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      setIsClicked(true);
      if (userDeclare) router.push('/dashboard');
    } catch (error : any) {
      setErrors(error.message);
      // Rediriger vers la page de connexion
      window.location.href = '/login';
    }
  };
  return (
    <>
      {errors && <Alert errorDisplay={errors} />}
      <div className="max-w-md mx-auto mt-10 w-screen h-screen flex  justify-center items-center">
        <div className="border border-gray-200 px-20 py-40 rounded-lg bg-gradient-to-tr from-black to-amber-500 relative">
          <div className="relative z-50">
            <h2 className="text-4xl text-center font-bold text-gray-100 mb-6">Login</h2>
            <form
              onSubmit={handleLogin}
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
                  className="z-50 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
                  type="submit"
                >
                  Login
                </button>
              ) : (
                <p
                  className=" bg-blue-500  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  loading...
                </p>
              )}
              <button
                type="button"
                onClick={signWithGoogle}
                className="text-gray-500 p-4 flex flex-row items-center bg-white rounded-lg text-center mx-auto block mt-6 space-x-6"
              >
                Sign in with Google
                {' '}
                <FcGoogle className="inline-block ml-2" />
              </button>
              <Link
                href="/signup"
                className="text-white text-center block mt-6 space-x-6"
              >
                Don&#39;t  have an account ?
                {' '}
                <span className="font-bold text-green-600">Signup</span>
              </Link>
            </form>
          </div>
          <Image
            src={formBCK}
            alt="form image background"
            className="w-full h-full object-cover absolute top-0 left-0 mix-blend-overlay z-1"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
