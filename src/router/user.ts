import  { Router } from "express";
import { User } from "..";
import bcrypt, { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken'

const saltRounds = 10;

export const userRouter = Router(); // Route user 

userRouter.post('/local/', async (req, res) => {
    const findUser = await User.findOne( { where : { email : req.body.identifier }})
    if(!findUser){
        res.status(400).json({ error: "le login ne correspond à aucun utilisateur"})
    }
    else {
        const isSamePassword = await compare(req.body.password, findUser.dataValues.password) 
        if(isSamePassword){
            const token = jwt.sign({tata: 2}, 'fidjskjfdslfjdslk')
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


