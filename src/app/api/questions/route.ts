import {  NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Question, { IQuestion } from '@/app/modals/questions';


export async function GET() {
  try {
   
    await dbConnect();

    
    const questions: IQuestion[] = await Question.find({});
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

