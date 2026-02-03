const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
    );

    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
    );

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

function addMeal(mealData, random = false) {
    console.log(mealData);

    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random
                    ? `
            <span class="random"> Random Recipe </span>`
                    : ""
            }
            <img
                src="${mealData.strMealThumb}"
                alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
    }
}

function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    // clean it up
    mealInfoEl.innerHTML = "";

    // update the Meal info
    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${
                    mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
                .map(
                    (ing) => `
            <li>${ing}</li>
            `
                )
                .join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
    // clean container
    mealsEl.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});

const chiefForm = document.getElementById("chief-form");
const chiefGoal = document.getElementById("chief-goal");
const chiefIngredients = document.getElementById("chief-ingredients");
const chiefTime = document.getElementById("chief-time");
const chiefCalories = document.getElementById("chief-calories");
const chiefTags = document.getElementById("chief-tags");
const chiefOutput = document.getElementById("chief-output");
const chiefPlanTitle = document.getElementById("chief-plan-title");
const chiefMeta = document.getElementById("chief-meta");
const chiefSteps = document.getElementById("chief-steps");
const chiefReset = document.getElementById("chief-reset");

const beginnerIdeas = [
    {
        title: "15-minute skillet stir-fry",
        steps: [
            "Prep your ingredients and chop into bite-size pieces.",
            "Heat a pan to medium and cook protein first for 5 minutes.",
            "Add veggies and sauce, then simmer for 6-8 minutes.",
            "Serve with rice or noodles and garnish with herbs.",
        ],
    },
    {
        title: "Sheet-pan veggie roast",
        steps: [
            "Preheat the oven to 400°F and line a tray.",
            "Toss veggies with oil, salt, and pepper.",
            "Roast for 20-25 minutes, flipping halfway.",
            "Finish with lemon and serve with grains.",
        ],
    },
    {
        title: "Cozy one-pot soup",
        steps: [
            "Sweat onions and garlic in a pot for 3 minutes.",
            "Add broth, chopped veggies, and seasonings.",
            "Simmer for 15-20 minutes until tender.",
            "Stir in greens or beans and serve warm.",
        ],
    },
];

const fitnessIdeas = [
    {
        title: "High-protein chicken bowl",
        macros: "45g P / 55g C / 14g F",
        steps: [
            "Cook lean protein with garlic and paprika.",
            "Steam veggies and warm a grain of choice.",
            "Assemble with a yogurt-based sauce.",
            "Portion into containers for the week.",
        ],
    },
    {
        title: "Balanced salmon meal prep",
        macros: "38g P / 40g C / 18g F",
        steps: [
            "Roast salmon with lemon and herbs for 12 minutes.",
            "Bake sweet potato cubes alongside the fish.",
            "Add a side salad with olive oil dressing.",
            "Divide into meal-prep boxes.",
        ],
    },
    {
        title: "Veggie-powered grain bowl",
        macros: "30g P / 60g C / 12g F",
        steps: [
            "Sauté tofu or beans with spices.",
            "Cook quinoa or brown rice until fluffy.",
            "Add roasted veggies and a light sauce.",
            "Pack with a citrus vinaigrette.",
        ],
    },
];

const selectedTags = new Set();

if (chiefTags) {
    chiefTags.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            const tag = button.dataset.tag;
            if (!tag) {
                return;
            }
            if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
                button.classList.remove("active");
            } else {
                selectedTags.add(tag);
                button.classList.add("active");
            }
        });
    });
}

function renderChiefPlan({ title, metaLines, steps }) {
    chiefPlanTitle.textContent = title;
    chiefMeta.innerHTML = metaLines.map((line) => `<div>${line}</div>`).join("");
    chiefSteps.innerHTML = steps
        .map((step, index) => `<li>Step ${index + 1}: ${step}</li>`)
        .join("");
    chiefOutput.classList.remove("hidden");
}

function buildBeginnerPlan(ingredients, time, tags) {
    const idea = beginnerIdeas[Math.floor(Math.random() * beginnerIdeas.length)];
    const safeIngredients = ingredients || "the ingredients you shared";
    const selectedTagLine = tags.length ? `Focus: ${tags.join(", ")}` : "";
    const timeLine = time ? `Time goal: ${time} minutes` : "Time goal: 20 minutes";
    return {
        title: `${idea.title} with ${safeIngredients}`,
        metaLines: [timeLine, selectedTagLine].filter(Boolean),
        steps: [
            `Gather ${safeIngredients} and set up your workspace.`,
            ...idea.steps,
            "Taste, adjust seasoning, and plate like a pro.",
        ],
    };
}

function buildFitnessPlan(calories, ingredients, tags) {
    const idea = fitnessIdeas[Math.floor(Math.random() * fitnessIdeas.length)];
    const targetCalories = calories ? `${calories} kcal target` : "Calorie goal: 2200 kcal";
    const selectedTagLine = tags.length ? `Preferences: ${tags.join(", ")}` : "";
    const ingredientsLine = ingredients
        ? `Use: ${ingredients}`
        : "Use: lean protein, veggies, and complex carbs";
    return {
        title: idea.title,
        metaLines: [targetCalories, idea.macros, ingredientsLine, selectedTagLine].filter(
            Boolean
        ),
        steps: idea.steps,
    };
}

if (chiefForm) {
    chiefForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const goal = chiefGoal.value;
        const ingredients = chiefIngredients.value.trim();
        const time = chiefTime.value.trim();
        const calories = chiefCalories.value.trim();
        const tags = Array.from(selectedTags);

        if (goal === "fitness") {
            renderChiefPlan(buildFitnessPlan(calories, ingredients, tags));
        } else {
            renderChiefPlan(buildBeginnerPlan(ingredients, time, tags));
        }
    });
}

if (chiefReset) {
    chiefReset.addEventListener("click", () => {
        chiefOutput.classList.add("hidden");
        chiefPlanTitle.textContent = "";
        chiefMeta.textContent = "";
        chiefSteps.textContent = "";
    });
}
