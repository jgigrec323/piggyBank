import express from "express";
import { register } from "../controllers/parentControllers";

const router = express.Router();

router.post("/register", register);
router.post("/login", () => {});

module.exports = router;
