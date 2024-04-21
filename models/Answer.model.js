import { Schema, models, model } from "mongoose";

const AnswerSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    createdAt: {type: Date, default: Date.now},
    
})

const Answer = models.Answer || model('Answer', AnswerSchema)

export default Answer;