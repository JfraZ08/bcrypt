import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    // création middleware
    if(req.headers?.authorization){ // si il ne connait les autorisations 
        const token = req.headers.authorization.split(' ')[1] // récupération info token via headers
        console.log('token', token); // affichage du token dans la console 

        try {
            const decoded = jwt.verify(token, 'exact') // vérification du token 
            next(); // passe à la suite 
        }
        catch(e){
            res.status(401).json({ // envoie erreur 401 message
                error: "erreur token non vérifié"
            })
        }
    }
    else {
        res.status(401).json({ // envoie erreur 401 message
            error: "non connecté"
        })
    }

}
