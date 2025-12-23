"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    BarChart3,
    Key,
    Settings,
    Users,
    CreditCard,
    LogOut,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Key, label: "API Keys", href: "/dashboard/keys" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
    { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-full border-r border-white/5 bg-zinc-950 flex flex-col">
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-8">
                    <div className="w-6 h-6 bg-cyan-500 rounded-full blur-[1px]" />
                    Quota
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={cn("w-4 h-4", isActive ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300")} />
                                    {item.label}
                                </div>
                                {isActive && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-white/5">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-cyan-500 to-blue-600" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Acme Corp</p>
                        <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                </div>
            </div>
        </div>
    );
}
