import express, { Router } from 'express';
import { actorsRouter } from './router/actors';
import { movieRouter } from './router/movies';
import { Sequelize, DataTypes } from 'sequelize';
import { LOADIPHLPAPI } from 'dns';
import { log } from 'console';
//import { authRouteur } from './router/auth';
 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

export const Movie = sequelize.define('movie', {
  //name: DataTypes.STRING
  title : DataTypes.STRING,
  description : DataTypes.STRING,
  releaseDate : DataTypes.DATE,
  director : DataTypes.STRING//,
  //actors : DataTypes.CHAR
}, {
  timestamps: false
})

export const Actor = sequelize.define('actor', {
  Name: DataTypes.STRING,
  LastName: DataTypes.STRING,
}, {
  timestamps: false
})

sequelize.sync()
// sequelize.sync({ force:true })

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export const apiRouter = Router();

apiRouter.use('/movies', movieRouter)
apiRouter.use('/actors', actorsRouter)

app.use('/api', apiRouter)

app.listen(1337, () => {
  console.log('Server is listening on port 1337');
});