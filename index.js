const express = require('express');
const rkeRouter = require('./routes/rke143');
const countriesRouter = require('./routes/countries');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('RKE143 Server is running');
});

app.use('/rke143', rkeRouter);
app.use('/countries', countriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
