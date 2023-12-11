import { Router } from "express";

const authRouter = Router()

authRouter.post('/auth/local', (req, res) => {
    res.send('local API')
});

authRouter.post('/', (req, res) => {
    res.send('Post API')
});

authRouter.get('/:id', (req, res) => { 

})