import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

import { useAuthDispatch, useAuthState } from "../context/auth";

import InputGroup from "../components/InputGroup";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/login", {
        username,
        password,
      });

      dispatch("LOGIN", res.data);

      router.back();
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Head>
        <title>Login</title>
      </Head>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-16 shadow-md bg-primary-300">
        {/* Logo and title */}
        <div className="flex items-center">
          {/* <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link> */}
          <span className="hidden text-2xl font-black text-white lg:block">
            <Link href="/">triptalk</Link>
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center w-8/12 bg-white rounded h-4/6">
        <div
          className="hidden w-1/2 h-full bg-center bg-cover rounded md:block"
          style={{
            // backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/bricks.jpg')`,
            backgroundImage: "url('/images/login.jpg')",
          }}
        ></div>
        <div className="flex flex-col justify-center mx-auto">
          <div className="w-10/12 mx-auto">
            <h1 className="mb-2 text-lg font-medium">Login</h1>
            <p className="mb-10 text-xs">
              By continuing, you agree to our{" "}
              <a className="font-semibold text-blue-700 cursor-pointer">
                User Agreement
              </a>{" "}
              and
              <a className="font-semibold text-blue-700 cursor-pointer">
                {" "}
                Privacy Policy
              </a>
              .
            </p>
            <form onSubmit={submitForm}>
              <InputGroup
                className="mb-2"
                type="text"
                value={username}
                setValue={setUsername}
                placeholder="USERNAME"
                error={errors.username}
              />
              <InputGroup
                className="mb-4"
                type="password"
                value={password}
                setValue={setPassword}
                placeholder="PASSWORD"
                error={errors.password}
              />
              <button className="w-full py-2 mt-4 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
                Login
              </button>
            </form>
            <small>
              New to TripTalk?
              <Link href="/register">
                <a className="ml-1 font-bold uppercase text-primary-500">
                  Sign Up
                </a>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
