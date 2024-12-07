import express, { Request, Response } from "express";
import loginService from "./service.ts";
import cors from "cors"
const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Auth router is availble");
});

router.get("/login", (req: Request, res: Response) => {
  res.status(200).send("Login router is availble");
  // try {
  //   res
  //     .status(201)
  //     .send(loginService({ mail: "sdfa", hashPassword: "sfajgla" }));
  // } catch (error) {}
});

type loginError = {msg:string};
router.post("/login", (req:Request, res: Response) => {
  try {
    const {email, password} = req.body;
    console.log("req.body:", email, password);
    const success = loginService({mail:email, hashPassword:password});
    console.log("success",success);
    if (true) {
      const msg = new Error("Fuck");
      throw msg;
    }
   
    res.status(200).json({msg: req.body})
  } catch (error) { 
    console.error(error.msg);
    return ;
  };
  
})


export default router;
