import express from "express";
import routes from "./routes/index";

const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.status(200).send("CNS ts express backend is available.");
});

// assign url
routes.forEach((e) => {
  app.use(e.addr, e.router);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

export default app;
