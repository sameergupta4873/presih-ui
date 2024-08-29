"use client";
import Image from "next/image";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase/db";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState("college");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const collegeLogin = async () => {
    try {
      const docRef = doc(db, "colleges", email);
      const docFound = await getDoc(docRef);
      if(docFound.exists()) {
        console.log("Document data:", docFound.data());
        if(docFound.data().password === password) {
          console.log("Login success");
          localStorage.setItem("userLogin", JSON.stringify(docFound.data()));
          router.push("/college");
          alert("Login success");
        }else{
          console.log("Invalid email or password!");
          alert("Invalid email or password!");
        }
      }else {
        console.log("No such document!");
        alert("No college found with this credentials");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSubmit = async () => {
    if (role === "college") {
      await collegeLogin();
    }
  }


  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center scale-90 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Superscholar
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in as 
              {
                role === "college" ? " College Admin" : 
                role === "student" ? " Student" : 
                role === "sag" ? " SAG Admin" : 
                " College"
              }
            </h1>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <button onClick={handleSubmit} class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign in
            </button>
            <div className="w-full flex justify-center items-center gap-4">
              <div className="border w-full"></div>
              <span>or</span>
              <div className="border w-full"></div>
            </div>
            <button onClick={() => {
              if (role === "college") setRole("student");
              else if (role === "student") setRole("college");
              else if (role === "sag") setRole("college");
            }} class="w-full text-blue-600 border-2 border-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center">
              Sign in as
              {
                role === "college" ? " Student" : 
                role === "student" ? " College Admin" : 
                role === "sag" ? " College Admin" : 
                " College"
              }
            </button>
            <button onClick={() => {
              if (role === "college") setRole("sag");
              else if (role === "student") setRole("sag");
              else if (role === "sag") setRole("college");
            }} class="w-full text-blue-600 border-2 border-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center">
              Sign in as
              {
                role === "college" ? " SAG Admin" : 
                role === "student" ? " SAG Admin" : 
                role === "sag" ? " Student" : 
                " College"
              }
            </button>
            <p class="text-sm hidden font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
