"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Progress } from "./ui/progress";
import { resolve } from "path";

function UploadDropZone() {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const startSimulatedProgress = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + Math.floor(Math.random() * 5) + 5;
            });
        }, 500);

        return interval;
    };

    return (
        <Dropzone
            multiple={false}
            onDrop={async (acceptedFile) => {
                setIsUploading(true);

                const progressInterval = startSimulatedProgress();

                // Tode: handle file uploading

                clearInterval(progressInterval);
                setUploadProgress(100);
            }}
        >
            {({ getInputProps, getRootProps, acceptedFiles }) => (
                <div
                    {...getRootProps()}
                    className='border h-64 m-4 border-dashed border-gray-300 rounded-lg'
                >
                    <div className='flex justify-center items-center h-full w-full'>
                        <label
                            htmlFor='dropzone-file'
                            className='flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-zinc-50 hover:bg-zinc-100'
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <Cloud className='h-6 w-6 text-zinc-500 mb-2' />
                                <p className='mb-2 text-sm to-zinc-700'>
                                    <span className='font-semibold'>
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className='text-xs text-zinc-500'>
                                    Doc (up to 4MB)
                                </p>
                            </div>
                            {acceptedFiles && acceptedFiles[0] ? (
                                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline-[1px] outline-zinc-200 divide-x divide-zinc-200 '>
                                    <div className='px-3 py-2 h-full grid place-items-center'>
                                        <File className='h-4 w-4 to-blue-500' />
                                    </div>
                                    <div className='px-3 py-2 h-full text-sm truncate'>
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : null}

                            {isUploading ? (
                                <div className='w-full mt-4 max-w-xs mx-auto'>
                                    <Progress
                                        value={uploadProgress}
                                        className='h-1 w-full bg-zinc-200'
                                    />
                                </div>
                            ) : null}
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    );
}

export default function UploadButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v);
                }
            }}
        >
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>

            <DialogContent>
                <UploadDropZone />
            </DialogContent>
        </Dialog>
    );
}
