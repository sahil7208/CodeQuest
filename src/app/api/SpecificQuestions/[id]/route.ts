

import dbConnect from "@/app/lib/mongodb";
import SpecificQuestion, { Squestions } from "@/app/modals/SpecificQuestions";
import {  NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: {
    id: string;
  };
}


export async function POST(req: NextRequest) {
  try {
    await dbConnect(); 
   
    const { id } = await req.json(); 
    console.log("id: ",id)
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    
    const question: Squestions | null = await SpecificQuestion.findOne({ id: Number(id) });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    
    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch questions: ", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
