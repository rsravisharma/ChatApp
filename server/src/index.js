const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

// const mongoose = require('mongoose');
// const dbUrl = 'mongodb://rootUser:3ZSUF2LswX7JXu2k@cluster0.6mhno.mongodb.net/chatApp?retryWrites=true&w=majority'


const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const MesModel = require("../models/messages");

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

io.on('connection', (socket) => {
    console.log('user connected');

    // For broadcasting
    // socket.on('message', msg =>{
    //   console.log(msg);
    //   socket.broadcast.emit('new-message', msg);
    // })

    socket.on('message', data => {
      io.emit('new message', {user:data.user, message:data.message});
    })
});


// app.use(cors());
// const dbName = 'chatApp';
// let db;

const db = require("../models");
const dbConfig = require("./db.config.js");
const Role = db.role;
const User = db.user;


// io.of("/login").on("connection", (socket) => {
//   socket.broadcast.emit('users', User.find({}));
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.json({message: "Welcome to the chat Application Server."});  
});

app.get("/messages", async (req, res) => {
  const getMessage = await MesModel.find({});

  try {
    res.send(getMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/message", async (req, res) => {
  const postMessage = new MesModel(req.body);

  try {
    await postMessage.save();
    res.send(postMessage);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/message/:id", async (req, res) => {
  try {
    await MesModel.findByIdAndUpdate(req.params.id, req.body);
    await MesModel.save();
    res.send(postMessage);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/message/:id", async (req, res) => {
  try {
    const DelMessage = await MesModel.findByIdAndDelete(req.params.id);

    if (!DelMessage) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});


// This is for Mongo Atlas
// mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
// 	if (err) return console.log(err);
// 	console.log(`Connected MongoDB: ${dbUrl}`);

// });

// This is for local mongo db server
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// routes
require('../routes/auth.routes')(app);
require('../routes/user.routes')(app);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "friend"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'friend' to roles collection");
      });
    }
  });
}

