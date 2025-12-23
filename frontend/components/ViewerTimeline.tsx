"use client";

import { ViewerActivity, getRelativeTime, formatDuration } from "@/lib/mockData";
import { Eye, Clock, Download, RotateCcw, ArrowRight } from "lucide-react";

interface ViewerTimelineProps {
    activities: ViewerActivity[];
}

function getActivityIcon(action: string) {
    if (action.includes("opened")) return Eye;
    if (action.includes("Downloaded")) return Download;
    if (action.includes("returned") || action.includes("Returned")) return RotateCcw;
    if (action.includes("Skipped")) return ArrowRight;
    return Clock;
}

export default function ViewerTimeline({ activities }: ViewerTimelineProps) {
    return (
        <div className="space-y-0">
            {activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.action);
                const isLast = index === activities.length - 1;
                const isNewViewer = activity.action.includes("opened") || activity.action.includes("returned");

                return (
                    <div key={activity.id} className="relative flex gap-4">
                        {/* Timeline line */}
                        {!isLast && (
                            <div className="absolute left-[17px] top-10 h-[calc(100%-16px)] w-px bg-neutral-200" />
                        )}

                        {/* Icon */}
                        <div
                            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${isNewViewer
                                    ? "border-neutral-300 bg-neutral-100"
                                    : "border-neutral-200 bg-white"
                                }`}
                        >
                            <Icon
                                className={`h-4 w-4 ${isNewViewer ? "text-neutral-700" : "text-neutral-400"
                                    }`}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p
                                        className={`text-sm ${isNewViewer ? "font-medium text-neutral-900" : "text-neutral-600"
                                            }`}
                                    >
                                        {activity.action}
                                        {activity.duration && (
                                            <span className="ml-1 text-neutral-500">
                                                for {formatDuration(activity.duration)}
                                            </span>
                                        )}
                                    </p>
                                    {activity.details && (
                                        <p className="mt-0.5 text-xs text-neutral-500">
                                            {activity.details}
                                        </p>
                                    )}
                                </div>
                                <time className="shrink-0 text-xs text-neutral-400">
                                    {getRelativeTime(activity.timestamp)}
                                </time>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
