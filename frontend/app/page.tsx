"use client";

import React from "react";
import ChiefAI from "../components/ChiefAI";

const TUTORIAL_VIDEOS = [
    {
        id: "1",
        title: "Mastering Knife Skills",
        thumb: "https://img.youtube.com/vi/G-Fg7l7G1zw/0.jpg",
        url: "https://youtu.be/G-Fg7l7G1zw",
    },
    {
        id: "2",
        title: "Healthy Meal Prep 101",
        thumb: "https://img.youtube.com/vi/9AdO67vT2sM/0.jpg",
        url: "https://youtu.be/9AdO67vT2sM",
    },
    {
        id: "3",
        title: "Beginner Pan Searing",
        thumb: "https://img.youtube.com/vi/srP6O56P-S4/0.jpg",
        url: "https://youtu.be/srP6O56P-S4",
    },
];

export default function RevolutionaryApp() {
    return (
        <div className="min-h-screen bg-[#fafafa] p-6 font-sans text-slate-900 md:p-12">
            <header className="mx-auto mb-16 max-w-5xl text-center">
                <h1 className="mb-4 text-5xl font-black tracking-tight">
                    CHIEF <span className="text-orange-500">AI</span>
                </h1>
                <p className="text-xl text-slate-500">
                    The Kitchen & Fitness Revolution starts here.
                </p>
            </header>

            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-1">
                    <h2 className="border-b pb-2 text-2xl font-bold">
                        Masterclass Tutorials
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {TUTORIAL_VIDEOS.map((video) => (
                            <a
                                key={video.id}
                                href={video.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                            >
                                <img
                                    src={video.thumb}
                                    alt={video.title}
                                    className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold transition group-hover:text-orange-500">
                                        {video.title}
                                    </h3>
                                    <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                                        Watch Now →
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <ChiefAI />
                </div>
            </section>
        </div>
    );
}
