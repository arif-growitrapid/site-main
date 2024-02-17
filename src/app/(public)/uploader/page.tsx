'use client'
import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

export default function Page() {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            parseLinks(file);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.csv' });

    const parseLinks = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);
          console.log(data);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <section className="flex items-center justify-center h-full w-full">
            <div {...getRootProps()} className="your-dropzone-styles">
                <input {...getInputProps()} />
                <p>Drag 'n' drop a CSV file here, or click to select one</p>
            </div>
        </section>
    );
}
