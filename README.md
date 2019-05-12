# Angular universal (server-side rendering) with node.js and mongoDB

Eshop with google login, cart save in session or user, test buy with stripe

## PREPARE ENVIROMENT

Create dev.js in config and add keys as their are prepare in - dev.setThisFromExternalApiKeys <br />
<br />
mongoURI - use link to mongoDB database, e.g. from mlab.com
<br /><br />
googleClientID - create to set login through google - google API
<br />
googleClientSecret - create to set login through google - google API
<br /><br />
stripePublishableKey - set to work with stripe payments
<br />
stripeSecretKey - set to work with stripe payments
<br />
sendGridKey - set to use sendGrid
<br /><br />
cloudinaryName - set to upload images straight from angular to cloudinary
<br />
cloudinaryKey - set to upload images straight from angular to cloudinary
<br />
cloudinarySecret - set to upload images straight from angular to cloudinary
<br />
redisUrl: { host: 'localhost', port: 6379 }


## BUILD AND SERVE

## without docker
Serve redis - host:localhost port:6379
<br />
Build and serve
<br />
Run `npm run ssr`

Serve
<br />
Run `npm run start`

## with docker
Run `docker compose up`
<br />
(will start redis and app)
<br />
redisUrl: { host: 'redis-serve', port: 6379 }


## TEST ORDER

-Use test credit card number for stripe for testing the order - 4242 4242 4242 4242
