import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
// credentials: true}
// ));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true ,limit: '50mb'}));
app.use(express.static('public'));
app.use(cookieParser());

const corsOption={
    origin:'http://localhost:5173',
    credentials:true

}
app.use(cors(corsOption));


// //routes
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js"
app.use('/api/v1/users',userRoute );
app.use("/api/v1/message",messageRoute);



export {app};