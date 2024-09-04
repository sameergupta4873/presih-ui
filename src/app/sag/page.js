"use client";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/db";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sag = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentType, setStudentType] = useState("all");
  const [application, setApplication] = useState(false);
  const [step, setStep] = useState(1);
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);
  const [doc3, setDoc3] = useState(null);
  const [doc4, setDoc4] = useState(null);
  const [doc5, setDoc5] = useState(null);
  const [doc6, setDoc6] = useState(null);

  const router = useRouter();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = () => {
    if (file) {
      uploadStudents(file);
    } else {
      alert("Please select a file first!");
    }
  };

  const uploadStudents = async (file) => {
    try {
      console.log(file);
      // bulk upload students data from excel or csv file to firestore

      const reader = new FileReader();

      reader.onload = async (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: "array" });

        // Assuming the first sheet contains the students' data
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const studentData = utils.sheet_to_json(firstSheet);

        const collegeAdmin = JSON.parse(localStorage.getItem("userLogin"));
        console.log(collegeAdmin);
        const collegeId = collegeAdmin.login_id;
        if (!collegeId) {
          alert("College not found!");
          return;
        }

        // Upload each student record to Firestore
        const studentsCollection = collection(
          db,
          "colleges",
          `${collegeId}`,
          "students"
        );
        for (let student of studentData) {
          const { loginId, ...otherData } = student;
          console.log(loginId, otherData);

          const studentDoc = doc(studentsCollection, `${loginId}`);
          console.log(studentDoc, otherData);

          await setDoc(studentDoc, { ...otherData });
        }

        alert("Student data uploaded successfully!");
        getStudents();
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error uploading students data: ", error);
      alert("Error uploading students data");
    }
  };

  const getStudents = async () => {
    try {
      const collegeAdmin = JSON.parse(localStorage.getItem("college"));
      console.log(collegeAdmin);
      const collegeId = collegeAdmin.login_id;
      if (!collegeId) {
        alert("College not found!");
        return;
      }

      const studentsCollection = collection(
        db,
        "colleges",
        `${collegeId}`,
        "students"
      );
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsData = studentsSnapshot.docs.map((doc) => doc.data());
      console.log(studentsData);
      setStudents(studentsData);
    } catch (error) {
      console.error("Error getting students data: ", error);
      alert("Error getting students data");
    }
  };

  const [uploadedDocs, setUploadedDocs] = useState([]);

  const fetchStudentDocs = async (student) => {
    try {
        const collegeAdmin = JSON.parse(localStorage.getItem("college"));
        console.log(collegeAdmin);
        const collegeId = collegeAdmin.login_id;
        if (!collegeId) {
            alert("College not found!");
            return;
        }

        const studentDocsCollection = collection(
            db,
            "colleges",
            `${collegeId}`,
            "students",
            `${student.reg_id}`,
            "schemes",
            "pmsss",
            "documents"
        );

        const studentDocsSnapshot = await getDocs(studentDocsCollection);
        const studentDocsData = studentDocsSnapshot.docs.map((doc) => doc.data());
        console.log(studentDocsData);
        setUploadedDocs(studentDocsData);

    } catch (error) {
        console.error("Error getting student documents: ", error);
        alert("Error getting student documents");
    }finally{
        setApplication(true);
    }
    };

  const openImage = (imageName) => {
    const imageUrl = `${imageName}`;
    window.open(imageUrl, "_blank");
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <nav class="fixed shadow top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" class="flex ms-2 md:me-24">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span class="self-center text-lg font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                  Superscholar for SAG
                </span>
              </a>
            </div>
            <div class="flex items-center gap-5">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div class="px-4 py-3" role="none">
                    <p
                      class="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul class="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 hover:cursor-pointer"
                onClick={() => router.push("/")}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-20 w-min border bg-white rounded-lg shadow mx-[1.5%] flex overflow-hidden">
        <button
          onClick={() => setStudentType("all")}
          className={`px-5 py-2 border-r whitespace-nowrap ${
            studentType === "all" ? "bg-blue-700 text-white" : ""
          }`}
        >
          All Applications
        </button>
        <button
          onClick={() => setStudentType("verified")}
          className={`px-6 py-2 border-r whitespace-nowrap ${
            studentType === "verified" ? "bg-blue-700 text-white" : ""
          }`}
        >
          Verified
        </button>
      </div>
      <div className="w-[97%] border bg-white rounded-lg shadow mx-auto mt-3">
        <div className="py-2">
          <div class="relative overflow-x-auto sm:rounded-lg">
            <div class="flex px-5 mt-2 items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                />
              </div>
              {studentType !== "all" && (
                <Link
                  href="https://docs.google.com/spreadsheets/d/1LoT1kRExUjZxvpeVJ7voOH5_viDFBAsmjQL5m96oCGM/edit?usp=sharing"
                  target="_blank"
                  type="button"
                  class="flex items-center justify-center pl-3 pr-3 py-3 text-sm font-medium text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-blue-300 focus:outline-none scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                    />
                  </svg>
                  Export to Excel
                </Link>
              )}
            </div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b">
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Reg No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {students && studentType === "all" ? (
                  students.map((student) => {
                    return (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                          <div class="flex items-center">
                            <label
                              for="checkbox-table-search-1"
                              class="sr-only"
                            >
                              checkbox
                            </label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-10 h-10 rounded-full border-2 p-1.5 mr-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                          </svg>

                          <div class="ps-3">
                            <div class="text-base font-semibold">
                              {student?.name}
                            </div>
                            <div class="font-normal text-gray-500">
                              {student?.email}
                            </div>
                          </div>
                        </th>
                        <td class="px-6 py-4">{student?.reg_id}</td>
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                            {"Not verified"}
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <button
                            onClick={() => {
                                fetchStudentDocs(student);
                            }}
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            View application
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-10 h-10 rounded-full border-2 p-1.5 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>

                        <div class="ps-3">
                          <div class="text-base font-semibold">
                            Sameer Gupta
                          </div>
                          <div class="font-normal text-gray-500">
                            srgupta_b21@it.vjti.ac.in
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4">211080071</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                          Verified
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          view application
                        </a>
                      </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-10 h-10 rounded-full border-2 p-1.5 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>

                        <div class="ps-3">
                          <div class="text-base font-semibold">
                            Ishaan Chandak
                          </div>
                          <div class="font-normal text-gray-500">
                            ivchandak_b21@it.vjti.ac.in
                          </div>
                        </div>
                      </th>
                      <td class="px-6 py-4">211080044</td>
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                          Verified
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <a
                          href="#"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          view application
                        </a>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {application && (
        <div className="h-[100vh] w-[100vw] fixed bg-black/50 border-red-600 top-0 left-0">
          <div className="w-[90%] h-[85%] bg-white rounded-lg shadow fixed top-[53%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="border-b py-2 px-5 flex justify-between">
              <span className="font-semibold text-lg">
                Sameer Gupta's Application
              </span>
              <button
                onClick={() => setApplication(false)}
                className="text-red-600"
              >
                Close
              </button>
            </div>
            <div className="flex h-[77.5%]">
              <div className="w-[20%] h-full border-r">
                <div
                  className={`px-5 py-4 flex items-center gap-5 border-b ${
                    step === 1 ? "bg-slate-200" : ""
                  }`}
                >
                  <h1 className="text-sm">Personal Details</h1>
                </div>
                <div
                  className={`px-5 py-4 flex items-center gap-5 border-b ${
                    step === 2 ? "bg-slate-200" : ""
                  }`}
                >
                  <h1 className="text-sm">Required Documents</h1>
                </div>
                <div
                  className={`px-5 py-4 flex items-center gap-5 border-b ${
                    step === 3 ? "bg-slate-200" : ""
                  }`}
                >
                  <h1 className="text-sm">Banking Details</h1>
                </div>
              </div>
              <div className="w-[80%] h-full p-5 overflow-y-scroll">
                {step === 1 ? (
                  <>
                    <section class="bg-white dark:bg-gray-900">
                      <div class="">
                        <form action="#">
                          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                              <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required=""
                                value="Sameer Gupta"
                              />
                            </div>
                            <div class="w-full">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Branch
                              </label>
                              <input
                                type="text"
                                name="brand"
                                id="brand"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Product brand"
                                required=""
                                value="IT"
                              />
                            </div>
                            <div class="w-full">
                              <label
                                for="price"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Registration Number
                              </label>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                                required=""
                                value="211080071"
                              />
                            </div>
                            <div>
                              <label
                                for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Gender
                              </label>
                              <select
                                id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              >
                                {/* <option selected="">Select Gender</option> */}
                                <option selected="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label
                                for="item-weight"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Date of Birth
                              </label>
                              <input
                                type="text"
                                name="item-weight"
                                id="item-weight"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="DD/MM/YYYY"
                                required=""
                                value={"09/09/2003"}
                              />
                            </div>
                            <div class="sm:col-span-2">
                              <label
                                for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Address
                              </label>
                              <textarea
                                id="description"
                                rows="8"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"
                                value="Street XYZ, Near ABC, LMN"
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </section>
                  </>
                ) : step === 2 ? (
                  <>
                    <h1 className="text-lg font-medium mb-3">
                      Required Documents
                    </h1>
                    <div className="mt-7">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Domicile Certificate
                      </label>

                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            onClick={() => openImage(uploadedDocs.filter((doc) => doc.name === "Domicile Certificate")[0].url)}
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>

                            <span class="sr-only">Add emoji</span>
                          </button>
                          {doc1 !== null && doc1 === true ? (
                            <>
                              <div className="w-full"></div>
                            </>
                          ) : (
                            <textarea
                              id="chat"
                              rows="1"
                              class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Your message..."
                            ></textarea>
                          )}
                          {doc1 !== null && doc1 === true ? (
                            <>Accepted</>
                          ) : doc1 !== null && doc1 === false ? (
                            <span className="whitespace-nowrap">
                              Issue raised!
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => setDoc1(true)}
                                type="submit"
                                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>

                                <span class="sr-only">Send message</span>
                              </button>
                              <button
                                onClick={() => setDoc1(false)}
                                type="submit"
                                class="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>

                                <span class="sr-only">Send message</span>
                              </button>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="mt-7">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Income Certificate
                      </label>
                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            onClick={() => openImage(uploadedDocs.filter((doc) => doc.name === "Income Certificate")[0].url)}
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>

                            <span class="sr-only">Add emoji</span>
                          </button>
                          {doc2 !== null && doc2 === true ? (
                            <>
                              <div className="w-full"></div>
                            </>
                          ) : (
                            <textarea
                              id="chat"
                              rows="1"
                              class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Your message..."
                            ></textarea>
                          )}
                          {doc2 !== null && doc2 === true ? (
                            <>Accepted</>
                          ) : doc2 !== null && doc2 === false ? (
                            <span className="whitespace-nowrap">
                              Issue raised!
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => setDoc2(true)}
                                type="submit"
                                class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m4.5 12.75 6 6 9-13.5"
                                  />
                                </svg>

                                <span class="sr-only">Send message</span>
                              </button>
                              <button
                                onClick={() => setDoc2(false)}
                                type="submit"
                                class="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="size-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                  />
                                </svg>

                                <span class="sr-only">Send message</span>
                              </button>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="mt-7">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Category Certificate (if applicable)
                      </label>
                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>

                            <span class="sr-only">Add emoji</span>
                          </button>
                          <textarea
                            id="chat"
                            rows="1"
                            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                          ></textarea>
                          <button
                            onClick={() => setDoc3(true)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                          <button
                            onClick={() => setDoc3(false)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="mt-7">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Aadhaar Card
                      </label>
                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>

                            <span class="sr-only">Add emoji</span>
                          </button>
                          <textarea
                            id="chat"
                            rows="1"
                            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                          ></textarea>
                          <button
                            onClick={() => setDoc4(true)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                          <button
                            onClick={() => setDoc4(false)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="mt-7">
                      <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        for="file_input"
                      >
                        Bank Account Details
                      </label>
                      <form>
                        <label for="chat" class="sr-only">
                          Your message
                        </label>
                        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                          <button
                            type="button"
                            class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>

                            <span class="sr-only">Upload image</span>
                          </button>
                          <button
                            type="button"
                            class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                              />
                            </svg>

                            <span class="sr-only">Add emoji</span>
                          </button>
                          <textarea
                            id="chat"
                            rows="1"
                            class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                          ></textarea>
                          <button
                            onClick={() => setDoc5(true)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                          <button
                            onClick={() => setDoc5(false)}
                            type="submit"
                            class="inline-flex justify-center p-2 text-red-600 rounded-full cursor-pointer hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>

                            <span class="sr-only">Send message</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : step === 3 ? (
                  <>
                    <section class="bg-white dark:bg-gray-900">
                      <div class="">
                        <form action="#">
                          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div class="sm:col-span-2">
                              <label
                                for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Bank Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                                required=""
                                value={"XYZ Bank of India"}
                              />
                            </div>
                            <div class="w-full">
                              <label
                                for="brand"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Branch Name
                              </label>
                              <input
                                type="text"
                                name="brand"
                                id="brand"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Product brand"
                                required=""
                                value={"XYZ Brnach"}
                              />
                            </div>
                            <div class="w-full">
                              <label
                                for="price"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Account Number
                              </label>
                              <input
                                type="text"
                                name="price"
                                id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                                required=""
                                value={"9XXXX8XXXXXX"}
                              />
                            </div>
                            <div>
                              <label
                                for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Account Type
                              </label>
                              <select
                                id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              >
                                {/* <option selected="">Choose account type</option> */}
                                <option selected="male">Savings</option>
                                <option value="female">Current</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label
                                for="item-weight"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                IFSC Code
                              </label>
                              <input
                                type="text"
                                name="item-weight"
                                id="item-weight"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="IFSC Code"
                                required=""
                                value="XYZW123"
                              />
                            </div>
                            <div class="sm:col-span-2">
                              <label
                                for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Bank Address
                              </label>
                              <textarea
                                id="description"
                                rows="8"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Your description here"
                                value="XYZ, WXZ, LMN"
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </section>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="w-full border-t flex justify-between p-2 px-5">
              <button
                onClick={() => {
                  if (step === 1) {
                    return;
                  }
                  setStep(step - 1);
                }}
                type="submit"
                class={
                  "inline-flex scale-90 mt-1 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" +
                  (step === 1 && " opacity-0 text-transparent")
                }
              >
                Previous
              </button>
              <button
                onClick={() => {
                  if (step === 3) {
                    setApplication(false);
                    setStep(1);
                    return;
                  }
                  setStep(step + 1);
                }}
                type="submit"
                class="inline-flex scale-90 mt-1 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                {step === 3 ? "Complete" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sag;
