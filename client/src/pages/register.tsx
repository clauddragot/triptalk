import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/InputGroup";
import { useAuthState } from "../context/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Head>
        <title>Register</title>
      </Head>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-16 shadow-md bg-primary-300">
        {/* Logo and title */}
        <div className="flex items-center">
          {/* <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link> */}
          <span className="text-2xl font-black text-white lg:block">
            <Link href="/">triptalk</Link>
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center w-8/12 bg-white rounded h-4/6">
        <div
          className="hidden w-1/2 h-full bg-cover rounded md:block"
          style={{
            // backgroundImage: `url('${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/images/register.jpg')`,
            backgroundImage: "url('/images/register.jpg')",
          }}
        ></div>
        <div className="flex flex-col justify-center mx-auto">
          <div className="w-10/12 mx-auto">
            <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
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
              <div className="mb-6">
                <input
                  type="checkbox"
                  className="mr-1 cursor-pointer"
                  id="agreement"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                <label htmlFor="agreement" className="text-xs cursor-pointer">
                  I agree to get emails about cool stuff on TripTalk
                </label>
                <small className="block font-medium text-red-600">
                  {errors.agreement}
                </small>
              </div>
              <InputGroup
                className="mb-2"
                type="email"
                value={email}
                setValue={setEmail}
                placeholder="EMAIL"
                error={errors.email}
              />
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

              <button className="w-full py-2 mt-3 mb-4 text-xs font-bold text-white uppercase border rounded bg-primary-400 border-primary-400">
                Sign Up
              </button>
            </form>
            <small>
              Already a member?
              <Link href="/login">
                <a className="ml-1 font-bold text-blue-500 uppercase">Log In</a>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
