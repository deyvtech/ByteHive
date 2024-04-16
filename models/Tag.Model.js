import { Schema, models, model } from "mongoose";


const TagSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag;