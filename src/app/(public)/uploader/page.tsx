'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { filterCourse, scrapeCourse } from '@/functions/courses';
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { deleteCourse } from '@/functions/courses';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page: React.FC = () => {
    const [fileUploaded, setFileUploaded] = useState<File[]>();
    const [trendingCourses, setTrendingCourses] = useState<any>(Array(10).fill(undefined));

    const fetchData = async () => {
        try {
            const result = await filterCourse('coursera', {}, 1000);
            if (result.status === 200) {
                const { type, data } = result;
                setTrendingCourses(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (fileUploaded) {
            fetchData();
        }
    }, [fileUploaded]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            parseLinks(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "application/vnd.ms-excel": [".csv", ".xlsx", ".xls"] } });

    const parseLinks = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setFileUploaded(data as File[]);
            console.log(data);
            async function name() {
                const res = await scrapeCourse("coursera", JSON.parse(JSON.stringify(data)));
                console.log(res);
            }
            name();
        };
        reader.readAsArrayBuffer(file);
    };

    async function deleteCourseFunc(id: string) {
        try {
            const promise = deleteCourse("coursera", id);

            toast.promise(
                promise,
                {
                    pending: 'Deleting course...',
                    success: 'Course deleted successfully',
                    error: 'Failed to delete course',
                }
            );

            const res = await promise;
            if (res.status === 200) {
                fetchData(); // Fetch trending courses after deletion
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    }

    return (

        <section className="p-6 h-full w-full">
            <div {...getRootProps()} className="shadow-lg flex items-center justify-center w-[100%] h-[40%]">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-[#20344D] border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-[#20344D] dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Excel files only</p>
                    </div>
                    <input {...getInputProps()} />
                </label>
            </div>
            <div className='flex shadow-lg h-full w-full gap-2'>
                <div className='h-[60%] p-2 overflow-y-scroll mt-2 w-[40%] bg-[#20344D] rounded-xl'>
                    {fileUploaded ? (
                        <div className='flex p-1 flex-col rounded-lg justify-between items-center'>

                            {fileUploaded.map((row, rowIndex) => (

                                Object.values(row).map((value, colIndex) => (
                                    <div key={colIndex} className='p-2 m-1 bg-[#101420] rounded-lg shadow-lg'>
                                        <h1 className='text-[1rem]'>{value}</h1>
                                    </div>
                                ))

                            ))}
                        </div>

                    ) : (
                        <div className='flex items-center justify-center h-full w-full'>
                            <h2 >No Files Uploaded</h2>
                        </div>
                    )}
                </div>

                <div className='h-[60%] p-2 overflow-y-scroll mt-2 w-[60%] bg-[#20344D] shadow-lg rounded-xl'>
                    {
                        trendingCourses.map((item: { _id: string, data: { title: string } }, index: number) => {
                            return (
                                <div key={index} className='flex rounded-lg mt-2 justify-between items-center p-4 bg-[#101420]'>
                                    <h1 className='text-[1rem]'>{item?.data?.title}</h1>
                                    <div>
                                        <button onClick={() => deleteCourseFunc(item._id)} className='bg-[#20344D] p-2 rounded-md'>
                                            <MdDelete size={20} />
                                        </button>
                                        <button className='ml-2 bg-[#20344D] p-2 rounded-md'>
                                            <RxUpdate size={20} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"></ToastContainer>
        </section>

    );
};

export default Page;