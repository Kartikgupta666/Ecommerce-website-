const { Schema, default: mongoose } = require('mongoose')

const Wishlist_Schema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item_id: {
        type: String,
        require: true
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

module.exports = mongoose.model("Wishlist", Wishlist_Schema)