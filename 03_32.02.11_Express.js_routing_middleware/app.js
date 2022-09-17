//  Frameworks & Librar(ies)
//  ========================
const express = require('express');
const morgan = require('morgan');

//  Module(s)
//  =========
const itemRouter = require(`./modules/routerItem`);

//  Setting(s)
//  ==========
app = express();
app.use(morgan('dev'));
app.use(express.json());

//  Environment Variable(s) & Constant(s)
//  ====================================
const PORT_NUMBER = 3000;

//  Routing
//  =======
app.get('/', (req, res) => {
    return res.send('index');
});

app.use('/item', itemRouter);