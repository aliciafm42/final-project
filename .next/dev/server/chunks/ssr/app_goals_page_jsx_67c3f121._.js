module.exports = [
"[project]/app/goals/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoalsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function GoalsPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [goals, setGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedGoals, setSelectedGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const sustainableActions = [
        "Bike to work/school 3x/week",
        "Reduce meat consumption",
        "Use reusable bags",
        "Plant a tree",
        "Compost kitchen waste",
        "Avoid single-use plastics",
        "Use public transport",
        "Buy local products",
        "Save energy at home"
    ];
    // Fetch user's goals from Neon database
    const fetchGoals = async ()=>{
        if (!user) return;
        try {
            const res = await fetch("/api/goals/list?userId=" + user.id);
            const data = await res.json();
            setGoals(data.goals || []);
        } catch (err) {
            console.error("Failed to fetch goals:", err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchGoals();
    }, [
        user
    ]);
    const toggleSelection = (action)=>{
        setSelectedGoals((prev)=>prev.includes(action) ? prev.filter((g)=>g !== action) : [
                ...prev,
                action
            ]);
    };
    const handleAddSelectedGoals = async ()=>{
        if (!selectedGoals.length) return;
        const addedGoals = [];
        for (let text of selectedGoals){
            if (goals.some((g)=>g.text === text)) continue;
            try {
                const res = await fetch("/api/goals/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text,
                        userId: user.id
                    })
                });
                const data = await res.json();
                if (res.ok) addedGoals.push({
                    id: data.goal.id || text,
                    text
                });
            } catch (err) {
                console.error("Failed to add goal:", err);
            }
        }
        setGoals([
            ...goals,
            ...addedGoals
        ]);
        setSelectedGoals([]);
    };
    const handleDeleteGoal = async (goalId)=>{
        try {
            await fetch("/api/goals/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: goalId,
                    userId: user.id
                })
            });
            setGoals((prev)=>prev.filter((g)=>g.id !== goalId));
        } catch (err) {
            console.error("Failed to delete goal:", err);
        }
    };
    // If user is not logged in
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-contain",
            style: {
                textAlign: "center"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Set Your Eco Goals"
                }, void 0, false, {
                    fileName: "[project]/app/goals/page.jsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Start small, stay consistent, and watch your eco-friendly impact grow over time."
                }, void 0, false, {
                    fileName: "[project]/app/goals/page.jsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/profile",
                    className: "green-button",
                    style: {
                        marginTop: "30px",
                        display: "inline-block"
                    },
                    children: "Login or Register"
                }, void 0, false, {
                    fileName: "[project]/app/goals/page.jsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/goals/page.jsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    // Available actions not already added
    const availableActions = sustainableActions.filter((action)=>!goals.some((g)=>g.text === action));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-contain max-w-5xl mx-auto p-6 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-green-700 mb-8",
                children: "Pick Your Sustainable Goals"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 justify-items-center",
                children: [
                    availableActions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "You’ve added all available goals!"
                    }, void 0, false, {
                        fileName: "[project]/app/goals/page.jsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    availableActions.map((action)=>{
                        const isSelected = selectedGoals.includes(action);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>toggleSelection(action),
                            className: `cursor-pointer p-6 w-64 border rounded-lg transition-all duration-300 ${isSelected ? "bg-green-100 border-green-700 shadow-xl" : "bg-white border-green-700 hover:shadow-lg hover:bg-green-50"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-green-700 font-medium text-lg",
                                children: action
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        }, action, false, {
                            fileName: "[project]/app/goals/page.jsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            selectedGoals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAddSelectedGoals,
                className: "bg-green-700 text-white font-bold px-10 py-3 rounded-lg hover:bg-green-800 transition mb-8",
                children: "Add Selected Goals"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 132,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-semibold mb-4",
                children: "Your Goals:"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            goals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "No goals added yet."
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 142,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center",
                children: goals.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border rounded-lg shadow bg-white text-green-700 font-medium text-center w-64 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: g.text
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDeleteGoal(g.id),
                                className: "text-red-600 font-bold hover:text-red-800 ml-2",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this)
                        ]
                    }, g.id, true, {
                        fileName: "[project]/app/goals/page.jsx",
                        lineNumber: 146,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 144,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/goals/page.jsx",
        lineNumber: 106,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_goals_page_jsx_67c3f121._.js.map