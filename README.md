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

## Database

The connection to the database is via the MongoDB Client.

## Testing

Testing is done using Mocha and Chai.
End-point testing uses Chai-HTTP

For testing an in-memory database is created. To trigger the in-memory database set the NODE_ENV = "test".
The in-memory db is populated with data saved within the test files.
