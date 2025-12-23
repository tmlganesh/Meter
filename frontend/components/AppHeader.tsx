"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Upload } from "lucide-react";

export default function AppHeader() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
            <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-neutral-900">
                        Meter
                    </span>
                </Link>

                <nav className="ml-auto flex items-center gap-1">
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive("/dashboard")
                                ? "bg-neutral-100 text-neutral-900"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/upload"
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive("/upload")
                                ? "bg-neutral-100 text-neutral-900"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                            }`}
                    >
                        <Upload className="h-4 w-4" />
                        Upload
                    </Link>
                </nav>
            </div>
        </header>
    );
}
