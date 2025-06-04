import 'dotenv/config'
import { app } from './app.js'
import connectDB from './db/db.js'

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo DB connection error", err)
})