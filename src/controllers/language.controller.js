import {getConnection} from "./../database/database";

const getpersona =async(req,res) => {
    try {
        const connection= await getConnection();
        const result = await connection.query("SELECT persona_id, persona_nombre FROM persona");
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};




const ReadingPersona =async(req,res) => {
    try {
        console.log(req.params);
        const {persona_id} =  req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT persona_id,persona_nombre FROM persona WHERE persona_id = ?",persona_id);
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};


const addPersona = async(req, res) => {
try{
    const {persona_nombre}=req.body; 
    if (persona_nombre==undefined){
        res.status(400).json({message:"Bas Request. Por Favor LLevar Los Campos"});
    }
    const nombre={persona_nombre};
    const connection= await getConnection();
    const result = await connection.query("INSERT INTO persona SET ?", nombre);
     
    res.json({message:"Persona Registrada"});
}
catch(error){
    res.status(500);
    res.send(error.message);
}
} ;

const UpdatePersona =async(req,res) => {
    try {
        console.log(req.params);
        const {persona_id} =  req.params;
        const {persona_nombre}=req.body; 
        if (persona_id == undefined || persona_nombre==undefined ){
            res.status(400).json({message:"Bas Request. Por Favor LLevar Los Campos"});
        }
        const nombre={persona_nombre};
        const connection= await getConnection();
        const result = await connection.query("UPDATE persona SET ? WHERE persona_id  = ?",[nombre, persona_id]);
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};

const DeletePersona =async(req,res) => {
    try {
        console.log(req.params);
        const {persona_id} =  req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE  FROM persona WHERE persona_id = ?",persona_id);
        console.log(result);
        res.json(result);
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }

};


export const  methods = {
getpersona,
addPersona,
ReadingPersona,
DeletePersona,
UpdatePersona
};