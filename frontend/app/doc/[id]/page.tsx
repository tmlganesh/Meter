"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import ViewerTimeline from "@/components/ViewerTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    getDocument,
    getViewsOverTime,
    getPageEngagement,
    getViewerActivity,
    formatDuration,
} from "@/lib/mockData";
import {
    Eye,
    Users,
    Clock,
    ArrowLeft,
    FileText,
    Copy,
    Check,
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function DocumentAnalyticsPage({ params }: PageProps) {
    const { id } = use(params);
    const [copied, setCopied] = useState(false);

    const doc = getDocument(id);
    const viewsOverTime = useMemo(() => getViewsOverTime(id), [id]);
    const pageEngagement = useMemo(() => getPageEngagement(id), [id]);
    const viewerActivity = useMemo(() => getViewerActivity(id), [id]);

    const shareableLink =
        typeof window !== "undefined"
            ? `${window.location.origin}/doc/${id}`
            : `/doc/${id}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!doc) {
        return (
            <div className="min-h-screen bg-neutral-50">
                <AppHeader />
                <main className="mx-auto max-w-6xl px-4 py-16 text-center">
                    <h1 className="text-2xl font-semibold text-neutral-900">
                        Document not found
                    </h1>
                    <p className="mt-2 text-neutral-600">
                        The document you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link href="/dashboard" className="mt-6 inline-block">
                        <Button>Back to Dashboard</Button>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <AppHeader />

            <main className="mx-auto max-w-6xl px-4 py-8">
                {/* Back Link & Document Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="mb-4 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100">
                                <FileText className="h-6 w-6 text-neutral-500" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-neutral-900">
                                    {doc.name}
                                </h1>
                                <p className="text-sm text-neutral-500">
                                    {doc.pageCount} pages • Shared{" "}
                                    {Math.floor(
                                        (Date.now() - doc.createdAt.getTime()) / 86400000
                                    )}{" "}
                                    days ago
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="shrink-0"
                        >
                            {copied ? (
                                <>
                                    <Check className="mr-1.5 h-3.5 w-3.5" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                                    Copy Link
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">
                                        Total Views
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">
                                        {doc.views}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-neutral-100 p-2.5">
                                    <Eye className="h-5 w-5 text-neutral-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">
                                        Unique Viewers
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">
                                        {doc.uniqueViewers}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-neutral-100 p-2.5">
                                    <Users className="h-5 w-5 text-neutral-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-500">
                                        Avg Time Spent
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900">
                                        {formatDuration(doc.avgTimeSpent)}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-neutral-100 p-2.5">
                                    <Clock className="h-5 w-5 text-neutral-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="mb-8 grid gap-6 lg:grid-cols-2">
                    {/* Views Over Time */}
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium text-neutral-900">
                                Views Over Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={viewsOverTime}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 12, fill: "#737373" }}
                                            axisLine={{ stroke: "#e5e5e5" }}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12, fill: "#737373" }}
                                            axisLine={{ stroke: "#e5e5e5" }}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#fff",
                                                border: "1px solid #e5e5e5",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="views"
                                            stroke="#171717"
                                            strokeWidth={2}
                                            dot={{ fill: "#171717", strokeWidth: 0, r: 4 }}
                                            activeDot={{ r: 6, fill: "#171717" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Page Engagement */}
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-medium text-neutral-900">
                                Page-Level Engagement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={pageEngagement.slice(0, 12)}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                                        <XAxis
                                            dataKey="page"
                                            tick={{ fontSize: 12, fill: "#737373" }}
                                            axisLine={{ stroke: "#e5e5e5" }}
                                            tickLine={false}
                                            tickFormatter={(value) => `P${value}`}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12, fill: "#737373" }}
                                            axisLine={{ stroke: "#e5e5e5" }}
                                            tickLine={false}
                                            label={{
                                                value: "Avg Time (s)",
                                                angle: -90,
                                                position: "insideLeft",
                                                style: { fontSize: "11px", fill: "#737373" },
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "#fff",
                                                border: "1px solid #e5e5e5",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                            }}
                                            formatter={(value) => [`${value}s`, "Avg Time"]}
                                            labelFormatter={(label) => `Page ${label}`}
                                        />
                                        <Bar
                                            dataKey="avgTime"
                                            fill="#404040"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Viewer Activity Timeline */}
                <Card className="border-neutral-200 bg-white shadow-none">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <CardTitle className="text-base font-medium text-neutral-900">
                            Viewer Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <ViewerTimeline activities={viewerActivity} />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
