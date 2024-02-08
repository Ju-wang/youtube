import "./db"
import "./modles/Video"
import app from "./server";

const port = 4000


const handleListening = () => console.log("https:localhost:4000");

app.listen(port, handleListening)