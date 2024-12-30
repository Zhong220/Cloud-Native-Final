import express, { Request, Response } from "express";
import {loginService, mysqlAddAccount, registerService, verifyJWTToken} from "./service.ts";
import cors from "cors"
import redisClient from "../../utils/redis";
import { registerModel } from "./model.js";


const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Auth router is availble");
});

router.get("/login", (req: Request, res: Response) => {
  res.status(200).send("Login router is availblemm");
});


router.post("/login", async (req: Request, res: Response) => {

  try {
    const { email, password } = req.body;
    console.log("req.body:", email, password);

    const successTok = await loginService({ mail: email, hashPassword: password });
    console.log("success", successTok);
    res.status(200).send({ msg: "Login Success!", jwttok: successTok.jwtToken });
  } catch (error) {
    console.error("Error during login:", error);

    res.status(401).send({ msg: "Wrong mail or password" });
  }
});

router.post("/vertifyToken", async (req, res) => {
    try {
      const { JWTtoken } = req.body;
      const decoded = verifyJWTToken(JWTtoken);
      console.log(decoded);
      res.status(200).send(decoded);
    }
    catch (error) {
      console.error("/vertifyToken Error: ", error);
      res.status(401);
    }
});


router.post("/register", async (req:Request, res: Response) => {
  try {
    const {name, email, password} = req.body;
    await registerService({name:name, mail:email, hashPassword:password});
    res.status(200).send({msg: "Success Create Account!"}) 
  } catch (err) {
    console.error("Email has Existed:", err);
    res.status(401).json({msg: "Email has Existed:"});
  };
})

router.get("/registerVertifyMail", async (req:Request, res:Response) => {
  const token = req.query;
  console.log("TOK", token.token);
  const userData = await redisClient.get(`verify:${token.token}`);
  console.log("userDaata", userData);
  if (!userData) {
    return res.status(400).send("Invalid or expired token.");
  }
  const { email, name, password } = JSON.parse(userData);
  console.log("User verified:", email);
  await redisClient.del(`verify:${token}`);
  const accountData:registerModel = {
    name:name,
    mail:email,
    hashPassword:password
  }
  mysqlAddAccount(accountData);
  res.status(200).send("Email successfully verified!");

})



export default router;
