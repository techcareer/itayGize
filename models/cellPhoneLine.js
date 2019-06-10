const mongoose = require('mongoose');

const LineSchema = mongoose.Schema({
    lineName : {
        type:String ,
        require : true
    },
    minCall : {
        type:Number ,
        require : true
    },
    internetMin :{
        type:Number ,
        require : true
    },
    OutMin : {
        type:Number ,
        require : true
    },
    date : {
        type : Date,
        default : Date.now,
        require : false
    },
   
    isActive : {
        type : Boolean,
        default : true,
        require : false
    }
})

const LineTable = mongoose.model('lines',LineSchema);


addLine = (data)=>{
   return new Promise((resolve , reject)=>{
        LineTable.findOne({lineName : data.lineName})
        .then((line)=>{
            if(line){
                return resolve(false)
            }
            else{
                let obj = LineTable({
                    lineName : data.lineName,
                    minCall : data.minCall,
                    internetMin : data.internetMin,
                    OutMin : data.OutMin,
                })
                obj.save();
                return resolve(true);
            }
        })
   })
}

getLine = () =>{
    return new Promise((resolve,reject)=>{
        LineTable.find()
        .then((lines)=>{
            return resolve(lines);
        })
    })
  
}

isLineExist = (data)=>{
    return new Promise((resolve,reject)=>{
        LineTable.findOne({_id : data})
        .then((line)=>{
            if(line){
                return resolve(line)
            }
            else return resolve(line)
            
        })
    })
}

module.exports = {
    addLine : addLine,
    getLine : getLine,
    isLineExist : isLineExist
}