import {Schema, model} from 'mongoose';

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },

    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


export const Token = model('Token', tokenSchema);