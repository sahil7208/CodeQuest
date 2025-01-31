import dbConnect from "@/app/lib/mongodb";
import SpecificQuestion, { Squestions } from "@/app/modals/SpecificQuestions";
import { NextRequest, NextResponse } from "next/server";

// API route for fetching a specific question by `id`
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); // Connect to MongoDB

    const  id  =  Number(await params.id); // Extract `id` from the URL
    if (!id) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Fetch question by ID (convert `id` to a number if necessary)
    const question: Squestions | null = await SpecificQuestion.findOne({ id: Number (id) });
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    // Return the question
    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch questions: ", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
