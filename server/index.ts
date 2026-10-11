import express, { type Request, type Response } from "express";
import { addEmailInQueue } from "./addEmail";

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server is Ok"
    });
});


app.post("/signup", (req, res) => {
    res.status(200).json({
        message: "Signup sucessfull"
    });
});


app.post("/signin", (req, res) => {
    res.status(200).json({
        message: "Signin sucessfull"
    });
});


app.post("/create-camp", async (req, res) => {
    const {campName, recipient, subject, content} = req.body;
    if (!campName || !recipient || !subject || !content)  {
        res.status(400).json({
            message: "insufficient data"
        });
    }

    try {
        await addEmailInQueue(recipient, subject, content, campName);   
        res.status(200).json({
            message: "Task added in the queue"
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Error"
        });
    }
});


app.post("/edis-camp/:id", (req, res) => {
    res.status(200).json({
        message: "Camp edited sucessfully"
    });
});


app.post("/delete-camp/:id", (req, res) => {
    res.status(200).json({
        message: "Camp deleted sucessfully"
    });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});