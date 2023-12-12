import { Router } from "express";
import { Movie } from "..";

export const movieRouter = Router();



movieRouter.get('/', (req, res) => {
    //const allFilms = Movie.findAll()
  
});

movieRouter.post('/', async (req, res) => {
  console.log(req.body);
  
  const newMovie = await Movie.create({
   
    title : req.body.data.title,
    description : req.body.data.description,
    releaseDate : req.body.data.releaseDate,
    director : req.body.data.director
  })
  
  res.json(newMovie);
});
movieRouter.get('/:id', (req, res) => {
  req.params.id;
  res.send('id movies');
});

/*movieRouter.put('/:id', async (req, res) => {
    req.params.id;
    const MovieToModify = await Movie.findOne( {where: { id: req.params.id }}) // déclare acteur à modifier
    if(MovieToModify){ // s'il exsite
        const updatedMovie = await MovieToModify.update({name: 'blabla'}) // alors je le modifie
        res.json(updatedMovie);
    }
    else {
        res.status(400).json({ error: `movie to modify doesn't exist`})
    } // Sinon envoie erreur
});
*/
movieRouter.delete('/:id', (req, res) => {
    req.params.id;
})