"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Chatbot } from "../chatbot/chatbot";
import { uploadDocumentSupabase } from "../upload/upload";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/db";

const Home = () => {
  return (
    <>
      <div className="h-full w-[81%] flex mt-5  pt-8">
        <div className="w-[65%] pr-16 max-h-[90vh] overflow-y-scroll">
          <div className="w-full bg-white rounded-lg shadow-md mb-5">
            <div className="flex gap-5 pt-5 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10 border border-gray-500 rounded-full p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="w-full">
                <div className="font-medium">Open for applications - MHRD</div>
                <span className="text-[0.7rem] text-slate-600">
                  VJTI Admin, 2 hrs ago
                </span>
              </div>
            </div>
            <div className="py-5 px-20 text-[0.8rem] text-slate-600">
              Please note that new deadline for applications is August, 31,
              11:00 PM IST
              <br />
              <br />
              If you have not applied already, please apply before deadline
              expires.
            </div>
            <div className="w-full border-t px-5 py-3">
              <button className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span className="text-sm font-medium">Comment</span>
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow-md mb-5">
            <div className="flex gap-5 pt-5 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10 border border-gray-500 rounded-full p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="w-full">
                <div className="font-medium">Open for applications - NSP</div>
                <span className="text-[0.7rem] text-slate-600">
                  VJTI Admin, 2 hrs ago
                </span>
              </div>
            </div>
            <div className="py-5 px-20 text-[0.8rem] text-slate-600">
              Please note that new deadline for applications is August, 31,
              11:00 PM IST
              <br />
              <br />
              If you have not applied already, please apply before deadline
              expires.
            </div>
            <div className="w-full border-t px-5 py-3">
              <button className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span className="text-sm font-medium">Comment</span>
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg shadow-md mb-5">
            <div className="flex gap-5 pt-5 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10 border border-gray-500 rounded-full p-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="w-full">
                <div className="font-medium">Open for applications - PMSSS</div>
                <span className="text-[0.7rem] text-slate-600">
                  VJTI Admin, 2 hrs ago
                </span>
              </div>
            </div>
            <div className="py-5 px-20 text-[0.8rem] text-slate-600">
              Please note that new deadline for applications is August, 31,
              11:00 PM IST
              <br />
              <br />
              If you have not applied already, please apply before deadline
              expires.
            </div>
            <div className="w-full border-t px-5 py-3">
              <button className="flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span className="text-sm font-medium">Comment</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-[35%] pr-10">
          <div className="w-full flex gap-4 bg-white rounded-lg shadow-md mb-5 p-4">
            <img src="/vjti.png" className="h-16 w-16" />
            <div className="text-[0.9rem] font-semibold text-slate-600 mt-2">
              Veermata Jijabai Technological Institute, Mumbai
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Scholarships = () => {
  const [addScholarship, setAddScholarship] = useState(false);
  const [active, setActive] = useState("Description");
  const [step, setStep] = useState(1);
  const [apply, setApply] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [files, setFiles] = useState(null);
  const [domicileCertificate, setDomicile] = useState(null);
  const [incomeCertificate, setIncomeCertificate] = useState(null);
  const [casteCertificate, setCasteCertificate] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [bank, setBank] = useState(null);
  const [forgeryLoading, setForgeryLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const toggleChatbotVisibility = () => {
    setChatbot(!chatbot);
  };

  const checkForgery = async (file) => {
    setForgeryLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    let forgery = false;
    let confidence = 0;
    let response = null;
    try {
      const res = await fetch("http://0.0.0.0:8000/check_forgery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      forgery = data?.forgery;
      confidence = data?.confidence;
      response = data?.response;
    } catch (error) {
      console.log(error);
    } finally {
      setForgeryLoading(false);
    }
    return { forgery, confidence, response };
  };

  const updateStatus = (name, forgeryConfidence) => {
    switch (name) {
      case "Domicile Certificate":
        setDomicile(forgeryConfidence);
        break;
      case "Income Certificate":
        setIncomeCertificate(forgeryConfidence);
        break;
      case "Category Certificate":
        setCasteCertificate(forgeryConfidence);
        break;
      case "Aadhaar Card":
        setAadhar(forgeryConfidence);
        break;
      case "Bank Account Details":
        setBank(forgeryConfidence);
        break;
      default:
        break;
    }
  };

  const uploadDocument = async (file, name) => {
    const { forgery, confidence, response } = await checkForgery(file);
    let forgeryConfidence = forgery && confidence > 0.4;
    updateStatus(name, forgeryConfidence);
    if (forgeryConfidence) {
      //   alert(`Forgery detected. Please upload a valid ${name}.`);
      return;
    }
    if (file) {
      //   add file as a key value pair in files object
      setFiles((prev) => {
        return { ...prev, [name]: { file, name } };
      });
    }
  };

  console.log(files);

  const uploadToFirebase = async (files) => {
    // upload file url of supabase to firebase
    const student = JSON.parse(localStorage.getItem("userLogin"));
    const college = JSON.parse(localStorage.getItem("studentCollege"));

    console.log(db,
        "colleges",
        college?.login_id,
        "students",
        `${student?.reg_id}`,
        "schemes",
        "pmsss",
        "documents");
    
    try{
        for (const file in files) {
            const documentsCollection = collection(
              db,
              "colleges",
              college?.login_id,
              "students",
              `${student?.reg_id}`,
              "schemes",
              "pmsss",
              "documents"
            );
            const file_doc = {
              name: files[file].name,
              url: files[file].url,
            };
            const docRef = doc(documentsCollection, files[file].name);
            try {
              await setDoc(docRef, file_doc);
            } catch (error) {
              console.log(error);
            }
          }
    }finally{
        setUploadLoading(false);
    }
  };

  const uploadToSupabase = async () => {
    setUploadLoading(true);
    console.log(
      domicileCertificate,
      incomeCertificate,
      casteCertificate,
      aadhar,
      bank
    );

    if (
      domicileCertificate ||
      incomeCertificate ||
      casteCertificate ||
      aadhar ||
      bank
    ) {
      alert("Please upload all documents or check forgery status!");
      return;
    }
    const student = JSON.parse(localStorage.getItem("userLogin"));
    const college = JSON.parse(localStorage.getItem("studentCollege"));

    let files_new = [];

    for (const file in files) {
      const res = await uploadDocumentSupabase(
        files[file].file,
        student?.reg_id,
        college?.college_id,
        files[file].name
      );
      files_new.push({
        name: files[file].name,
        url: res.publicUrl,
      });
      console.log(res);
    }
    uploadToFirebase(files_new);
    setStep(step + 1);
  };

  return (
    <>
      <div className="w-[80%] border bg-white rounded-t-lg shadow mt-10">
        <div className="border-b py-2 px-5 flex justify-between">
          <span className="font-semibold text-lg">Scholarships</span>
        </div>
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
                  placeholder="Search for scholarships"
                />
              </div>
            </div>
            <div className="w-full border-y flex min-h-[30rem]">
              <div className="w-[40%] border-r">
                <div className="px-5 py-5 flex items-center gap-5 border-b bg-slate-100">
                  <div className="rounded-full border p-2.5 bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-full">
                      <div className="font-medium text-md">PMSSS</div>
                      <div className="text-gray-500 text-sm">AICTE</div>
                      <div className="text-[0.65rem] mt-2 text-gray-400">
                        <span className="font-medium">Last date:</span> 20th
                        August 2021
                      </div>
                    </div>
                    <button
                      onClick={() => setApply(true)}
                      className="px-5 py-2 rounded-full text-xs text-white bg-blue-600 flex items-center gap-2"
                    >
                      {!files ? "Apply" : "Applied"}
                    </button>
                  </div>
                </div>
                <div className="px-5 py-5 flex items-center gap-5 border-b">
                  <div className="rounded-full border p-2.5 bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-full">
                      <div className="font-medium text-md">NSP</div>
                      <div className="text-gray-500 text-sm">
                        Government of India
                      </div>
                      <div className="text-[0.65rem] mt-2 text-gray-400">
                        <span className="font-medium">Last date:</span> 20th
                        August 2021
                      </div>
                    </div>
                    <button className="px-5 py-2 rounded-full text-xs text-white bg-blue-600 flex items-center gap-2">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="px-5 py-5 flex items-center gap-5 border-b">
                  <div className="rounded-full border p-2.5 bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-full">
                      <div className="font-medium text-md">
                        MHRD Scholarship
                      </div>
                      <div className="text-gray-500 text-sm">
                        Ministry of Human Resource Development (MHRD)
                      </div>
                      <div className="text-[0.65rem] mt-2 text-gray-400">
                        <span className="font-medium">Last date:</span> 20th
                        August 2021
                      </div>
                    </div>
                    <button className="px-5 py-2 rounded-full text-xs text-white bg-blue-600 flex items-center gap-2">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[60%]">
                <div className="px-5 py-5 flex items-center gap-5">
                  <div className="rounded-full border p-2.5 bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full items-center">
                    <div className="w-full">
                      <div className="font-medium text-md">PMSSS</div>
                      <div className="text-gray-500 text-sm">AICTE</div>
                      <div className="text-[0.65rem] mt-2 text-gray-400">
                        <span className="font-medium">Last date:</span> 20th
                        August 2021
                      </div>
                    </div>
                    <div className="px-4 py-2 rounded-full text-xs bg-green-200 flex items-center gap-2">
                      <div className="rounded-full bg-green-400 h-2 w-2"></div>{" "}
                      active
                    </div>
                  </div>
                </div>
                <div className="w-full border-b flex">
                  <button
                    onClick={() => setActive("Description")}
                    className={`p-3 text-sm ${
                      active === "Description"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-slate-600"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActive("requiredDoc")}
                    className={`p-3 text-sm ${
                      active === "requiredDoc"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-slate-600"
                    }`}
                  >
                    Required Documents
                  </button>
                  <button
                    onClick={() => setActive("eligibilityCriteria")}
                    className={`p-3 text-sm ${
                      active === "eligibilityCriteria"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-slate-600"
                    }`}
                  >
                    Eligibility Criteria
                  </button>
                </div>
                <div className="w-full h-full p-5 max-h-[30rem] overflow-y-scroll">
                  <p>
                    The{" "}
                    <strong>
                      Prime Minister’s Special Scholarship Scheme (PMSSS)
                    </strong>{" "}
                    is a government initiative in India aimed at promoting
                    higher education among the youth of Jammu & Kashmir and
                    Ladakh. Launched by the All India Council for Technical
                    Education (AICTE) under the Ministry of Education, this
                    scholarship seeks to support students from these regions by
                    providing financial assistance for pursuing undergraduate
                    courses in various disciplines outside their home states.
                  </p>
                  <br />
                  <h2>Key Features of PMSSS:</h2>
                  <br />
                  <h3>1. Eligibility:</h3>
                  <ul>
                    <li>
                      Students must be permanent residents of Jammu & Kashmir or
                      Ladakh.
                    </li>
                    <li>
                      They must have passed the 10+2 examination from a
                      recognized board.
                    </li>
                    <li>Annual family income should not exceed INR 8 lakh.</li>
                    <li>
                      Students must be admitted to an AICTE-approved institution
                      outside Jammu & Kashmir and Ladakh.
                    </li>
                  </ul>
                  <br />
                  <h3>2. Scholarship Coverage:</h3>
                  <ul>
                    <li>
                      <strong>Tuition Fees:</strong> Up to INR 1.25 lakh per
                      annum for general degree courses, INR 3 lakh per annum for
                      engineering courses, and INR 2.25 lakh per annum for
                      medical courses.
                    </li>
                    <li>
                      <strong>Maintenance Allowance:</strong> INR 1 lakh per
                      annum to cover hostel and mess charges, payable in
                      installments.
                    </li>
                  </ul>
                  <br />
                  <h3>3. Number of Scholarships:</h3>
                  <p>
                    The scheme offers around 5000 scholarships annually, with
                    reserved seats for different categories as per the
                    government norms.
                  </p>
                  <br />
                  <h3>4. Courses Covered:</h3>
                  <p>
                    The scholarship covers a wide range of courses including
                    Engineering, Medical, General Degree courses, and
                    Professional courses such as Management, Pharmacy, etc.
                  </p>
                  <br />
                  <h3>5. Application Process:</h3>
                  <p>
                    Students need to apply online through the AICTE portal. The
                    selection is based on merit and the availability of seats.
                  </p>
                  <br />
                  <h3>6. Objective:</h3>
                  <p>
                    The primary objective of PMSSS is to encourage the youth
                    from Jammu & Kashmir and Ladakh to pursue quality education
                    and to integrate them with the national mainstream by
                    facilitating their higher studies in institutions across the
                    country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-20 right-12 z-40 rounded-lg transition-transform duration-300 ease-in-out transform origin-bottom-right ${
            chatbot ? "scale-100" : "scale-0"
          }`}
        >
          <Chatbot />
        </div>
        <div className="fixed bottom-4 right-4 z-50">
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-3 py-2.5 text-center me-2 mb-2 z-10 rounded-full"
            onClick={toggleChatbotVisibility}
          >
            {/* {chatbot ? "Hide Chatbot" : "Show Chatbot"} */}
            <img
              class="w-10 h-10 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt=""
            />
          </button>
        </div>
      </div>
      {apply && (
        <div className="h-[100vh] w-[100vw] fixed bg-black/50 border-red-600 top-0 left-0">
          <div className="w-[70%] h-[80%] bg-white rounded-lg shadow fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="border-b py-2 px-5 flex justify-between">
              <span className="font-semibold text-lg">
                Scholarship application
              </span>
              <button onClick={() => setApply(false)} className="text-red-600">
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
                                <option selected="">Select Gender</option>
                                <option value="male">Male</option>
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
                                type="date"
                                name="item-weight"
                                id="item-weight"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="DD/MM/YYYY"
                                required=""
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
                      <div className="flex justify-between w-full">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Domicile Certificate
                        </label>
                        {domicileCertificate !== null ? (
                          domicileCertificate ? (
                            <>
                              <span className="scale-[85%] text-red-500">
                                Forgery Detected!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="scale-[85%] text-green-600">
                                No Forgery Detected
                              </span>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        onChange={(e) =>
                          uploadDocument(
                            e.target.files[0],
                            "Domicile Certificate"
                          )
                        }
                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                      />
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-between w-full">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Income Certificate
                        </label>
                        {incomeCertificate !== null ? (
                          incomeCertificate ? (
                            <>
                              <span className="scale-[85%] text-red-500">
                                Forgery Detected!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="scale-[85%] text-green-600">
                                No Forgery Detected
                              </span>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) =>
                          uploadDocument(
                            e.target.files[0],
                            "Income Certificate"
                          )
                        }
                      />
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-between w-full">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Category Certificate (if applicable)
                        </label>
                        {casteCertificate !== null ? (
                          casteCertificate ? (
                            <>
                              <span className="scale-[85%] text-red-500">
                                Forgery Detected!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="scale-[85%] text-green-600">
                                No Forgery Detected
                              </span>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) =>
                          uploadDocument(
                            e.target.files[0],
                            "Category Certificate"
                          )
                        }
                      />
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-between w-full">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Aadhaar Card
                        </label>
                        {aadhar !== null ? (
                          aadhar ? (
                            <>
                              <span className="scale-[85%] text-red-500">
                                Forgery Detected!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="scale-[85%] text-green-600">
                                No Forgery Detected
                              </span>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) =>
                          uploadDocument(e.target.files[0], "Aadhaar Card")
                        }
                      />
                    </div>
                    <div className="mt-7">
                      <div className="flex justify-between w-full">
                        <label
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          for="file_input"
                        >
                          Bank Account Details
                        </label>
                        {bank !== null ? (
                          bank ? (
                            <>
                              <span className="scale-[85%] text-red-500">
                                Forgery Detected!
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="scale-[85%] text-green-600">
                                No Forgery Detected
                              </span>
                            </>
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) =>
                          uploadDocument(
                            e.target.files[0],
                            "Bank Account Details"
                          )
                        }
                      />
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
                                type="number"
                                name="price"
                                id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                                required=""
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
                                <option selected="">Choose account type</option>
                                <option value="male">Savings</option>
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
                    setApply(false);
                    setStep(1);
                    return;
                  }
                  if (step === 2) {
                    uploadToSupabase();
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
      {forgeryLoading && (
        <div className="h-[100vh] w-[100vw] fixed bg-black/50 border-red-600 top-0 left-0">
          <div className="w-[30%] h-[30%] flex flex-col justify-center items-center bg-white rounded-lg shadow fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
            <svg
              aria-hidden="true"
              class="w-14 h-14 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <div className="text-md mt-5">Checking for forgeries...</div>
          </div>
        </div>
      )}
      {uploadLoading && (
        <div className="h-[100vh] w-[100vw] fixed bg-black/50 border-red-600 top-0 left-0">
          <div className="w-[30%] h-[30%] flex flex-col justify-center items-center bg-white rounded-lg shadow fixed top-[55%] left-[60%] transform -translate-x-1/2 -translate-y-1/2">
            <svg
              aria-hidden="true"
              class="w-14 h-14 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <div className="text-md mt-5">Uploading documents...</div>
          </div>
        </div>
      )}
    </>
  );
};

const Profile = () => {
  return <>profile</>;
};

const Student = () => {
  const [tab, setTab] = React.useState("home");
  const router = useRouter();
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
                  Superscholar
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

      <aside
        id="logo-sidebar"
        class="fixed shadow pl-2 top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <button
                onClick={() => setTab("home")}
                class="flex p-2 pr-[8.2rem] text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab("scholarships")}
                class="flex items-center p-2 pr-[4.5rem] text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Scholarships</span>
              </button>
            </li>
            {/* <li>
                  <button 
                    class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                    <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Pro
                    </span>
                  </button>
                </li> */}
            <li>
              <button
                onClick={() => setTab("profile")}
                class="flex items-center pr-24 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span class="flex-1 ms-3 whitespace-nowrap">My Profile</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div class="sm:ml-64 bg-[#E7EAED] w-full min-h-[100vh] pt-9 pl-7">
        {tab === "scholarships" ? (
          <Scholarships />
        ) : tab === "home" ? (
          <Home />
        ) : tab === "profile" ? (
          <Profile />
        ) : (
          <Home />
        )}
      </div>
    </>
  );
};

export default Student;
