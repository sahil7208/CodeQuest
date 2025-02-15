import {Schema,models,model,Document} from 'mongoose';

export interface TestCase {
    input: string;
    expectedOutput: string;
    target?: string;
  }

export interface Squestions extends Document {
    id: number;
    title: string;
    description: string[];
    testCases: TestCase[];
}



const SpecificQuestionSchema = new Schema<Squestions>({
    id: { type: Number },
    title: {type: String, required: true},
    description: { type: [String], required: true},
    testCases: [{
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true }
      }]
})

const SpecificQuestion = models.SpecificQuestion || model<Squestions>('SpecificQuestion', SpecificQuestionSchema);

export default SpecificQuestion;