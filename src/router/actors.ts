import { Router } from "express";

export const actorsRouter = Router();

actorsRouter.get('/', (req, res) => {
    res.send('list of actors');
});
  
actorsRouter.post('/', (req, res) => {
    res.send('actors post'); 
});

actorsRouter.get('/:id', (req, res) => {
    req.params.id;
});

actorsRouter.put('/:id', (req, res) => {
    req.params.id;
});

actorsRouter.delete('/:id', (req, res) => {
    req.params.id;
})