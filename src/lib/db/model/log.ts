import { Schema, model } from "mongoose";

export interface Log {
    turns: Array<any>,
    combat: string,
    date: Date,
    status: boolean
}

const LogSchema = new Schema<Log>({
    turns: { type: Object },
    combat: { type: String },
    date: { type: Date },
    status: { type: Boolean }
})

const logModel = model<Log>('logs', LogSchema);

export default logModel;
