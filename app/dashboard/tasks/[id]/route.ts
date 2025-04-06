import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const { status } = await req.json();

    if (!status || !id) {
      return NextResponse.json({ message: "Missing status or id" }, { status: 400 });
    }

    const result = await sql`
      UPDATE tasks 
      SET status = ${status} 
      WHERE id = ${id} 
      RETURNING *`;

    if (result.length === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
