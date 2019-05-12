require('zone.js/dist/zone-node');
require('reflect-metadata');

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const compression = require('compression');
const MongoStore = require('connect-mongo')(session);

const DIST_FOLDER = path.join(process.cwd(), 'dist');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

const PORT = process.env.PORT || 5000;

// mongoose models
require('./models/User');
require('./models/Product');
require('./models/Order');
require('./models/Translation');

// services
require('./services/passport');
require('./services/cache');

// connect mongoDB
if (keys.mongoURI) {
  mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);
}

import { authRoutes, billingRoutes, productRoutes, cartRoutes, adminRoutes } from './routes';


enableProdMode();


// set Express
const app = express();

// compress files
app.use(compression());

// set CORS headers
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
  next();
});


app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(
  session({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session'
    })
  })
);

// middlewares
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/auth', authRoutes);
app.use('/api', billingRoutes);
app.use('/prod', productRoutes);
app.use('/cartApi', cartRoutes);
app.use('/admin', adminRoutes);

// app.get('/', angularRouter);

app.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));

// app.use(express.static(`${__dirname}/dist/browser`));

app.get('*', (req, res) => {
  res.render(path.join(DIST_FOLDER, 'browser', 'index.html'), {
    req,
    res,
    providers: [
      {
        provide  : 'REQUEST',
        useValue : (req)
      },
      {
        provide  : 'RESPONSE',
        useValue : (res)
      }
    ]
  });
});


// app.get('*', angularRouter);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
