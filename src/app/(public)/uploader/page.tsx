'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { scrapeCourse } from '@/functions/courses';
import { COURSE_PROVIDER_NAMES } from '@/types/courses.type';

const Page: React.FC = () => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            parseLinks(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "application/vnd.ms-excel": [".csv", ".xlsx", ".xls"] } });
    const [fileUploaded, setFileUploaded] = useState<File[]>();

    const parseLinks = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const arrayBuffer = event.target?.result as ArrayBuffer;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setFileUploaded(data as File[])
            console.log(data)
            async function name() {
                const res = await scrapeCourse("coursera", JSON.parse(JSON.stringify(data)))
                console.log(res)
            }
            name()
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <section className="flex items-center justify-center h-full w-full gap-1">
            <div {...getRootProps()} className="shadow-lg flex items-center justify-center w-[40%] h-[60%]">
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
            <div className='h-[60%] w-[40%] bg-black shadow-lg rounded-lg'>
                {fileUploaded ? (
                    <table className=" text-white">
                        <thead>
                            <tr>
                                {Object.keys(fileUploaded[0]).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fileUploaded.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : "NOPE"}
            </div>
        </section>
    );
};

export default Page;