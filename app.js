const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const secret = process.env.SECRET

import * as crypto from 'node:crypto'

/**
 * Verifies a Tiltify Webhook Signature is valid
 *
 * @param {string} secret
 * @param {string} signature
 * @param {string} timestamp
 * @param {string} body
 * @returns {boolean}
 */
const verifySignature = (secret, signature, timestamp, body) => {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(`${timestamp}.${body}`)
  return signature === hmac.digest('base64')
}

app.get("/", (req, res) => {
  res.send("hello world")
})

app.post("/hook", (req, res, next) => {
  if (verifySignature(secret, req.get("X-Tiltify-Signature"), req.get("X-Tiltify-Timestamp"), req.body)) {
    console.log("INVALID SIGNATURE")
  } else {
    console.log("VALID SIGNATURE")
    console.log(req.body["data"]["amount"]["value"])

  res.status(200).send("OK")
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
