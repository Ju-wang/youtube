
import express from "express"
import morgan from "morgan"

const app = express()
const logger = morgan("dev")

const port = 4000

function handleHome (req, res){
    return res.send("I still love you")
}



app.use(logger)
app.get("/", handleHome);




const handleListening = () => console.log("listing");

app.listen(port, handleListening)