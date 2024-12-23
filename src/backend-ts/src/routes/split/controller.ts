import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("spilt router is availble");
});

router.post("/", (req, res) => {
  
})

export default router;