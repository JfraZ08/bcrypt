import  { Router } from "express";
import { User } from "..";
import bcrypt, { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken'

const saltRounds = 10;

export const userRouter = Router(); // Route user 

userRouter.post('/local/', async (req, res) => { // route pour post http://localhost:1317/api/auth/local 
    const findUser = await User.findOne( { where : { email : req.body.identifier }}) // recherche d'un user avec l'email
    if(!findUser){ // si pas trouver
        res.status(400).json({ error: "le login ne correspond à aucun utilisateur"})
    }
    else {
        const isSamePassword = await compare(req.body.password, findUser.dataValues.password) //même mdp compare avec un user  
        if(isSamePassword){ // si c le même
            const token = jwt.sign({userId: findUser.dataValues.id}, 'exact') // signe via l'id du user et le token en dessous 
            res.json({
                findUser,
                token
            });
        }
        else {
            res.status(400).json({ error: "le mot de passe n'est pas le bon"})
        }
    }
})

userRouter.post('/local/register', async (req, res) => {
    console.log('res', req.body)
    const findUser = await User.findOne( { where : { email : req.body.identifier }})
    if(findUser){// si il existe
        res.status(400).json('Utilisateur existe déjà');
    }else {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        console.log('hash', hash)
        const newUser = await User.create({ // création nouveau user         
            email : req.body.identifier,
            password : hash
        })  
        res.json(newUser); //alors affiche
    }
})




