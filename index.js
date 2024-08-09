// 1. Import express and axios
import express from "express";
import mongoose from 'mongoose';

 const connectDD = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/crud');
        console.log('mongoose conected');
    } catch (error) {
        console.log('error in mongoose')
    }
 }
 connectDD();
const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  }
})

const User = mongoose.model('User', userSchema)


// 2. Create an express app and set the port number.
const app = express();
const PORT = 3000;
// 3. Use the public folder for static files.
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// 4. When the user goes to the home page it should render the index.ejs file.
app.get('/',  async(req , res)=>{
    try{
   const users  = await User.find();
   res.status(200).json(users)
        
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
})


app.post('/create',async (req, res) => {
    try {
        const {firstName, lastName, email} = req.body;

        let user = new User({
            firstName,
            lastName,
            email
        });

        await user.save();
        return res.status(201).json({message : "user created"}) 
    } catch (error) {
        console.log(error)
        return res.status(401).send(error)
    }
})

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(PORT , ()=>{
    console.log(`Server started at port ${PORT}`);
})
