exports.testCon = (req, res)=>{
    req.getConnection((err, connection)=>{
        if(err) { console.log("Connection Error") 
        } else {console.log("Connected successfully") }   
    });
};

exports.createTableStations = (req, res)=>{
    let query = 'CREATE TABLE tbStationsResults(id int AUTO_INCREMENT, station VARCHAR(255), auditor VARCHAR(255), result VARCHAR(255), remarks VARCHAR(255), status VARCHAR(255), PRIMARY KEY(id))';

    req.getConnection((err,connection)=>{
        if(err) throw err;
        connection.query(query,(err, result)=>{
            if(err) throw err;
            console.log(result);
        });
    });
};

exports.list = (req, res)=>{
    let query = 'SELECT * FROM tbStationsResults';

    req.getConnection((err,connection)=>{
        connection.query(query,(err,rows)=>
        {             
            if(err) console.log("Error Selecting : %s ",err );
            console.table(rows);
            res.send(rows);
           });
           if (err)
                console.log("Connection Error : ", err);
    });
};
  
exports.edit = (req, res)=>{   
    var id = req.params.id;   
    req.getConnection((err,connection)=>{ 
        connection.query('SELECT * FROM survey WHERE id = ?',[id],(err,rows)=>
        {           
            if(err) console.log("Error Selecting : %s ",err );             
        });      
    }); 
};
  
/*Save the survey*/
exports.save = (req,res)=>{
let query = 'INSERT INTO tbStationsResults SET ?'
let input = JSON.parse(JSON.stringify(req.body));

    req.getConnection((err, connection)=>{  

    let data = {            
        station : input.station,
        auditor : input.auditor,
        result  : input.result,
        remarks : input.remarks,
        status  : input.status   
    };        
        connection.query(query, data, (err, rows)=>
        {
            if (err) console.log("Error inserting : %s ",err );
            res.send(input);
            console.table(input);         
        });      
    });
};
  
exports.save_edit = (req,res)=>{
    let query = "UPDATE tbStationsResults SET ? WHERE id = ? "
    let input = JSON.parse(JSON.stringify(req.body));
    let id = req.params.id;
    
    req.getConnection((err, connection)=> {
        
    let data = {
            
        station : input.station,
        auditor : input.auditor,
        result  : input.result,
        remarks : input.remarks,
        status  : input.status    
    };     
        connection.query(query, [data, id], (err, rows)=>
        {
            if (err) console.log("Error Updating : %s ",err );
            res.send(rows);              
        });
    });
};
  
  
exports.delete_survey = (req,res)=>{
        
    let id = req.params.id;
    let query = "DELETE FROM tbStationsResults WHERE id = ?"
    req.getConnection((err, connection)=>{
        
        connection.query(query, id, (err, rows)=>
        {           
            if(err) console.log("Error deleting : %s ",err );
            console.log("Row deleted");
            res.send(rows); 
        });
        
    });
};
