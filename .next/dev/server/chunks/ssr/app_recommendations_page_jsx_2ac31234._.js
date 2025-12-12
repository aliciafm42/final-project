module.exports = [
"[project]/app/recommendations/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecommendationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function RecommendationsPage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const recommendations = [
        {
            id: 1,
            title: "Save Energy Tips",
            description: "Simple energy-saving tips for beginners. Turn off lights, unplug devices, and reduce water heating costs.",
            imageUrl: "data:image/jpeg;base64,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",
            link: "https://www.energy.gov/energysaver/energy-saver",
            level: "BEGINNER"
        },
        {
            id: 2,
            title: "Composting Guide",
            description: "Learn to compost your kitchen and garden waste. Improve soil health and reduce landfill contribution.",
            imageUrl: "data:image/jpeg;base64,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",
            link: "https://www.epa.gov/recycle/composting-home",
            level: "INTERMEDIATE"
        },
        {
            id: 3,
            title: "Sustainable Travel",
            description: "Reduce your carbon footprint while traveling. Choose eco-friendly transportation and accommodations.",
            imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
            link: "https://www.sustainabletravel.org",
            level: "EXPERIENCED"
        }
    ];
    if (!user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-contain",
            style: {
                textAlign: "center"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Recommendations Tailored Towards Experience"
                }, void 0, false, {
                    fileName: "[project]/app/recommendations/page.jsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "The Recommendations page offers personalized sustainability tips and resources, helping users discover and track eco-friendly actions."
                }, void 0, false, {
                    fileName: "[project]/app/recommendations/page.jsx",
                    lineNumber: 46,
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
                    fileName: "[project]/app/recommendations/page.jsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/recommendations/page.jsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-6xl mx-auto p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-green-700 mb-10 text-center",
                children: "Your Sustainability Recommendations"
            }, void 0, false, {
                fileName: "[project]/app/recommendations/page.jsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-10",
                style: {
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
                },
                children: recommendations.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: "white",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            textAlign: "center",
                            marginBottom: "20px"
                        },
                        children: [
                            rec.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: rec.imageUrl,
                                alt: rec.title,
                                style: {
                                    width: "250px",
                                    height: "auto",
                                    borderRadius: "10px",
                                    marginBottom: "12px",
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.jsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    color: "#2e8b57",
                                    marginBottom: "8px"
                                },
                                children: [
                                    rec.title,
                                    " (",
                                    rec.level,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/recommendations/page.jsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    marginBottom: "12px"
                                },
                                children: rec.description
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.jsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            rec.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: rec.link,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    display: "inline-block",
                                    backgroundColor: "#2e8b57",
                                    color: "white",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    textDecoration: "none"
                                },
                                children: "Learn More →"
                            }, void 0, false, {
                                fileName: "[project]/app/recommendations/page.jsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this)
                        ]
                    }, rec.id, true, {
                        fileName: "[project]/app/recommendations/page.jsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/recommendations/page.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/recommendations/page.jsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_recommendations_page_jsx_2ac31234._.js.map