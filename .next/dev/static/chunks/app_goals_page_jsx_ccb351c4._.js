(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/goals/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GoalsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function GoalsPage() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [goals, setGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedGoals, setSelectedGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
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
            const normalizedGoals = (data.goals || []).map((g)=>typeof g === "string" ? {
                    id: g,
                    text: g
                } : g);
            setGoals(normalizedGoals);
        } catch (err) {
            console.error("Failed to fetch goals:", err);
        }
    };
    // Toggle card selection
    const toggleSelection = (action)=>{
        setSelectedGoals((prev)=>prev.includes(action) ? prev.filter((g)=>g !== action) : [
                ...prev,
                action
            ]);
    };
    // Add selected goals
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
    // Delete a goal
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GoalsPage.useEffect": ()=>{
            fetchGoals();
        }
    }["GoalsPage.useEffect"], [
        user
    ]);
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "text-center mt-20 text-red-600",
        children: "Please login to view goals."
    }, void 0, false, {
        fileName: "[project]/app/goals/page.jsx",
        lineNumber: 89,
        columnNumber: 7
    }, this);
    // Show only actions not already added
    const availableActions = sustainableActions.filter((action)=>!goals.some((g)=>g.text === action));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-contain max-w-5xl mx-auto p-6 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-green-700 mb-8",
                children: "Pick Your Sustainable Goals"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 justify-items-center",
                children: [
                    availableActions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "You’ve added all available goals!"
                    }, void 0, false, {
                        fileName: "[project]/app/goals/page.jsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    availableActions.map((action)=>{
                        const isSelected = selectedGoals.includes(action);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>toggleSelection(action),
                            className: `cursor-pointer p-6 w-64 border rounded-lg transition-all duration-300 ${isSelected ? "bg-green-100 border-green-700 shadow-xl" : "bg-white border-green-700 hover:shadow-lg hover:bg-green-50"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-green-700 font-medium text-lg",
                                children: action
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this)
                        }, action, false, {
                            fileName: "[project]/app/goals/page.jsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            selectedGoals.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAddSelectedGoals,
                className: "bg-green-700 text-white font-bold px-10 py-3 rounded-lg hover:bg-green-800 transition mb-8",
                children: "Add Selected Goals"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 130,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-semibold mb-4",
                children: "Your Goals:"
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            goals.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-600",
                children: "No goals added yet."
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 141,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center",
                children: goals.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 border rounded-lg shadow bg-white text-green-700 font-medium text-center w-64 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: g.text
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleDeleteGoal(g.id),
                                className: "text-red-600 font-bold hover:text-red-800 ml-2",
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/goals/page.jsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this)
                        ]
                    }, g.id, true, {
                        fileName: "[project]/app/goals/page.jsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/goals/page.jsx",
                lineNumber: 143,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/goals/page.jsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(GoalsPage, "0jyh+OxDoReq/z82QqBuMeqYbDs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = GoalsPage;
var _c;
__turbopack_context__.k.register(_c, "GoalsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_goals_page_jsx_ccb351c4._.js.map