const express = require('express');
const connectDb = require('./config/connect');
const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog')
const app = express();
const PORT = 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", userRoutes)
app.use("/api/v1", blogRoutes)

app.get("/health", (req, res) => {
    try {
        res.send(0)
    } catch (error) {
        res.send(1)
    }
})

app.listen(PORT, () => {
    connectDb()
    console.log('Server started..')
})