'use client'
import Stars from '@/components/stars'
import { FaArrowRight } from 'react-icons/fa'
import { Metadata } from 'next';
import Link from 'next/link'
import style from './services.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '@/utils/sanity-client';
import { groq } from 'next-sanity';
import Textpreview from '@/components/text_preview/textpreview';
import { notFound } from 'next/navigation';
import Form from './form';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { formatNumbers } from '@/utils/formatter';
import { databases } from './appwrite/Config';
import { ID } from 'appwrite';
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

export default function Page() {

    const { data: user, status } = useSession();
    const [data, setData] = useState({
        Name: "",
        Email: "",
        PhoneNumber: "",
        Message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            setData({
                Name: user?.user?.name || "",
                Email: user?.user?.email || "",
                PhoneNumber: user?.user?.phone?.number || "",
                Message: "",
            });
        }
    }, [user, status]);

    async function submitForm(e: any) {
        e.preventDefault();
        setIsSubmitting(true);

        const promise = databases.createDocument(
            '65cc76b4baa2558b5a2b',
            '65cc76e010bfaadb4692',
            ID.unique(),
            JSON.stringify(data)
        );

        promise.then(function (response) {
            console.log(response);
            toast.success(`✨ Submitter Form`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            toast.success(`✨ We Will Reach Back`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setIsSubmitting(false);
        }, function (error) {
            console.log(error);
            setIsSubmitting(false);
            toast.error(`😡 Submission Failed`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            toast.error(`🔕 Please Try Later`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        });
    }

    return (
        <div>
            <header>
                <main className={style.hero}>
                    <div className={style.blob1}></div>
                    <div className={style.blob2}></div>

                    <div className={style.parent}>
                        <Navbar />

                        <h1>Your One Stop Solution To Create A Buissness From Scratch</h1>
                        <p>We specialize in providing high-quality, customized services for businesses and individuals. Our team of experienced web developers and designers are dedicated to delivering top-notch websites </p>
                        <div className={style.btns}>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-200h80v-40h40q17 0 28.5-11.5T400-280v-120q0-17-11.5-28.5T560-440H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-520v120q0 17 11.5 28.5T400-360h120v40H360v80h80v40ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-560v-160H240v640h480v-480H520ZM240-800v160-160 640-640Z" /></svg>
                                Request A Quote
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M517-518 347-688l57-56 113 113 227-226 56 56-283 283ZM280-220l278 76 238-74q-5-9-14.5-15.5T760-240H558q-27 0-43-2t-33-8l-93-31 22-78 81 27q17 5 40 8t68 4q0-11-6.5-21T578-354l-234-86h-64v220ZM40-80v-440h304q7 0 14 1.5t13 3.5l235 87q33 12 53.5 42t20.5 66h80q50 0 85 33t35 87v40L560-60l-280-78v58H40Zm80-80h80v-280h-80v280Z" /></svg>

                                Chat From Linkedin
                            </button>
                        </div>


                        <div className={style.stars}>
                            <Stars></Stars>
                        </div>
                        <div className={style.numbers}>
                            <div>
                                {/* <h2 className={style.numeric}>{courseData?.guarantee_percentage || "68%"}</h2> */}
                                <h2 className={style.numeric}>{"68%"}</h2>
                                <p className={`line-clamp-2 ${style.text}`}>Graduates Recieved Jobs</p>
                            </div>

                            <div>
                                {/* <h2 className={style.numeric}>{formatNumbers((courseData?.avg_salary.match(/[0-9,]+/) || [])[0].replace(/,/g, '') || 0) || "80k"}</h2> */}
                                <h2 className={style.numeric}>{"80k"}</h2>

                                <p className={`line-clamp-2 ${style.text}`}>Avg $ Salary In India</p>
                            </div>

                            <div>
                                <h2 className={style.numeric}>{"80k"}</h2>

                                {/* <h2 className={style.numeric}>{formatNumbers((courseData?.total_enrolled_students.match(/[0-9,]+/) || [])[0].replace(/,/g, '') || 0) || "1.2k"}</h2> */}
                                <p className={`line-clamp-2 ${style.text}`}>Total Enrolled Studnets</p>
                            </div>

                            <div>
                                {/* <h2 className={style.numeric}>{courseData.rating || "4.8"}</h2> */}
                                <h2 className={style.numeric}>{"4.9"}</h2>
                                <p className={`line-clamp-2 ${style.text}`}>Rating by {"42k"}</p>
                                {/* <p className={`line-clamp-2 ${style.text}`}>Rating by {courseData.reviews || "42k"}</p> */}
                            </div>
                        </div>
                    </div>
                </main>
            </header>

            <div className={style.form}>
                <div className={style.aboutUs}>
                    <div className={style.eBooks}>
                        <section className=" py-12 text-gray-800 sm:py-12">
                            <div className="mx-auto flex items-center content-center w-[100%] flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
                                <div className="lg:w-[60%] w-[100%] px-4 lg:pr-24">
                                    <p className="mb-2 text-white border-2 border-black  rounded-md bg-[#20344D] w-fit py-2 px-4">Have Custom Needs</p>
                                    <h3 className="mb-2 text-3xl font-bold text-white">Get Custom Pricing</h3>
                                    <p className="mb-16 text-lg text-gray-500">Get quotation instantly personalized to your needs & get started up with your ideas & buissness. Hope we have a long-term collaboration with you</p>
                                    <div className="mb-5 flex font-medium">
                                        <div className="mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                            </svg>
                                        </div>
                                        <div className="">
                                            <p className="mb-2 text-white">Agile Delivery & Seamless Maintainace</p>
                                            <span className="font-normal text-gray-400"> We provide ongoing support to our clients. We do not just provide services, we become invested in their success.</span>
                                        </div>
                                    </div>
                                    <div className="mb-5 flex font-medium">
                                        <div className="mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                        </div>
                                        <div className="">
                                            <p className="mb-2 text-white">Get The Work Done By Top 1% Of That Field</p>
                                            <span className="font-normal text-gray-400">Do not just get work done, get it done in the best possible way tailored/customized to your needs.</span>
                                        </div>
                                    </div>
                                    <div className="mb-5 flex font-medium">
                                        <div className="mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-7 w-7 text-blue-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                            </svg>
                                        </div>
                                        <div className="">
                                            <p className="mb-2 text-white">We Offer Better Solutions.</p>
                                            <span className="font-normal text-gray-400">We listen carefully to your vision and translate it into a solution that surpasses your initial idea.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg shadow-lg shadow-gray-500/20 w-[100%] mt-8 mb-8 lg:w-[40%] bg-[#20344D] sm:rounded-lg sm:shadow-lg lg:mt-0">
                                    <div className="relative border-b-2 border-black p-4 py-8 sm:px-8">
                                        <h3 className="mb-1 inline-block text-3xl font-bold text-white"><span className="mr-4">Get a quote!</span></h3>
                                        <p className="text-gray-400">Contact us for custom use cases</p>
                                    </div>
                                    <div className="p-4 sm:p-8">
                                        <div className="mt-2 border-2 relative rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer">
                                            <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent  appearance-none rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " required
                                                value={data.Name}
                                                onChange={(e) => setData({ ...data, Name: e.target.value })} />
                                            <label htmlFor="floating_outlined" className="absolute text-sm rounded-md text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-[#18222f] px-2 peer-focus:px-2 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your Name</label>
                                        </div>

                                        <div className="mt-2 border-2 relative rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer">
                                            <input required
                                                value={data.Email}
                                                onChange={(e) => setData({ ...data, Email: e.target.value })} type="email" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent  appearance-none rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " />
                                            <label htmlFor="floating_outlined" className="absolute text-sm rounded-md text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-[#18222f] px-2 peer-focus:px-2 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your G-Mail</label>
                                        </div>

                                        <div className="mt-2 border-2 relative rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer">
                                            <input required
                                                value={data.PhoneNumber}
                                                onChange={(e) => setData({ ...data, PhoneNumber: e.target.value })} type="number" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent  appearance-none rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder=" " />
                                            <label htmlFor="floating_outlined" className="absolute text-sm rounded-md text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-[#18222f] px-2 peer-focus:px-2 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone Number</label>
                                        </div>

                                        <div className="mt-2  border-2 relative rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer">
                                            <textarea required
                                                value={data.Message}
                                                onChange={(e) => setData({ ...data, Message: e.target.value })} id="floating_outlined" className="resize-none block px-2.5 pb-2.5 pt-4 w-full text-sm text-white bg-transparent  appearance-none rounded-lg border-1 border-black bg-[#18222f] focus:border-blue-500 focus:outline-none focus:ring-0  peer" placeholder="Enter Your Message" />
                                        </div>
                                        <button onClick={submitForm}
                                            disabled={isSubmitting} className="mt-2 w-full rounded-lg border-black bg-[#18222f] border-2 p-3 text-center font-medium text-white outline-none transition focus:ring ">Request A Quote</button>
                                    </div>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}