"use client";

import { Bell, Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopNav() {
    return (
        <header className="h-16 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-20">

            {/* Search Bar - Fake */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/5 bg-white/5 w-64 text-zinc-400 group focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all">
                <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400" />
                <span className="text-sm">Search...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-zinc-400 opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/5 relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full border border-zinc-950" />
                </Button>
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </div>
        </header>
    );
}
