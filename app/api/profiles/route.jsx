import { sql } from "@/lib/db";

// GET → fetch all profiles
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const major = searchParams.get("major");
    const year = searchParams.get("year");
    const q = searchParams.get("q");

    let query = "SELECT * FROM profiles WHERE 1=1";
    let params = [];

    if (major) {
      params.push(major);
      query += ` AND LOWER(major) = LOWER($${params.length})`;
    }

    if (year) {
      params.push(Number(year));
      query += ` AND year = $${params.length}`;
    }

    if (q) {
      params.push(`%${q}%`);
      query += ` AND LOWER(name) LIKE LOWER($${params.length})`;
    }

    const rows = await sql.query(query, params);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error("GET Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch profiles" }),
      { status: 500 }
    );
  }
}

// POST → insert a new profile
export async function POST(request) {
  try {
    const { name, major, year, gpa } = await request.json();

    const inserted = await sql.query(
      `INSERT INTO profiles (name, major, year, gpa)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, major, year, gpa]
    );

    return new Response(JSON.stringify(inserted[0]), { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to save profile" }),
      { status: 400 }
    );
  }
}
