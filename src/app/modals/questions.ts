import { Schema, model, models, Document } from 'mongoose';

export type questions = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "🔒Locked" | "Unlocked";
  route?: string;
}

export interface IQuestion extends Document {
 category: string;
 questions: questions[];
}

const questionSchema = new Schema<IQuestion>({
  category: {type: String, required: true},
  questions: [{
    title: {type: String, required: true},
    id: {type: String, required: true},
    difficulty: {type: String, required: true, enum: ['Easy','Medium','Hard']},
    status:{type: String, required: true,enum:["🔒Locked","Unlocked"]},
    route: {type: String,required: true}
  }
  ]
}
//   {
//   title: { type: String, required: true },
//   difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
//   status: { type: String, required: true },
// }
);

const Question = models.Question || model<IQuestion>('Question', questionSchema);

export default Question;
