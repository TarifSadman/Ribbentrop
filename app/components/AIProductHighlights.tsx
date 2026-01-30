"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface AIProductHighlightsProps {
    productId: string;
    productName: string;
    productDescription: string;
    productTags: string[];
}

export default function AIProductHighlights({
    productId,
    productName,
    productDescription,
    productTags,
}: AIProductHighlightsProps) {
    const [highlights, setHighlights] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function fetchHighlights() {
            if (!productName || !productDescription) return;

            // 1. Check Cache first to prevent unnecessary API calls
            const cacheKey = `ai_highlights_${productId}`;
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                try {
                    setHighlights(JSON.parse(cached));
                    return;
                } catch (e) {
                    sessionStorage.removeItem(cacheKey);
                }
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/ai/product-highlights", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        productName,
                        productDescription,
                        productTags,
                    }),
                });

                if (!response.ok) {
                    const text = await response.text();
                    try {
                        const json = JSON.parse(text);
                        throw new Error(json.details || json.error || `Server error: ${response.status}`);
                    } catch {
                        throw new Error(`Server error (${response.status}). The API route might not be found or returned HTML.`);
                    }
                }

                const data = await response.json();

                if (ignore) return;

                // Resilience: Check for nested highlights if the AI got creative with keys
                let finalHighlights = data.highlights;
                if (!finalHighlights) {
                    // Look for any key that might contain an array
                    const firstKey = Object.keys(data)[0];
                    if (data[firstKey] && typeof data[firstKey] === 'object' && data[firstKey].highlights) {
                        finalHighlights = data[firstKey].highlights;
                    } else if (Array.isArray(data[firstKey])) {
                        finalHighlights = data[firstKey];
                    }
                }

                setHighlights(finalHighlights || []);

                // 2. Save to Cache for next time
                if (finalHighlights && finalHighlights.length > 0) {
                    sessionStorage.setItem(cacheKey, JSON.stringify(finalHighlights));
                }
            } catch (err: any) {
                if (ignore) return;
                setError(err.message || "Failed to load highlights");
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        fetchHighlights();

        return () => {
            ignore = true;
        };
    }, [productId, productName, productDescription, productTags]);

    if (loading) {
        return (
            <div className="mt-8 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm animate-pulse">
                <div className="flex items-center gap-2 mb-4">
                    <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                    <span className="text-sm font-semibold text-purple-500 uppercase tracking-widest">
                        AI Assistant is thinking...
                    </span>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-purple-500/10 rounded w-3/4"></div>
                    <div className="h-4 bg-purple-500/10 rounded w-5/6"></div>
                    <div className="h-4 bg-purple-500/10 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs">
                AI Assistant: {error}
            </div>
        );
    }

    if (highlights.length === 0) return null;

    return (
        <div className="mt-8 relative overflow-hidden group">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-2xl -z-10 group-hover:from-purple-500/20 transition-colors duration-500"></div>

            <div className="p-6 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md shadow-xl border-l-[6px] border-l-purple-500">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                        Why You'll Love This
                    </h3>
                </div>

                <ul className="space-y-4">
                    {highlights.map((point, index) => (
                        <li key={index} className="flex gap-3 text-[var(--foreground)]/90 leading-relaxed group/item">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-bold group-hover/item:bg-purple-500 group-hover/item:text-white transition-colors duration-300">
                                {index + 1}
                            </span>
                            <p className="text-sm md:text-base font-medium">{point}</p>
                        </li>
                    ))}
                </ul>

                {/* Small badge */}
                <div className="mt-6 flex justify-end">
                    <span className="text-[10px] text-gray-400 italic">Powered by Ribbentrop AI Insight</span>
                </div>
            </div>
        </div>
    );
}
