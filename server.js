const express = require('express');
const path = require('path');
const app = express();
const PORT = 2039;

app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});