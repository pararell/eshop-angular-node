# Angular universal with node.js and mongoDB

Eshop with google login, cart save in session or user, test buy with stripe 

## Build

Run `npm run build`
<br />or <br />
Run `ng build --prod && ng build --prod --app 1 --output-hashing=none`

## Serve

Run `npm run start`
<br />or <br />
Run `node server.js`

## PREPARE ENVIROMENT

Create dev.js in config and add keys as their are prepare in - dev.setThisFromExternalApiKeys <br />
<br />
mongoURI - use link to mongoDB database, e.g. from mlab.com
<br />
googleClientID - create to set login through google - google API
googleClientSecret - create to set login through google - google API
<br />
stripePublishableKey - set to work with stripe payments
stripeSecretKey - set to work with stripe payments
<br />
sendGridKey - set to use sendGrid
<br />
cloudinaryName - set to upload images straight from angular to cloudinary
cloudinaryKey - set to upload images straight from angular to cloudinary
cloudinarySecret - set to upload images straight from angular to cloudinary

## TEST ORDER

-Use test credit card number for stripe for testing the order - 4242 4242 4242 4242

