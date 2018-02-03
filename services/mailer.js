const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
  constructor(cart,reqEmail,orderId) {
     super();

    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email('no-reply@bluetooh-eshop.com');
    this.subject = 'Order';

    this.body = new helper.Content('text/html', getContent(cart, orderId));

    this.email = new helper.Email(reqEmail);
    const personalize = new helper.Personalization();
    personalize.addTo(this.email);

    this.addContent(this.body);
    this.addPersonalization(personalize);

  }

  async send() {
    const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
  }
}


module.exports = Mailer;


function getContent(cart, orderId) {

    function prepareItem(items) {
      return items.map(product => {
        return `<li>${product.item.title} ${product.price}€ ${product.qty}ks </li>`;
      }) ;
     }

     return `<html>
     <body>
     <div style="text-align:center;">
      <h3> Thank you for your order! </h3>
      <p> Your products</p>
      <ul>${prepareItem(cart.items)} </ul>
      <div>
      </div>
      <div>
      Summary: ${cart.totalPrice}€
      </div>
      You can see your order here:
      <a href="https://angular-un-ngrx-node-eshop.herokuapp.com/orders/${orderId}"> </a>
     </div>
     </body>
     </html>
     `
   }
