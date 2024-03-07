const express = require('express')
const app = express()

app.get("/", (req, res) => {
  res.send("hello world")
})

app.post("/hook", (req, res, next) => {
  const webhookUrl = req.params.url
  console.log(webhookUrl)

  res.status(200).send("OK")
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
