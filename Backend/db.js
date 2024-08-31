const mongoose = require('mongoose')

const url = `mongodb+srv://kartikgangil:TestEcomweb@testcluster.eb6bhdj.mongodb.net/`

function connectToDatabase(){
    mongoose.connect(url)
    .then(()=>{
        console.log("database connected successfully")
    })
    .catch(e =>{
        console.log(e)
    })
}


module.exports = connectToDatabase