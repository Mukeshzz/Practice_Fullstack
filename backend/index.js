import { app } from "./app.js";
import 'dotenv/config.js'
import connectDB from "./db/index.js";

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })

    app.get('/',(req, res) => {
        res.send(`<h1>Server is running...</h1>`)
    })
}).catch((error) => {
    console.log('MongoDB instance connection Failed', error);
    
})

