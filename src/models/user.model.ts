import { Document, Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

interface UserDocument extends Document {
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

//arrow function nao tem acesso a funcao this, por isso nao se usa;
UserSchema.pre("save", async function(next){
    const user = this as UserDocument;

    //rodar somente quando a senha for nova;
    if(!user.isModified("password")){
        return next();
    };

    //salt faz varios saltos de funcao de hash;
    const salt = await bcryptjs.genSalt(12);
    const hash = await bcryptjs.hashSync(user.password, salt);
    //atribuo um novo valor a senha, com a hash para guardar no db;
    user.password = hash;

    return next();

});

//verifica e compara os passwords, o que entra e o que esta no banco;
UserSchema.methods.comparePassword = async function(preHashPassword: string){
    const user = this as UserDocument;
    return bcryptjs.compare(preHashPassword, user.password).catch(
        (error)=>false);
};

//juntar tudo e definir a mesma coisa; definindo um model do tipo userDocument, e criando um schema a partir disso, o "User" eh soh uma referencia;
const User = model<UserDocument>("User", UserSchema);

//const user = User.find(x);

export { User };