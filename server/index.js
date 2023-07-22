const connectToMongo = require("./Connection/Conn");
const express = require("express");
var cors = require("cors");
connectToMongo();

const app = express();
const port = 6000;
app.use(cors());
app.use(express.json());

app.use("/api", require("./Routes/Routes"));

app.listen(port, () => {
  console.log(`TodoApp listening on port ${port}`);
});
