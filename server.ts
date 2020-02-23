import 'zone.js/dist/zone-node';
require('reflect-metadata');

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { existsSync } from 'fs';
import { APP_BASE_HREF } from '@angular/common';


const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const compression = require('compression');
const MongoStore = require('connect-mongo')(session);
import { AppServerModule } from './src/main.server';

const DIST_FOLDER = path.join(process.cwd(), 'dist');


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


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  // compress files
  server.use(compression());

  // set CORS headers
  server.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
    next();
  });
  const distFolder = path.join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(path.join(distFolder, 'index.html')) ? 'index.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });

  server.use(bodyParser.urlencoded({extended: false}));
  server.use(bodyParser.json());

  server.use(
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
  server.use(passport.initialize());
  server.use(passport.session());

  server.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
  });

  server.use('/auth', authRoutes);
  server.use('/api', billingRoutes);
  server.use('/prod', productRoutes);
  server.use('/cartApi', cartRoutes);
  server.use('/admin', adminRoutes);

  server.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));


  server.get('*', (req, res) => {
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



  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}


function run() {
  const port = process.env.PORT || 4000;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}


// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}


export * from './src/main.server';