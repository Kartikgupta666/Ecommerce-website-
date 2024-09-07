const express = require('express')
const connectToDatabase = require('./db')
const app = express();
const port = 9000;
const User = require('./Schema/User_schema')
const Cart = require('./Schema/Cart_Schema')
const Wishlist = require('./Schema/Wishlist_Schema')
const Item = require('./Schema/Item_Schema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cluster = require('node:cluster');
const { body, validationResult } = require('express-validator')
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');
const fetchuser = require('./middleware/fetchuser')
const cors = require('cors')
const JWT_SECRET = "Ecom_web"
connectToDatabase();



if (cluster.isPrimary) {
    // console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {

    app.use(express.json());
    app.use(cors())
    app.listen(port, () => {
        console.log(`your server listen of port no.${port}`);
    })




    // this is the sign up endpoint associate with User schema

    app.post('/signup', [
        body("email", "enter a valid email").isEmail(),
        body("name", "enter a valid name").isLength({ min: 3 }),
        body("password", "password must be 5 digit").isLength({ min: 5 }),

    ] ,async (req, res) => {
        const { name, email, password } = req.body;
        const result = validationResult(req);
        const id = await User.findOne({ email })
        if (id) {
            return res.send("User alredy exist")

        }
        else {
            if (!result.isEmpty()) {

              return res.status(400).json({ success, errors: result.array([]) });
            }
            const salt = await bcrypt.genSaltSync(10);
            const hashpass = await bcrypt.hashSync(password, salt);

            const data = new User({
                name: name,
                email: email,
                password: hashpass,
            })

            await data.save();
            const ID = data.id;
            // console.log(ID)
            const token = jwt.sign(ID, JWT_SECRET)
            return res.json(token);
        }


    })

    // this is the login endpoint


    app.post('/login', [
        body("email", "enter an valid email").isEmail(),
        body("password", "password cannot be blank").exists(),
    ], async (req, res) => {
        const { email, password } = req.body;
        const result = validationResult(req);

        if (!result.isEmpty()) {

            return res.status(400).json({ errors: result.array([]) });
        }
        const user = await User.findOne({ email });
        if (user) {
            // password check
            const check = await bcrypt.compare(password, user.password)
            let success = "false";
            if (check) {
                const id = user.id;
                const token = jwt.sign(id, JWT_SECRET)
                success = "true";

                //  console.log({success,token})
                return res.json({ success, token })
            }
            // doing some validations improvement
            else {

                return res.json({ success, error: "please check credentials" })
            }

        }
        else {
            return res.send("sign up first")
        }
    })

    app.post("/getUserDetails", fetchuser, async (req, res) => {
        try {
            const id = req.user;
            // console.log(id)
            const user = await User.findById(id).select("-password")
            return res.json(user)
        }
        catch (e) {
            console.log(e)
        }
    })

    // this is the routes using Item Schema 

    // this route is based on the getting all items are present in Item DB
    app.get("/Items", async (req, res) => {
        try {
            const item = await Item.find({});
            return res.json(item)

        } catch (error) {
            return res.status(404).send({ error: "404 not found" })
        }
    })


    // this is the function which make the letter at 0 index convert in capital letter


    app.get('/SearchItem', async (req, res) => {
        // improve search instead of title search by searching query
        try {

            const { query } = req.query;

            const item = await Item.find({ searchQuery: { $in: query } }).select("-searchQuery");
            if (!item) {
                return res.json({ message: "item not found" })
            }
            return res.json({ item });
        }
        catch (e) {
            return res.status(400).json({ message: "something went wronge" })
        }
    })


    // finding item by id (item id)

    app.post("/id", async (req, res) => {
        try {
            const { id } = req.body;
            const item = await Item.findById(id);
            if (!item) {
                return res.json({ message: "item not found" })
            }
            return res.json(item);
        }
        catch (e) {
            return res.status(400).json({ message: "something went wronge" })
        }
    })


    // adding item in the item schema

    // this is the function which make the words of the array capital



    // saving items in the database
    app.post("/AddItem", async (req, res) => {
        const { title, price, desc, category, image, searchQuery } = req.body;

        try {
            let SearchQuery = insertCapitalWords(searchQuery)
            const item = new Item(
                // adding searching query in the field of this object and itemschema as well ..
                {
                    title: title,
                    price: price,
                    image: image,
                    category: category,
                    searchQuery: SearchQuery,
                    description: desc
                }
            )

            await item.save();

            return res.status(200).json({ message: "item added successfully" });

        }
        catch (e) {
            return res.status(404).send({ message: "something wronge happen", e })
        }

    })

    // cart route just adding data in the cart db by using the user id as the main id to differentiate in which account the item is cart 

    app.post("/Addcart", fetchuser, async (req, res) => {
        try {
            const { id } = req.body;
            const item = await Item.findById(id);
            if (item) {
                const data = new Cart({
                    id: req.user,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    searchQuery: item.searchQuery,
                    description: item.description
                })
                await data.save()
                return res.json({ message: "item saved in cart successful" })
            }
            else {
                res.json({ message: "NOT Found" })
            }
        }
        catch (e) {
            res.json({ message: "something wronge" })
        }
    })

    // wishlist route just adding data in the  wishlistdb by using the user id as the main id to differentiate in which account the item is wishlist


    app.post("/Wishlist", fetchuser, async (req, res) => {
        try {
            const { id } = req.body;
            const item = await Item.findById(id);
            if (item) {

                const data = new Wishlist({
                    id: req.user,
                    item_id: item._id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                    searchQuery: item.searchQuery,
                    description: item.description
                })
                await data.save()
                return res.json({ message: "item saved in Wishlist successful" })
            }
            else {
                res.json({ message: "NOT Found" })
            }
        }
        catch (e) {
            res.json({ message: "something wronge" })
        }
    })


    app.get('/Viewwishlist', fetchuser, async (req, res) => {
        try {
            const id = req.user
            // console.log(id)
            const response = await Wishlist.find({ id })
            return res.json(response)
        }
        catch (e) {
            return res.status(400).json({ error: e })
        }
    })

    app.get("/searchinwishlist", fetchuser, async (req, res) => {
        try {
            let success = "true";
            const ID = req.user;
            const { Item } = req.query;
            // console.log(`item title is : ${Item}`)
            // console.log(`user id is : ${ID}`)
            const item = await Wishlist.findOne({ id: ID, item_id: Item });
            if (!item) {
                success = "false"
                return res.json({ success, message: "item not found" })
            }
            return res.json({ success, item });
        }
        catch (e) {
            return res.status(400).json({ message: "something went wronge" })
        }
    })

    app.post('/removeWishlist', async (req, res) => {
        const { id } = req.body;
        let success = "false"
        try {
            const item = await Wishlist.findByIdAndDelete({ _id: id });
            if (item) {
                success = "true";
                return res.json({ success, message: "item removed successfully" });
            }
            else {
                return res.json({ success, message: "Something went wronge " });

            }
        }
        catch (e) {
            return res.status(400).json({ success, message: "something went wronge" })
        }
    })


    app.get('/ViewCart', fetchuser, async (req, res) => {
        try {
            const id = req.user
            // console.log(id)
            const response = await Cart.find({ id })
            return res.json(response)
        }
        catch (e) {
            return res.status(400).json({ error: e })
        }
    })

    app.post('/removeCart', async (req, res) => {
        const { id } = req.body;
        let success = "false"
        try {
            const item = await Cart.findByIdAndDelete({ _id: id });
            if (item) {
                success = "true";
                return res.json({ success, message: "item removed successfully" });
            }
            else {
                return res.json({ success, message: "Something went wronge " });

            }
        }
        catch (e) {
            return res.status(400).json({ success, message: "somgthing went wronge" })
        }
    })

    console.log(`Worker ${process.pid} started`);
}



