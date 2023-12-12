import  { Router } from "express";
import { User } from "..";
import bcrypt, { hash } from 'bcrypt';

const saltRounds = 10;


export const userRouter = Router(); // Route user 

userRouter.post('/local/register',async (req, res) => {
    const hash = bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({ // création nouveau user 
        
        identifier : req.body.identifier,
        password : hash
    })
    res.json(newUser);
})

userRouter.post('/auth/local', async (req, res) => {
    const findUser = await User.findOne( { where : { identifier : req.body.identifier, password : hash }})
    if(findUser){// si il existe
        res.json(findUser); //alors affiche
    }else {
        res.status(400).json('bla');
    }
})
