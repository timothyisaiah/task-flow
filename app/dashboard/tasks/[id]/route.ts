import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  const { id } = params;

  try {
    const result = await sql`UPDATE tasks SET status = ${status} WHERE id = ${id} RETURNING *`

    if (!result) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
