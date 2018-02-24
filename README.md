# Angular universal with node.js and mongoDB

Eshop with google login, cart save in session or user, test buy with stripe 

## Build


Run `ng build --prod && ng build --prod --app 1 --output-hashing=none`
<br />or <br />
`npm run build:ssr`

## Serve

Run `npm run start`
<br />or <br />
`ng serve`

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

## TEST ORDER

-Use test credit card number for stripe for testing the order - 4242 4242 4242 4242

