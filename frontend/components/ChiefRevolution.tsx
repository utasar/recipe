"use client";

import React, { useMemo, useState } from "react";

type Mode = "beginner" | "gym";

type Plan = {
    title: string;
    steps: string[];
    meta: string[];
};

const TUTORIALS = [
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

const COOKING_STEPS = [
    "Prep and organize ingredients on your counter.",
    "Heat a pan to medium and cook protein first.",
    "Add vegetables and seasonings, then simmer gently.",
    "Taste, adjust seasoning, and plate with care.",
];

const FITNESS_STEPS = [
    "Measure your protein source and prep veggies.",
    "Cook complex carbs and assemble balanced portions.",
    "Add a light sauce or seasoning to finish.",
    "Pack into containers for easy grab-and-go meals.",
];

export default function ChiefRevolution() {
    const [mode, setMode] = useState<Mode>("beginner");
    const [ingredients, setIngredients] = useState("");
    const [time, setTime] = useState("");
    const [calories, setCalories] = useState("");
    const [plan, setPlan] = useState<Plan | null>(null);

    const ingredientLead = useMemo(() => {
        const first = ingredients
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)[0];
        return first || "pantry";
    }, [ingredients]);

    const macroEstimate = useMemo(() => {
        const calorieTarget = Number(calories) || 2200;
        const protein = Math.round((calorieTarget * 0.3) / 4);
        const carbs = Math.round((calorieTarget * 0.4) / 4);
        const fats = Math.round((calorieTarget * 0.3) / 9);
        return `${protein}g P / ${carbs}g C / ${fats}g F`;
    }, [calories]);

    const generatePlan = () => {
        if (mode === "beginner") {
            setPlan({
                title: `Beginner ${ingredientLead} guide`,
                meta: [
                    `Time: ${time ? `${time} mins` : "20 mins"}`,
                    `Ingredients: ${ingredients || "chef's choice"}`,
                ],
                steps: [
                    `Start by preparing ${ingredients || "your ingredients"}.`,
                    ...COOKING_STEPS,
                    "Use the tutorial videos for extra technique help.",
                ],
            });
        } else {
            setPlan({
                title: "Gym-ready meal plan",
                meta: [
                    `Calories: ${calories || "2200"} kcal`,
                    `Macros: ${macroEstimate}`,
                ],
                steps: FITNESS_STEPS,
            });
        }
    };

    const handleSuggestNew = () => {
        setPlan(null);
    };

    const handleSave = () => {
        alert("Plan saved!");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 text-slate-900 md:p-10">
            <div className="mx-auto max-w-5xl space-y-10">
                <header className="text-center">
                    <h1 className="text-4xl font-extrabold md:text-5xl">
                        Chief AI Revolution
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Cooking and fitness guidance in one interactive engine.
                    </p>
                </header>

                <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                    <div className="rounded-3xl bg-white p-6 shadow-lg">
                        <div className="flex gap-3 rounded-2xl bg-slate-100 p-2">
                            <button
                                type="button"
                                onClick={() => setMode("beginner")}
                                className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold ${
                                    mode === "beginner"
                                        ? "bg-white text-orange-600 shadow"
                                        : "text-slate-500"
                                }`}
                            >
                                Beginner Mode
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("gym")}
                                className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold ${
                                    mode === "gym"
                                        ? "bg-white text-blue-600 shadow"
                                        : "text-slate-500"
                                }`}
                            >
                                Gym Mode
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <label className="block text-sm font-semibold">
                                Ingredients
                            </label>
                            <input
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                placeholder="Chicken, rice, spinach..."
                                value={ingredients}
                                onChange={(event) =>
                                    setIngredients(event.target.value)
                                }
                            />
                            <label className="block text-sm font-semibold">
                                Time available (mins)
                            </label>
                            <input
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                placeholder="20"
                                value={time}
                                onChange={(event) =>
                                    setTime(event.target.value)
                                }
                            />
                            <label className="block text-sm font-semibold">
                                Calories target (gym mode)
                            </label>
                            <input
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                placeholder="2200"
                                value={calories}
                                onChange={(event) =>
                                    setCalories(event.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={generatePlan}
                                className="w-full rounded-2xl bg-black py-4 text-lg font-bold text-white transition hover:bg-orange-600"
                            >
                                Generate Guide
                            </button>
                        </div>

                        {plan && (
                            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="text-2xl font-bold">
                                    {plan.title}
                                </h2>
                                <div className="mt-2 space-y-1 text-sm text-slate-500">
                                    {plan.meta.map((item) => (
                                        <div key={item}>{item}</div>
                                    ))}
                                </div>
                                <ul className="mt-5 space-y-3 text-slate-700">
                                    {plan.steps.map((step, index) => (
                                        <li
                                            key={`${step}-${index}`}
                                            className="flex gap-3"
                                        >
                                            <span className="font-bold text-orange-600">
                                                {index + 1}.
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={handleSuggestNew}
                                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 font-semibold"
                                    >
                                        Suggest New Dish
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="flex-1 rounded-xl bg-black py-3 font-semibold text-white"
                                    >
                                        Save Plan
                                    </button>
                                </div>
                            </div>
                        )}
                        <p className="mt-6 text-xs text-slate-500">
                            This AI provides general planning estimates.
                            Consult with a healthcare professional or certified
                            nutritionist before starting a new diet or fitness
                            program.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">
                            Tutorial Video Links
                        </h3>
                        <div className="grid gap-4">
                            {TUTORIALS.map((video) => (
                                <a
                                    key={video.id}
                                    href={video.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
                                >
                                    <img
                                        src={video.thumb}
                                        alt={video.title}
                                        className="h-36 w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="p-4">
                                        <h4 className="font-semibold group-hover:text-orange-500">
                                            {video.title}
                                        </h4>
                                        <p className="text-xs text-slate-400">
                                            Watch tutorial →
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
