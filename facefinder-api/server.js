const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1q2w3e',
    database : 'facefinder'
  }
});

const app = express();
app.use(
  express.json(), 
  cors()
);

app.get('/', (req, res) => {
  return res.send('success');
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length){
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'))

})

app.post('/signin', (req, res) => {
  db.select('username', 'hash').from('login')
    .where('username', '=', req.body.username)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        db.select('*').from('users')
          .where('username', '=', req.body.username)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials');
      }
    })
})

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      username: username
    })
    .into('login')
    .returning('username')
    .then(loginUsername => {
      return trx('users')
      .returning('*')
      .insert({
        username: loginUsername[0],
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('Unable to register'))
  
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {res.json(entries[0])})
    .catch(err => res.status(400).json('unable to get entries'));
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})