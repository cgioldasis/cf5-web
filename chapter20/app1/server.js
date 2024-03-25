// App js
const app = require('./app');
// Initilize the port
const port = 3000;
// Start the server on the port 3000
app.listen(port, () => {
  console.log("Server is up");
})