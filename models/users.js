const mongoose = require('mongoose');
const lineModel = require('./cellPhoneLine');

const UserSchema = mongoose.Schema({
    firstName : {
        type:String ,
        require : true
    },
    lastName : {
        type:String ,
        require : true
    },
    bdate : {
        type:Date ,
        require : true
    },
    address : {
        type:String ,
        require : true
    },
    city : {
        type:String ,
        require : true
    },
    id : {
        type:String ,
        require : true
    },
    password : {
        type:String ,
        require : true
    },
    isBusiness : {
        type :Boolean,
        default :false
    },
    line : {
        type : [mongoose.Schema.Types.ObjectId],
        ref: 'lines'
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

const userTable = mongoose.model('users',UserSchema);


AddUser = (user)=>{
   let p = new Promise((resolve , reject)=>{
    let newuser = new userTable({
        firstName : user.firstName,
        lastName : user.lastName,
        bdate : user.bdate,
        address : user.address,
        city : user.city,
        id : user.id,
        password : user.password
    })


    userTable.findOne({id : newuser.id})
    .then((userResult)=>{
        console.log('userresult',userResult)
        if(userResult){
            return resolve(false)
        }
        else{
            newuser.save().then((s)=>{
                if(s){
                    return  resolve(true)
                }
                return  resolve(false)
            });
        }
    })
   })

   return p;
}

Login = (user)=>{
    return new Promise((resolve,reject)=>{
        let obj = {
            isSuceess : false,
            userId : ''
        }
        userTable.findOne({password : user.password ,id: user.id })
        .then((result)=>{
            if(result){
                obj.isSuceess  = true,
                obj.userId = result._id
               resolve(obj) 
            }
            resolve(obj)
        })
    })
}

var cookie;

setCookie = (data,req,res)=>{
    if(!cookie){
        cookie = req.session;
        cookie.user= data;
    }
    else{
        cookie.user = data
    }
}

getCookie = () =>{
    return cookie;
}



AddLineToUser = (data)=>{
   return new Promise((resolve,reject)=>{ 
       if(!cookie) return resolve(false)
       
    lineModel.isLineExist(data)
    .then((line)=>{
        userTable.findOne({_id : cookie.user })
        .then((user)=>{
            if(user){
                console.log(user)
                if((user.isBusiness && user.line.length < 3) || (!user.isBusiness && user.line.length < 1)){
                    user.line.push(line._id)
                    user.save()
                    return resolve(true)
                }
                else{
                    return resolve(false)
                }
            }
            else return resolve(false)
        })
    })
   })
}

module.exports = {
    AddUser : AddUser,
    Login: Login,
    setCookie : setCookie,
    getCookie : getCookie,
    AddLineToUser : AddLineToUser
}