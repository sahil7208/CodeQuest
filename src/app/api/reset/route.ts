// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/app/lib/mongodb';
// import Question from '@/app/modals/questions';

// export async function POST(req: NextRequest) {
//   try {
//     // Connect to the database
//     await dbConnect();
//     console.log('Database connected.');

//     // Fetch all categories
//     const allCategories = await Question.find();
//     console.log('Fetched all categories:', allCategories);

//     // Ensure categories and their questions are not null or undefined
//     const changed = allCategories.map((category) => {
//       if (category && Array.isArray(category.questions)) {
//         category.questions.forEach((question) => {
//           // Check if each question is not null or undefined before updating
//           if (question && typeof question === 'object' && question.status !== undefined) {
//             question.status = "unlocked"; // Update the status to "unlocked"
//           } else {
//             console.warn('Skipping invalid question:', question);
//           }
//         });

//         // Only save if there are valid questions
//         return category.save();
//       } else {
//         console.warn('Skipping category with invalid or missing questions:', category);
//         return null; // Skip saving this category if questions are invalid
//       }
//     });

//     // Filter out null values (categories that weren't saved)
//     const validChanged = changed.filter((category) => category !== null);

//     // Wait for all updates to finish
//     await Promise.all(validChanged);

//     if (!allCategories || allCategories.length === 0) {
//       return NextResponse.json(
//         { message: 'No categories found in the database' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: 'Questions updated successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating questions:', error.message, error.stack);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
