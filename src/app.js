const express = require("express");
const router = require("./routes");

const app = express();

const port = 3333;

app.use('/api', router);

app.listen(port, () => {
    console.log(`on-line. port ${port}`)
})