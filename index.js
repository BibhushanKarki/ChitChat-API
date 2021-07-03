const express =require("express");
const app= express();
const cors=require('cors')
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");

const port = process.env.PORT || 5000;

const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex:true,useFindAndModify:false,keepAlive:true })
.then(()=> console.log("MongoDB Connected!"))
.catch(err => console.error(err))
;

// middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)

app.listen(port, ()=>{
  console.log("server is running")
})