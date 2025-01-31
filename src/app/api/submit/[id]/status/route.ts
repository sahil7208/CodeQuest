import dbConnect from "@/app/lib/mongodb";
import Question, { IQuestion } from "@/app/modals/questions";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
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

        // Use a strict query to match the string ID
        const result:IQuestion | null = await Question.findOneAndUpdate(
          { "questions.id": questionId }, // Query for the question ID
          {
              $set: { "questions.$[elem].status": " ✅ completed" }, // Update status
          },
          {
              arrayFilters: [{ "elem.id": questionId }], // Match only the correct array element
              new: true, // Return the updated document
          }
      );

        if (!result) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        console.log("Question status updated successfully: ", result);

        return NextResponse.json({ message: "Question completed successfully", data: result });
    } catch (error) {
        console.error("Failed to update question status: ", error);
        return NextResponse.json({ error: "Failed to update question status" }, { status: 500 });
    }
}
