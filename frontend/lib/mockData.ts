// Mock Data for Document Engagement MVP
// All data is realistic and believable for investor demos

export interface Document {
    id: string;
    name: string;
    views: number;
    uniqueViewers: number;
    avgTimeSpent: number; // in seconds
    lastViewed: Date;
    createdAt: Date;
    pageCount: number;
}

export interface ViewerActivity {
    id: string;
    timestamp: Date;
    action: string;
    details?: string;
    duration?: number; // in seconds
    page?: number;
}

export interface DailyViews {
    date: string;
    views: number;
}

export interface PageEngagement {
    page: number;
    avgTime: number; // in seconds
    views: number;
}

// Helper function to get relative time
export function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}

// Helper to format duration
export function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
}

// Mock Documents
export const documents: Document[] = [
    {
        id: "pitch-deck-2024",
        name: "Series A Pitch Deck.pdf",
        views: 47,
        uniqueViewers: 12,
        avgTimeSpent: 234,
        lastViewed: new Date(Date.now() - 2 * 3600000), // 2 hours ago
        createdAt: new Date(Date.now() - 7 * 86400000),
        pageCount: 18,
    },
    {
        id: "q4-financial-report",
        name: "Q4 2024 Financial Report.pdf",
        views: 23,
        uniqueViewers: 8,
        avgTimeSpent: 312,
        lastViewed: new Date(Date.now() - 5 * 3600000), // 5 hours ago
        createdAt: new Date(Date.now() - 14 * 86400000),
        pageCount: 24,
    },
    {
        id: "product-roadmap",
        name: "Product Roadmap 2025.pdf",
        views: 89,
        uniqueViewers: 31,
        avgTimeSpent: 156,
        lastViewed: new Date(Date.now() - 45 * 60000), // 45 mins ago
        createdAt: new Date(Date.now() - 3 * 86400000),
        pageCount: 12,
    },
    {
        id: "partnership-proposal",
        name: "Partnership Proposal - Acme Corp.pdf",
        views: 15,
        uniqueViewers: 4,
        avgTimeSpent: 423,
        lastViewed: new Date(Date.now() - 26 * 3600000), // yesterday
        createdAt: new Date(Date.now() - 5 * 86400000),
        pageCount: 16,
    },
    {
        id: "case-study-enterprise",
        name: "Enterprise Case Study - TechCo.pdf",
        views: 156,
        uniqueViewers: 67,
        avgTimeSpent: 98,
        lastViewed: new Date(Date.now() - 15 * 60000), // 15 mins ago
        createdAt: new Date(Date.now() - 21 * 86400000),
        pageCount: 8,
    },
];

// Get document by ID
export function getDocument(id: string): Document | undefined {
    return documents.find((doc) => doc.id === id);
}

// Generate views over time data for a document
export function getViewsOverTime(docId: string): DailyViews[] {
    const doc = getDocument(docId);
    if (!doc) return [];

    const data: DailyViews[] = [];
    const today = new Date();

    // Generate last 7 days of data
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        // More realistic view patterns - higher on weekdays, lower on weekends
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseViews = Math.floor(doc.views / 7);
        const variance = Math.floor(Math.random() * baseViews * 0.5);
        const views = isWeekend
            ? Math.max(1, baseViews - variance)
            : baseViews + variance;

        data.push({ date: dayName, views });
    }

    return data;
}

// Generate page engagement data
export function getPageEngagement(docId: string): PageEngagement[] {
    const doc = getDocument(docId);
    if (!doc) return [];

    const data: PageEngagement[] = [];

    for (let i = 1; i <= doc.pageCount; i++) {
        // First page always gets more views, last pages drop off
        const dropOffFactor = i <= 3 ? 1 : 1 - (i - 3) * 0.05;
        const views = Math.max(
            Math.floor(doc.views * dropOffFactor * (0.8 + Math.random() * 0.4)),
            Math.floor(doc.views * 0.3)
        );

        // Time spent varies - executive summary and pricing pages get more time
        let avgTime: number;
        if (i === 1) avgTime = 45 + Math.floor(Math.random() * 30); // Intro
        else if (i === doc.pageCount)
            avgTime = 60 + Math.floor(Math.random() * 40); // Contact/Pricing
        else if (i === Math.floor(doc.pageCount / 2))
            avgTime = 50 + Math.floor(Math.random() * 35); // Middle highlights
        else avgTime = 15 + Math.floor(Math.random() * 25); // Regular pages

        data.push({ page: i, avgTime, views });
    }

    return data;
}

// Generate viewer activity timeline
export function getViewerActivity(docId: string): ViewerActivity[] {
    const activities: ViewerActivity[] = [
        {
            id: "1",
            timestamp: new Date(Date.now() - 15 * 60000),
            action: "Anonymous viewer opened the document",
            details: "San Francisco, CA",
        },
        {
            id: "2",
            timestamp: new Date(Date.now() - 14 * 60000),
            action: "Viewed page 1",
            duration: 32,
            page: 1,
        },
        {
            id: "3",
            timestamp: new Date(Date.now() - 13 * 60000),
            action: "Viewed page 2",
            duration: 18,
            page: 2,
        },
        {
            id: "4",
            timestamp: new Date(Date.now() - 12 * 60000),
            action: "Skipped to page 8",
            duration: 67,
            page: 8,
            details: "High engagement",
        },
        {
            id: "5",
            timestamp: new Date(Date.now() - 10 * 60000),
            action: "Viewed page 9",
            duration: 23,
            page: 9,
        },
        {
            id: "6",
            timestamp: new Date(Date.now() - 2 * 3600000),
            action: "Anonymous viewer opened the document",
            details: "New York, NY",
        },
        {
            id: "7",
            timestamp: new Date(Date.now() - 2 * 3600000 + 60000),
            action: "Viewed pages 1-5 sequentially",
            duration: 145,
        },
        {
            id: "8",
            timestamp: new Date(Date.now() - 2 * 3600000 + 200000),
            action: "Downloaded the document",
        },
        {
            id: "9",
            timestamp: new Date(Date.now() - 5 * 3600000),
            action: "Anonymous viewer opened the document",
            details: "Austin, TX",
        },
        {
            id: "10",
            timestamp: new Date(Date.now() - 5 * 3600000 + 30000),
            action: "Viewed page 1 only",
            duration: 8,
            page: 1,
            details: "Quick bounce",
        },
        {
            id: "11",
            timestamp: new Date(Date.now() - 26 * 3600000),
            action: "Anonymous viewer opened the document",
            details: "London, UK",
        },
        {
            id: "12",
            timestamp: new Date(Date.now() - 26 * 3600000 + 120000),
            action: "Viewed all pages thoroughly",
            duration: 423,
            details: "Complete read-through",
        },
        {
            id: "13",
            timestamp: new Date(Date.now() - 24 * 3600000),
            action: "Same viewer returned",
            details: "London, UK",
        },
        {
            id: "14",
            timestamp: new Date(Date.now() - 24 * 3600000 + 60000),
            action: "Re-viewed pages 6-8",
            duration: 89,
            details: "Focused on product section",
        },
    ];

    return activities;
}
