"use client";

import React, { useState } from "react";

type Mode = "cooking" | "fitness";

type ChiefData = {
    ingredients: string;
    time: string;
    calories: string;
};

type PlanOutput = {
    title: string;
    duration?: string;
    macros?: string;
    guide: string[];
    nextPrompt: string;
};

export default function ChiefAI() {
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState<Mode>("cooking");
    const [data, setData] = useState<ChiefData>({
        ingredients: "",
        time: "",
        calories: "",
    });
    const [output, setOutput] = useState<PlanOutput | null>(null);

    const generatePlan = () => {
        if (mode === "cooking") {
            const ingredientLead =
                data.ingredients.split(",")[0]?.trim() || "Chef";
            setOutput({
                title: `Beginner ${ingredientLead} Special`,
                duration: data.time ? `${data.time} mins` : "20 mins",
                guide: [
                    `Prep: Organize your ${data.ingredients || "items"}.`,
                    `Execution: Follow the time duration of ${
                        data.time || "20"
                    } mins carefully.`,
                    "Visual: Check the Masterclass videos on the left for technique.",
                ],
                nextPrompt:
                    "Does this look good, or should Chief suggest a new dish?",
            });
        } else {
            const calorieTarget = data.calories || "2200";
            setOutput({
                title: "Precision Fitness Fuel",
                macros: `Target: ${calorieTarget} kcal | 40% P / 40% C / 20% F`,
                guide: [
                    "Calculate portion sizes based on your calorie goal.",
                    "Prep high-protein base first.",
                    "Steam greens for volume.",
                ],
                nextPrompt:
                    "Want to adjust these calories for your next gym session?",
            });
        }
        setStep(1);
    };

    return (
        <div className="min-h-[500px] rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
            {step === 0 && (
                <div className="animate-in fade-in duration-500">
                    <div className="mb-8 flex gap-2 rounded-xl bg-slate-100 p-1">
                        <button
                            type="button"
                            onClick={() => setMode("cooking")}
                            className={`flex-1 rounded-lg py-3 font-bold transition ${
                                mode === "cooking"
                                    ? "bg-white text-orange-600 shadow-sm"
                                    : "text-slate-500"
                            }`}
                        >
                            Cook Mode
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("fitness")}
                            className={`flex-1 rounded-lg py-3 font-bold transition ${
                                mode === "fitness"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : "text-slate-500"
                            }`}
                        >
                            Gym Mode
                        </button>
                    </div>

                    <h2 className="mb-6 text-3xl font-black">
                        Hello, I&apos;m Chief.
                    </h2>
                    <div className="space-y-4">
                        <input
                            className="w-full rounded-2xl border-none bg-slate-50 p-4 focus:ring-2 focus:ring-orange-500"
                            placeholder={
                                mode === "cooking"
                                    ? "What ingredients are in your fridge?"
                                    : "Enter daily calorie target (e.g., 2500)"
                            }
                            onChange={(event) =>
                                setData((prev) => ({
                                    ...prev,
                                    ingredients: event.target.value,
                                    calories: event.target.value,
                                }))
                            }
                            value={
                                mode === "cooking"
                                    ? data.ingredients
                                    : data.calories
                            }
                        />
                        {mode === "cooking" && (
                            <input
                                className="w-full rounded-2xl border-none bg-slate-50 p-4 focus:ring-2 focus:ring-orange-500"
                                placeholder="How much time do you have? (mins)"
                                onChange={(event) =>
                                    setData((prev) => ({
                                        ...prev,
                                        time: event.target.value,
                                    }))
                                }
                                value={data.time}
                            />
                        )}
                        <button
                            type="button"
                            onClick={generatePlan}
                            className="w-full rounded-2xl bg-black py-5 text-lg font-black text-white transition-colors hover:bg-orange-600"
                        >
                            Generate Revolutionary Plan
                        </button>
                    </div>
                </div>
            )}

            {step === 1 && output && (
                <div className="animate-in slide-in-from-right duration-500">
                    <span className="rounded-full bg-orange-100 px-4 py-1 text-xs font-black uppercase tracking-widest text-orange-600">
                        {output.title}
                    </span>
                    <h2 className="mb-2 mt-4 text-4xl font-black">
                        {output.title}
                    </h2>
                    {output.duration && (
                        <p className="mb-4 text-sm text-slate-500">
                            Estimated time: {output.duration}
                        </p>
                    )}
                    {output.macros && (
                        <p className="mb-4 font-bold text-blue-600">
                            {output.macros}
                        </p>
                    )}
                    <div className="my-8 space-y-4">
                        {output.guide.map((stepText, index) => (
                            <div
                                key={`${stepText}-${index}`}
                                className="flex items-start gap-4"
                            >
                                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                                    {index + 1}
                                </span>
                                <p className="pt-1 leading-relaxed text-slate-600">
                                    {stepText}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-6">
                        <p className="mb-4 text-center font-bold">
                            {output.nextPrompt}
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="flex-1 rounded-xl border border-slate-200 bg-white py-3 font-bold hover:bg-slate-100"
                            >
                                Suggest New Dish
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(0)}
                                className="flex-1 rounded-xl bg-black py-3 font-bold text-white"
                            >
                                Lock This In
                            </button>
                        </div>
                        {mode === "fitness" && (
                            <p className="mt-4 text-xs text-slate-500">
                                Planning-only: consult a professional for
                                medical diets.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
