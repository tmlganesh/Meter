"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Check, Copy, Link as LinkIcon } from "lucide-react";

type UploadState = "idle" | "uploading" | "complete";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState<UploadState>("idle");
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const shareableLink =
        typeof window !== "undefined"
            ? `${window.location.origin}/doc/pitch-deck-2024`
            : "/doc/pitch-deck-2024";

    const handleFile = useCallback((selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file");
            return;
        }
        setFile(selectedFile);
        simulateUpload();
    }, []);

    const simulateUpload = () => {
        setUploadState("uploading");
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadState("complete");
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 200);
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        },
        [handleFile]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const textArea = document.createElement("textarea");
            textArea.value = shareableLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <AppHeader />

            <main className="mx-auto max-w-2xl px-4 py-16">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                        Upload Document
                    </h1>
                    <p className="mt-2 text-neutral-600">
                        Share your PDF and track who views it
                    </p>
                </div>

                {uploadState === "idle" && (
                    <Card className="border-2 border-dashed border-neutral-300 bg-white shadow-none">
                        <CardContent className="p-0">
                            <label
                                htmlFor="file-upload"
                                className={`flex min-h-[300px] cursor-pointer flex-col items-center justify-center p-8 transition-colors ${dragActive ? "bg-neutral-100" : "hover:bg-neutral-50"
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                                    <Upload className="h-8 w-8 text-neutral-400" />
                                </div>
                                <p className="mt-4 text-lg font-medium text-neutral-900">
                                    Drop your PDF here, or click to browse
                                </p>
                                <p className="mt-1 text-sm text-neutral-500">
                                    PDF files only, up to 50MB
                                </p>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                            </label>
                        </CardContent>
                    </Card>
                )}

                {uploadState === "uploading" && (
                    <Card className="bg-white shadow-sm">
                        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                                <FileText className="h-8 w-8 text-neutral-400" />
                            </div>
                            {file && (
                                <div className="mt-4 text-center">
                                    <p className="font-medium text-neutral-900">{file.name}</p>
                                    <p className="text-sm text-neutral-500">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            )}
                            <div className="mt-6 w-full max-w-xs">
                                <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
                                    <div
                                        className="h-full bg-neutral-900 transition-all duration-200"
                                        style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                </div>
                                <p className="mt-2 text-center text-sm text-neutral-500">
                                    Uploading... {Math.min(Math.round(progress), 100)}%
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {uploadState === "complete" && (
                    <Card className="bg-white shadow-sm">
                        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-8">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                                <Check className="h-8 w-8 text-green-600" />
                            </div>
                            <p className="mt-4 text-lg font-medium text-neutral-900">
                                Upload Complete
                            </p>
                            {file && (
                                <p className="text-sm text-neutral-500">{file.name}</p>
                            )}

                            <div className="mt-6 w-full max-w-md">
                                <p className="mb-2 text-sm font-medium text-neutral-700">
                                    Shareable Link
                                </p>
                                <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                                    <LinkIcon className="h-4 w-4 shrink-0 text-neutral-400" />
                                    <span className="flex-1 truncate text-sm text-neutral-700">
                                        {shareableLink}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={copyToClipboard}
                                        className="shrink-0"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="mr-1 h-3 w-3" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="mr-1 h-3 w-3" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <Link href="/dashboard">
                                    <Button variant="outline">Go to Dashboard</Button>
                                </Link>
                                <Link href="/doc/pitch-deck-2024">
                                    <Button>View Analytics</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
