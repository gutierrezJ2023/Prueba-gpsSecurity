import {getConnection} from "./../database/database";

const getTarea =async(req,res) => {
    try {
        const connection= await getConnection();
        const result = await connection.query("SELECT `tarea_id`,`tarea_descrip`,`persona`.`persona_nombre`,`tarea_fecha`,`tarea_valor`,`tarea_tiempoDuracion` FROM `tarea` INNER JOIN `persona` on `tarea`.`tarea_persondaId` = `persona`.`persona_id`");
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};

const ConsulTareaPersona =async(req,res) => {
    try {
        console.log(req.params);
        const {name} =  req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT `persona`.`persona_nombre`, tarea.tarea_id,tarea_tiempoDuracion, COUNT(`tarea`.`tarea_PersondaId`) as CantidadTareasAsignadas,"+
       " SEC_TO_TIME(SUM(TIME_TO_SEC(`tarea`.`tarea_tiempoDuracion`))) AS TotalHorasDuracion,tarea_valor,"+
        "SUM(`tarea`.`tarea_valor`) as TotalValorRecaudado,SEC_TO_TIME(SUM(TIME_TO_SEC(`tiempoinvertido`.`invertido_tiempo`))) AS TotalHorasInvertidas "+
        "FROM `tarea` "+
       " INNER JOIN `persona` on `tarea`.`tarea_PersondaId` = `persona`.`persona_id` "+
        " INNER JOIN `tiempoinvertido` on `tarea`.`tarea_id` = `tiempoinvertido`.`invertido_tareaId` "+
       " WHERE `persona`.`persona_nombre` = ? GROUP BY `tarea`.`tarea_id` ,persona_id",name);
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};

const ConsulFP =async(req,res) => {
    try {
        console.log(req.params);
        const {fecha,name} =  req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT `tarea_id`,`persona`.persona_nombre,`tarea_Descrip`,`tarea_PersondaId`,`tarea_fecha`,`tarea_valor`,`tarea_tiempoDuracion` FROM `tarea` "+
        " INNER JOIN `persona` on `tarea`.`tarea_PersondaId` = `persona`.`persona_id` WHERE `tarea_fecha` = '"+fecha+"' and `persona`.persona_nombre = '"+name+"'");
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};

const AddTarea = async(req, res) => {
    try {
    
   
        const { tarea_Descrip, tarea_PersondaId, tarea_fecha, tarea_valor, tarea_tiempoDuracion } = req.body;
        if (tarea_Descrip == undefined || tarea_PersondaId == undefined || tarea_fecha == undefined || tarea_tiempoDuracion == undefined || tarea_valor == undefined) {
              return res.status(400).json({ message: "Bad Request. Por favor llenar todos los campos" });
            }  
        const asig = { tarea_Descrip, tarea_PersondaId, tarea_fecha, tarea_valor, tarea_tiempoDuracion }; 
        const connection = await getConnection(); 
        const result = await connection.query("INSERT INTO `tarea` SET ?", asig);
            
           
        return res.json({ message: "Tarea Registrada" });{
          } 
         
        } catch (error) {
            
           
        return res.status(500).send(error.message);
          }
        
    } ;

    const UpdateTarea =async(req,res) => {
        try {
            console.log(req.params);
            const {tarea_id} =  req.params;
            const {tarea_Descrip,tarea_PersondaId,tarea_fecha,tarea_valor,tarea_tiempoDuracion}=req.body; 
            if (tarea_Descrip == undefined || tarea_PersondaId == undefined || tarea_fecha == undefined 
                || tarea_valor == undefined || tarea_tiempoDuracion == undefined){
                res.status(400).json({message:"Bas Request. Por Favor LLevar Los Campos"});
            }
            const registro={tarea_Descrip,tarea_PersondaId,tarea_fecha,tarea_valor,tarea_tiempoDuracion};
            const connection= await getConnection();
            const result = await connection.query("UPDATE tarea SET ? WHERE tarea_id  = ?",[registro, tarea_id]);
            console.log(result);
            res.json(result);
        }
        catch(error){
            res.status(500);
            res.send(error.message);
        }
    
    };

    const DeleteTarea =async(req,res) => {
        try {
            console.log(req.params);
            const {tarea_id} =  req.params;
            const connection= await getConnection();
            const result = await connection.query("DELETE  FROM tarea WHERE tarea_id = ?",tarea_id);
            console.log(result);
            res.json(result);
        }
        catch(error){
            res.status(500);
            res.send(error.message);
        }
    
    };






export const  methods = {
    getTarea,
    AddTarea,
    UpdateTarea,
    ConsulTareaPersona,
    ConsulFP,
    DeleteTarea
    };