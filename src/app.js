const express = require("express");
const apiRouter = require("./apiRoutes");
const viewsRouter = require("./viewsRoutes");
const databaseConnect = require("./database");
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const port = 3333;

databaseConnect().then(() => {
    app.use('/api', apiRouter);
    app.use('/', viewsRouter);

    app.listen(port, () => {
        console.log(`on-line. port ${port}`)
    })
});
