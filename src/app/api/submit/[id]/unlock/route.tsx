import dbConnect from "@/app/lib/mongodb";
import Question, { IQuestion } from "@/app/modals/questions";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH( context: { params: { id: string } }) {
    const { params } = context;
    const questionId = params?.id;

    try {
        console.log("Attempting to connect to the database...");
        await dbConnect();
        console.log("Database connection successful.");

        if (!questionId) {
            return NextResponse.json({ error: "Question ID is required" }, { status: 400 });
        }

        console.log("PATCH request received with Question ID: ", questionId);

        
        const result:IQuestion | null = await Question.findOneAndUpdate(
          { "questions.id": questionId }, 
          {
              $set: { "questions.$[elem].status": "Unlocked" }, 
          },
          {
              arrayFilters: [{ "elem.id": questionId }], 
              new: true, 
          }
      );

        if (!result) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        console.log("Question status updated successfully: ", result);

        return NextResponse.json({ message: "Question unlocked successfully", data: result });
    } catch (error) {
        console.error("Failed to update question status: ", error);
        return NextResponse.json({ error: "Failed to update question status" }, { status: 500 });
    }
}
