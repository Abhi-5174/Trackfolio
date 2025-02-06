import express from "express";
import { connect } from "mongoose";

let app = express();

app.listen(5000, async () => {
  let connection = await connect("mongodb://localhost:27017");
  console.log("the server has started on port 5000");
});
