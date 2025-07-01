import dotenv from 'dotenv'
import {db} from './db/db.index.js'
import {app} from './app.js'
dotenv.config({
    path: './.env'
})
// const connection = await db()
// console.log("connection", connection);


    app.listen(process.env.PORT, ()=>{
        console.log(`App Listing On Port ${process.env.PORT}`);
        
    })
