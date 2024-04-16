import path from 'path';
import express from 'express'
import dotevn from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotevn.config();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({
    extended:true
}));
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is Running on port ${PORT}`)
})