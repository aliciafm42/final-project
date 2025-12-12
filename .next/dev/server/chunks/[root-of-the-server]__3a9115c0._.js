module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/lib/prisma.jsx [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/app/api/recommendations/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$jsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.jsx [app-route] (ecmascript)");
;
async function GET(req) {
    try {
        const url = new URL(req.url);
        const userId = Number(url.searchParams.get("userId"));
        if (!userId) {
            return new Response(JSON.stringify([
                {
                    id: 0,
                    title: "No recommendations yet",
                    description: "No userId provided.",
                    imageUrl: null,
                    link: null
                }
            ]), {
                status: 400
            });
        }
        // Fetch the user to get experienceLevel
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$jsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                experienceLevel: true
            }
        });
        if (!user?.experienceLevel) {
            return new Response(JSON.stringify([
                {
                    id: 0,
                    title: "No recommendations yet",
                    description: "Complete your profile to see recommendations.",
                    imageUrl: null,
                    link: null
                }
            ]), {
                status: 200
            });
        }
        // Fetch recommendations based on user's experienceLevel
        const recommendations = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$jsx__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].recommendation.findMany({
            where: {
                experienceLevel: user.experienceLevel
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        if (!recommendations.length) {
            return new Response(JSON.stringify([
                {
                    id: 0,
                    title: "No recommendations yet",
                    description: "No recommendations available for your experience level yet.",
                    imageUrl: null,
                    link: null
                }
            ]), {
                status: 200
            });
        }
        return new Response(JSON.stringify(recommendations), {
            status: 200
        });
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify([
            {
                id: 0,
                title: "No recommendations yet",
                description: "Something went wrong while fetching recommendations.",
                imageUrl: null,
                link: null
            }
        ]), {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3a9115c0._.js.map