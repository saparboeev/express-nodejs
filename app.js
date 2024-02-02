const express = require("express");
const app = express();
const routes = require("./routes/books");
const routesMain = require("./routes/main");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(routesMain);

app.listen(3000);
