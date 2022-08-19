const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { create } = require("express-handlebars");
const uri = "mongodb+srv://shohrux:m9FvITRTn5OMx0wQ@cluster0.lgxuji3.mongodb.net/e-commerce-main";
const path = require("path");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const store = new MongoDBStore({
  uri,
  collection: 'mySessions',
  expires: 1000 * 60 * 50 // sessiya shuncha vaqtda ochadi
})

// require routes
const homeRouter = require("./routes/home");
const categoriesRouter = require("./routes/categories");
const adminsRouter = require("./routes/admins");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// middlwares
const auth = require('./middleware/admin')
const error = require('./middleware/error')

const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: "./views/layouts",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

async function db() {
  try {
    await mongoose.connect(uri, (err) => {
      if (err) throw new Error(err);
      console.log("MongoDB connected", uri);
    });
  } catch (error) {
    console.error(error);
  }
}

db();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_KEY || 'SECRET',
    resave: false,
    saveUninitialized: false,
    store,

  })
);
app.use(flash())

app.use("/auth", authRouter);
//midleware
app.use(auth)

//routing
app.use("/", homeRouter);
app.use("/categories", categoriesRouter);
app.use("/admins", adminsRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use(error)


const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

try {
  app.listen(port, () => {
    console.log("Server working on port", port);
  });
} catch (error) {
  console.error(error);
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
