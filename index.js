var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require("helmet");
var path = require('path');
var router = require("./routes/index.route");
var {notFoundHandler, errorLogger} = require("./middleware/errors");
var methodOverride = require('method-override')
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(session({ cookie: { maxAge: 60000 }}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", "https://cdn.jsdelivr.net/"],
    },
  },
}));

async function run() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/forgot_password`);
    console.log("Connected to Database Successfully")
  } catch (error) {
    console.log(`${error.message}`)
  }
}
run();

app.use(router);
app.use(notFoundHandler);
app.use(errorLogger);

app.listen(process.env.PORT,() => {
  console.log(`App running on localhost:${process.env.PORT}`)
})


