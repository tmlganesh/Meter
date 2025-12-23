"use client";

import Link from "next/link";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { documents, getRelativeTime, formatDuration } from "@/lib/mockData";
import { Plus, FileText, Eye, Clock, ExternalLink } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-neutral-50">
            <AppHeader />

            <main className="mx-auto max-w-6xl px-4 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                            Documents
                        </h1>
                        <p className="mt-1 text-neutral-600">
                            Track engagement across all your shared documents
                        </p>
                    </div>
                    <Link href="/upload">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Upload Document
                        </Button>
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-lg bg-neutral-100 p-3">
                                <FileText className="h-5 w-5 text-neutral-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-neutral-900">
                                    {documents.length}
                                </p>
                                <p className="text-sm text-neutral-500">Total Documents</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-lg bg-neutral-100 p-3">
                                <Eye className="h-5 w-5 text-neutral-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-neutral-900">
                                    {documents.reduce((acc, doc) => acc + doc.views, 0)}
                                </p>
                                <p className="text-sm text-neutral-500">Total Views</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-neutral-200 bg-white shadow-none">
                        <CardContent className="flex items-center gap-4 p-6">
                            <div className="rounded-lg bg-neutral-100 p-3">
                                <Clock className="h-5 w-5 text-neutral-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-neutral-900">
                                    {formatDuration(
                                        Math.round(
                                            documents.reduce((acc, doc) => acc + doc.avgTimeSpent, 0) /
                                            documents.length
                                        )
                                    )}
                                </p>
                                <p className="text-sm text-neutral-500">Avg Time Spent</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Documents Table */}
                <Card className="border-neutral-200 bg-white shadow-none">
                    <CardHeader className="border-b border-neutral-100 pb-4">
                        <CardTitle className="text-base font-medium text-neutral-900">
                            All Documents
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-neutral-100 hover:bg-transparent">
                                    <TableHead className="pl-6 text-neutral-500">Document</TableHead>
                                    <TableHead className="text-right text-neutral-500">Views</TableHead>
                                    <TableHead className="text-right text-neutral-500">Unique Viewers</TableHead>
                                    <TableHead className="text-right text-neutral-500">Avg Time</TableHead>
                                    <TableHead className="pr-6 text-right text-neutral-500">Last Viewed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documents.map((doc) => (
                                    <TableRow key={doc.id} className="group border-neutral-100">
                                        <TableCell className="pl-6">
                                            <Link
                                                href={`/doc/${doc.id}`}
                                                className="flex items-center gap-3 font-medium text-neutral-900 hover:underline"
                                            >
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                                                    <FileText className="h-4 w-4 text-neutral-500" />
                                                </div>
                                                <span className="truncate">{doc.name}</span>
                                                <ExternalLink className="h-3.5 w-3.5 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums text-neutral-700">
                                            {doc.views}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums text-neutral-700">
                                            {doc.uniqueViewers}
                                        </TableCell>
                                        <TableCell className="text-right tabular-nums text-neutral-700">
                                            {formatDuration(doc.avgTimeSpent)}
                                        </TableCell>
                                        <TableCell className="pr-6 text-right text-neutral-500">
                                            {getRelativeTime(doc.lastViewed)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
