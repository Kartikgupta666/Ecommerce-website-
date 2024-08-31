const { Schema, default: mongoose } = require('mongoose')

const Item_Schema = new Schema({
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

module.exports = mongoose.model("Item", Item_Schema)