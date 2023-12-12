import { Router } from "express";
import { Actor } from "..";

export const actorsRouter = Router();

actorsRouter.get('/', (req, res) => {
    res.send('list of actors');
});
  
actorsRouter.post('/', async (req, res) =>{
    const newActor = await Actor.create(req.body.data)
    res.json(newActor); 
});

actorsRouter.get('/:id', (req, res) => {
    req.params.id;
});

actorsRouter.put('/:id', async (req, res) => {
    req.params.id;
    const actorToModify = await Actor.findOne( {where: { id: req.params.id }}) // déclare acteur à modifier
    if(actorToModify){ // s'il exsite
        const updatedActor = await actorToModify.update({name: 'blabla'}) // alors je le modifie
        res.json(updatedActor);
    }
    else {
        res.status(400).json({ error: `actor to modify doesn't exist`})
    } // Sinon envoie erreur
});

actorsRouter.delete('/:id', (req, res) => {
    req.params.id;
})