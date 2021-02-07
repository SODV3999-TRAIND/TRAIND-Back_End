# TRAIND-Back_End

Express/MongoDB/Node Components of the TRAIND site.

## Getting Started

```bash
npm install
npm start
```

The server runs on port 3000.

There are three routes:

## Error Handling

npm pkg "http-errors" is used for creating HTTP errors.

Errors from the Mongoose framework are captured using the callback (err, result)
Errors are created at the callback and propogated up to server.js using next(err)
