const { Schema, default: mongoose } = require('mongoose')

const Cart_Schema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
   
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    searchQuery: [String],
    description: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model("Cart", Cart_Schema)