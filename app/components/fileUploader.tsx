import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const maxFileSize = 20 * 1024 * 1024; // 20MB

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            setSelectedFile(file);
            onFileSelect?.(file);
        },
        [onFileSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "application/pdf": [".pdf"] },
        maxSize: maxFileSize,
    });

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect?.(null);

        // Reset the native input so the same file can be uploaded again
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div
                {...getRootProps()}
                className={`rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer p-6 text-center shadow-sm 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
            >
                <input ref={inputRef} {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {selectedFile ? (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-4">
                                <img src="/images/pdf.png" alt="pdf" className="w-12 h-12" />
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemove}
                                className="p-2 rounded-full hover:bg-red-50 transition-colors"
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-5 h-5" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center space-y-3"
                        >
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                                <img
                                    src="/icons/info.svg"
                                    alt="upload"
                                    className="w-10 h-10 text-blue-500"
                                />
                            </div>
                            <p className="text-lg text-gray-600">
                <span className="font-semibold text-blue-500">
                  Click to upload
                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-sm text-gray-500">
                                PDF only (max {formatSize(maxFileSize)})
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default FileUploader;
