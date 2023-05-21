import { Router, request, response } from "express";
import { methods as tareasController }  from "./../controllers/tareas.controller";
const router = Router();

router.get("/",tareasController.getTarea);
router.get("/:name",tareasController.ConsulTareaPersona);
router.get("/:fecha/:name",tareasController.ConsulFP);
router.post("/",tareasController.AddTarea);
router.put("/:tarea_id",tareasController.UpdateTarea);
router.delete("/:tarea_id",tareasController.DeleteTarea);
export default router;