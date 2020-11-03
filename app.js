const express = require("express");
var exphbs = require("express-handlebars");
const app = express();
const port = 3000;
const hostName = "127.0.0.1";
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/generateDate").generateDate;
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/nodeblog_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(fileUpload());

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "testotestotesto",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(express.static("public"));

//Links Middleware
app.use((req,res,next)=>{
  const {userId} = req.session;
  if(userId){
    res.locals = {
      displayLink: true
    }
  }else{
    res.locals = {
      displayLink: false
    }
  }
  next()
})

//Flash Message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});



app.engine("handlebars", exphbs({ helpers: { generateDate } }));
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require("./routes/admin/index")

app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/admin", admin);
app.listen(port, hostName, () =>
  console.log(`Server is operating: http://${hostName}:${port}`)
);
