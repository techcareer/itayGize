const validator = require('validator');
const IsEmpty = require('../is-empty');

module.exports = function RegisterValidator(data){
console.log(data);
    let error = {}
    data.firstName = !IsEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !IsEmpty(data.lastName) ? data.lastName : '';
    data.id = !IsEmpty(data.id) ? data.id : '';
    data.city = !IsEmpty(data.city) ? data.city : '';
    data.address = !IsEmpty(data.address) ? data.address : '';
    data.bday = !IsEmpty(data.bday) ? data.bday : '';
    data.password = !IsEmpty(data.password) ? data.password : '';


    if(validator.isEmpty(data.firstName)){error.firstName = 'enter firstName'}

    if(validator.isEmpty(data.lastName)){error.lastName = 'enter lastName'}

    if(validator.isEmpty(data.id)){
        error.id = 'enter id'
    }
    else if(!validator.isLength(data.id,{min: 9,max : 9})){
        error.id = 'id must contain 9 digits'
    }

    return {
        error,
        isVaild : IsEmpty(error)
    }

    
}