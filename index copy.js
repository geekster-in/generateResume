require("dotenv").config();
const fs = require("fs");
console.log("Loading function");
var html_to_pdf = require("html-pdf-node");

let options = { format: "A4", printBackground: true, margin: {top: 20, bottom: 20, right: 20, left:20} };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

exports.handler = async (event = 1, context) => {
  console.log("value1 =", event);
  const fileContent = fs.readFileSync("./resume.html");
  let file = { content: fileContent };
  html_to_pdf.generatePdf(file, options).then((pdfBuffer) => {
    // console.log("PDF Buffer:-", pdfBuffer);
    // fs.writeFileSync("some.pdf", pdfBuffer);
    return {
      statusCode: 200,
      body: pdfBuffer.toString("base64"),
      headers: { "Content-Type": "application/json" },
    };
  });
  // return event.key1; // Echo back the first key value
  // throw new Error('Something went wrong');
};

