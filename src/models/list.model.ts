import { Document, Schema, model, SchemaTypes } from "mongoose";

interface ListDocument {
    user_id: string;
    movie_id: string;
}

const ListSchema = new Schema(
    {
        user_id: {
            type: SchemaTypes.ObjectId,
            require: true,
            ref: "User"
        },
        modie_id: {
            type: SchemaTypes.ObjectId,
            require: true,
            ref: "Movie"
        }
    },
    {
        timestamps: true
    }
);

const List = model<ListDocument>("List", ListSchema);

export { List };
