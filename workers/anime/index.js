const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const getRouter = require("./Router/getKms");
const getTopList = require("./Router/getTopList");
const app = express();
const sendEmail = require("./nodeMailer");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

//Route get all characters from Kimetsu no Yaiba
app.use("/api", getRouter);

//Route get top anime from myanimelist
app.use("/api", getTopList);

//Route send email
app.post("/api/send/:email", (req, res) => {
  //get parameter from url
  const email = req.params.email;
  try {
    sendEmail(email).then(() => {
      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log(error);
  }
});

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((e) => {
    console.log(e);
  });

//OpenAi chat GPT-3
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
app.post("/api/chat", (req, res) => {
  try {
    const complete = async () => {
      const prompt = req.body.prompt;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 3000,
        temperature: 0,
      });
        const data = response.data.choices[0].text;
        console.log(data);
        res.status(200).send(data);
    };
    complete();
  } catch (error) {}
});
