const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


//routes
require('./routes/userRoutes')(app);
require('./routes/brandRoutes')(app);
require('./routes/articleRoutes')(app);
require('./routes/shoeRoutes')(app);

app.listen(app.get('port'), () => {
    console.log('Servidor conectado en puerto 3000');
});