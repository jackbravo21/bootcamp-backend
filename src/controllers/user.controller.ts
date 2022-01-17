import { Request, Response } from 'express'; 
import { User } from '../models/user.model';

interface UserResult {
    _id: string;
    name: string;
    email?: string;
    password?: string;
}

//rota de teste (se descomentar, adicionar "all" no export) e habilitar nas rotas;

async function all(req: Request, res: Response)
{
    const user = await User.find();
                
    const allUsers = user.map(
         usuarios => '_id: ' + `${usuarios._id}` + ', name: ' + `${usuarios.name}` + ', email: ' + `${usuarios.email}` + ', createdAt: ' + `${usuarios.createdAt}` + ', updatedAt: ' + `${usuarios.updatedAt}`
         );

    console.log( allUsers );

    return res.json({allUsers});

}


async function view(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({
            message: 'Usuário não encontrado!'
        });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado'
        });
    }

    return res.status(200).json({
        user: {
            id: user._id,
            name: user.name
        }
    });
}


async function create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(403).json({
            message: 'Usuário já cadastrado'
        });
    }

    const user = new User({ name, email, password });

    user.save((error: any, result: any): void => {
        if (error) {
            console.log('Error: ', typeof error);
            res.json(error);
        }

        res.status(201).json(
            {
                id: result._id,
                name: result.name
            }
        );
    });
}


async function destroy(req: Request, res: Response) {
    const { id } = req.params;

    const idExists = await User.findById(id);

    if (!idExists) {
        return res.status(404).json({
            message: 'Usuário não encontrado!'
        });
    }

    const deleteUser = await User.findByIdAndDelete(id);
    
    if (!deleteUser) {
        res.status(500).json({
            message: 'Erro: Não foi possível deletar o usuário!'
        });
    }

    return res.status(200).json({
        message: 'Usuário apagado com sucesso!'
    });
}


export { all, view, create, destroy };