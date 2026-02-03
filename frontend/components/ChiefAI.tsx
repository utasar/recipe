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
    tags?: string[];
    guide: string[];
    nextPrompt: string;
};

const CATEGORY_OPTIONS = [
    "Quick Meals",
    "High Protein",
    "Vegan",
    "Beginner Basics",
];

export default function ChiefAI() {
    const [step, setStep] = useState(0);
    const [mode, setMode] = useState<Mode>("cooking");
    const [skillLevel, setSkillLevel] = useState("beginner");
    const [fitnessGoal, setFitnessGoal] = useState("muscle-gain");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [data, setData] = useState<ChiefData>({
        ingredients: "",
        time: "",
        calories: "",
    });
    const [output, setOutput] = useState<PlanOutput | null>(null);

    const toggleTag = (tag: string) => {
        setSelectedTags((current) =>
            current.includes(tag)
                ? current.filter((item) => item !== tag)
                : [...current, tag]
        );
    };

    const generatePlan = () => {
        if (mode === "cooking") {
            const ingredientLead =
                data.ingredients.split(",")[0]?.trim() || "Chef";
            setOutput({
                title: `${skillLevel === "beginner" ? "Beginner" : "Intermediate"} ${
                    ingredientLead
                } Special`,
                duration: data.time ? `${data.time} mins` : "20 mins",
                tags: selectedTags,
                guide: [
                    `Prep: Organize your ${data.ingredients || "ingredients"}.`,
                    "Heat: Set your stove to medium-high.",
                    `Timing: Cook within ${data.time || "20"} minutes and taste as you go.`,
                    "Visual: Use the tutorial grid on the left if you get stuck.",
                ],
                nextPrompt: "Want a different variation of this dish?",
            });
        } else {
            const calorieTarget = data.calories || "2000";
            const macroPlan =
                fitnessGoal === "muscle-gain"
                    ? "45P/40C/15F"
                    : fitnessGoal === "weight-loss"
                        ? "35P/30C/35F"
                        : "30P/40C/30F";
            setOutput({
                title: "Fitness Performance Fuel",
                macros: `Target: ${calorieTarget} kcal | ${macroPlan}`,
                tags: selectedTags,
                guide: [
                    "Measure protein portions first.",
                    "Add leafy greens for fiber volume.",
                    "Prepare complex carbs (Rice/Sweet Potato) in bulk.",
                    "Hydrate and portion for the week.",
                ],
                nextPrompt: "Adjust these calories for your next workout?",
            });
        }
        setStep(1);
    };

    return (
        <div className="min-h-[520px] rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
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
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-600">
                                Skill level
                            </label>
                            <select
                                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                                value={skillLevel}
                                onChange={(event) =>
                                    setSkillLevel(event.target.value)
                                }
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                            </select>
                        </div>
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
                        {mode === "cooking" ? (
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
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-600">
                                    Fitness goal
                                </label>
                                <select
                                    className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                                    value={fitnessGoal}
                                    onChange={(event) =>
                                        setFitnessGoal(event.target.value)
                                    }
                                >
                                    <option value="muscle-gain">Muscle Gain</option>
                                    <option value="weight-loss">Weight Loss</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-slate-600">
                                Categories
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORY_OPTIONS.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                                            selectedTags.includes(tag)
                                                ? "border-orange-500 bg-orange-50 text-orange-700"
                                                : "border-slate-200 text-slate-500 hover:border-orange-300"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                    {output.tags && output.tags.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {output.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
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
                    <p className="mb-6 text-xs text-slate-400">
                        This AI provides general planning estimates. Consult a
                        healthcare professional or certified nutritionist before
                        starting a new diet or fitness program.
                    </p>
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
                                onClick={() => alert("Plan Saved!")}
                                className="flex-1 rounded-xl bg-black py-3 font-bold text-white"
                            >
                                Save Plan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
