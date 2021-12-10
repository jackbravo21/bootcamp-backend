import { Document, Schema, model } from "mongoose";


interface UserDocument {
    name: string;
    email: string;
    password: string;
    comparePassword(preHashPassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true    
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
        {
            timestamps: true
        }
);

//juntar tudo e definir a mesma coisa; definindo um model do tipo userDocument, e criando um schema a partir disso, o "User" eh soh uma referencia;
const User = model<UserDocument>("User", UserSchema);

//const user = User.find(x);

export default { User }