import { Router, request, response } from "express";
import { methods as languageController }  from "./../controllers/language.controller";
const router = Router();

router.get("/",languageController.getpersona);
router.get("/:persona_id",languageController.ReadingPersona);
router.delete("/:persona_id",languageController.DeletePersona);
router.post("/",languageController.addPersona);
router.put("/:persona_id",languageController.UpdatePersona);


export default router;