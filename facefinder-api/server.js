const express = require('express');

const app = express();
app.use(express.json());

const testDatabase = {
  users: [
    {
      id: '123',
      username: 'John',
      password: 'apple',
      entries: 0,
      joined: new Date()
    },
    {
      id: '234',
      username: 'Sara',
      password: 'banana',
      entries: 0,
      joined: new Date()
    }
  ]
}


app.get('/', (req, res) => {
  return res.send(testDatabase.users);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  testDatabase.users.forEach(user => {
    if (user.id === id) {
      return res.json(user);
    }
  });
  return res.status(400).json('No such user exists');
})

app.post('/signin', (req, res) => {
  if (req.body.username === testDatabase.users[0].username &&
      req.body.password === testDatabase.users[0].password){
        return res.json('success');
      }
  return res.status(400).json('error logging in');
})

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  testDatabase.users.push({
    id: '345',
    username: username,
    password: password,
    entries: 0,
    joined: new Date()
  });
  return res.json(testDatabase.users[testDatabase.users.length-1]);
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  testDatabase.users.forEach(user => {
    if (user.id === id) {
      user.entries++;
      return res.json(user.entries);
    }
  });
  return res.status(400).json('No such user exists');
})

app.listen(3000, () => {
  console.log('app is running on port 3000')
})