// @deno-type="npm:@type/express@4"
import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "npm:express";
import router from "./router/auth/controller.ts";

const app = express();
const port = Deno.env.get("PORT") || 8000;

app.use("/auth", router);

const errorHandler: ErrorRequestHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.send("CNS backend is available.");
});

app.listen(port, () => console.log(`Listening on ${port} ...`));
