const [express, cors, cookieParser, fs, path] = [
    require("express"),
    require("cors"),
    require("cookie-parser"),
    require("fs"),
    require("path")
]

const app = express()
app.use(cors({ origin: "*" }))
app.use(express.json())


app.get("/", (req, res) => {
    const ua = req.headers["user-agent"];
    console.log("User-Agent:", ua);

    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    if (isMobile) {
        console.log("Visitor is on a mobile device");
    } else {
        console.log("Visitor is on desktop/laptop");
    }
    
    res.sendFile(path.join(__dirname, "build", "index.html"))
    console.log(req.headers["user-agent"])
})

app.use(express.static(path.join(__dirname, "build"), {index: false}))

app.listen(5500, () => {
    console.log("listening on port 5500")
    const interval = setInterval( async () => {
        const response = await fetch("https://sstrackerapp.onrender.com/")
        console.log(await response.text())
    }, (1000 * 60 * 30))
})
