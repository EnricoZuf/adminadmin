const express = require("express");
const router = require("./routes");
const databaseConnect = require("./database");


const app = express();
app.use(express.json());

const port = 3333;

databaseConnect().then(() => {
    app.use('/api', router);

    app.listen(port, () => {
        console.log(`on-line. port ${port}`)
    })
});
