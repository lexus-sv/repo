var createError = require('http-errors');
var express = require('express');
var cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var path = require("path");

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client/build'));

app.use(cors());
app.use('/api', require("./routes/newbike.routes"));
app.use('/api', require("./routes/available.router"));
app.use('/api', require("./routes/rent.router"));
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

async function start(){
  try{
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ivan:newpass@cluster0.rl5yg.mongodb.net/BikeRent?retryWrites=true&w=majority",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(port, (req, res) =>{
      console.log(`Server has been started on port: ${port}`);
    });
  }catch(e){
    console.log("Server error");
    process.exit(1);
  }
}

start();
