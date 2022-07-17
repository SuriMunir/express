const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

let users = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({
    statusCode: 200,
    data: users,
  });
});

app.get('/:id', (req, res) => {
  if (req.params.id < users.length) {
    res.send({
      statusCode: 200,
      data: users[req.params.id],
    });
  } else {
    res.send({
      statusCode: 200,
      message: 'Selected ID does not exist',
    });
  }
});

app.post('/add-users', (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    users.push(req.body[i]);
  }

  res.send({
    statusCode: 201,
    message: 'Data recieved',
    data: users,
  });
});

app.put('/edit-user/:id', (req, res) => {
  if (req.params.id < users.length) {
    users.splice(req.params.id, 1, req.body);
    res.send({
      statusCode: 200,
      message: 'Data modified successfully',
      data: users,
    });
  } else {
    res.send({
      statusCode: 200,
      message: 'Selected ID does not exist',
    });
  }
});

app.delete('/delete-user/:id', (req, res) => {
  if (req.params.id < users.length) {
    users.splice(req.params.id, 1);
    res.send({
      statusCode: 200,
      message: 'Data deleted successfully',
      data: users,
    });
  } else {
    res.send({
      statusCode: 200,
      message: 'Selected ID does not exist',
    });
  }
});

app.listen(port, () => {
  console.log(`App is listening to port: ${port}`);
});
