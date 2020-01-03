const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

 const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'Desmond',
      password : '',
      database : 'smart-brain'
    }
  });

  console.log(db.select('*').from('users').then(data => console.log(data)));

const database = {
    users: [
        {
            id: '123',
            name: 'Desmond',
            password: 'root',
            email: 'desmond@codestackers.io',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Desmond2',
            password: 'root2',
            email: 'info@codestackers.io',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'desmond@codestackers.io'
        }
    ]
}

app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
