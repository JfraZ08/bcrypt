import express, { Router } from 'express';
import { actorsRouter } from './router/actors';
import { movieRouter } from './router/movies';
import { Sequelize, DataTypes } from 'sequelize';
import { userRouter } from './router/user';
//import { authRouteur } from './router/auth';
 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Movie = sequelize.define('movie', {
  title : DataTypes.STRING,
  description : DataTypes.STRING,
  releaseDate : DataTypes.DATE,
  director : DataTypes.STRING//,
  //actors : DataTypes.CHAR
}, {
  timestamps: false
})
export const User = sequelize.define('user', {
  email : DataTypes.STRING,
  password : DataTypes.STRING
}, {
  timestamps: false
})

export const Actor = sequelize.define('actor', {
  Name: DataTypes.STRING,
  LastName: DataTypes.STRING,
}, {
  timestamps: false
})

sequelize.sync() // recharge la base actuelle
//sequelize.sync({ force:true }) // remts la base à zéro et la recharge 

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export const apiRouter = Router();

apiRouter.use('/movies', movieRouter)
apiRouter.use('/actors', actorsRouter)
apiRouter.use('/auth', userRouter)

app.use('/api', apiRouter)

app.listen(1337, () => {
  console.log('Server is listening on port 1337');
});

