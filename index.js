const express = require("express");
const app = express();
const port = 3000;

// import routes
const index = require("./routes/index");

// set routes
app.use("/", index);

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on http://localhost:${port}/`)
});

module.exports = app;