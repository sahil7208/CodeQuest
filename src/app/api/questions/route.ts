import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Question, { IQuestion } from '@/app/modals/questions';

// Handler for GET requests
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all questions from the database
    const questions: IQuestion[] = await Question.find({});
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

// Optional: Add support for other methods as needed
