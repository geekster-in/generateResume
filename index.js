const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
var html_to_pdf = require("html-pdf-node");


let options = {
  format: "A4",
  printBackground: true,
  margin: { top: 20, bottom: 20, right: 20, left: 20 },
};

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get("/", async(req, res) => {
  const fileContent = fs.readFileSync("./resume.html");
  let file = { content: fileContent };
  html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
    // console.log("PDF Buffer:-", pdfBuffer1);
    // fs.writeFileSync("some.pdf", pdfBuffer);
    res.json({
      status: 200,
      body: pdfBuffer.toString("base64"),
    })
  });
});





app.listen(80);