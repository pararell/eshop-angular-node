

const sendgrid  = require("sendgrid");
const helper    = sendgrid.mail;
const keys      = require("../config/keys");

const prepareOrderEmailTemplate = require('./emailTemplates');


class Mailer extends helper.Mail {
  constructor(reqEmail, emailType) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email("no-reply@bluetooh-eshop.com");
    this.subject = emailType.subject;

    this.body = new helper.Content("text/html", getContent(emailType));

    this.email = new helper.Email(reqEmail);
    const personalize = new helper.Personalization();
    personalize.addTo(this.email);

    this.addContent(this.body);
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;

function getContent(emailType) {
  if (emailType.subject === "Order") {
    const cart = emailType.cart;

    return prepareOrderEmailTemplate(cart, emailType);

  } else if (emailType.subject === "Contact") {
    return `<html>
     <body>
     <div style="text-align:center;">
      <h3> Thank you for contact us! </h3>
      <p> We will let you know soon about your requirement</p>
      <p>Your requirement:</p>
      <p> Name: ${emailType.contact.name} </p>
      <p> Email: ${emailType.contact.email} </p>
      <p> Notes: ${emailType.contact.notes} </p>
      <div>
      </div>
      <div>
      </div>
      <a href="https://angular-un-ngrx-node-eshop.herokuapp.com> Bluetooth Eshop </a>
     </div>
     </body>
     </html>
     `;
  } else if (emailType.subject === "Contact-From-Customer") {
    return `<html>
    <body>
    <div style="text-align:center;">
     <h3> Contact from customer</h3>
     <p> Name: ${emailType.contact.name} </p>
     <p> Email: ${emailType.contact.email} </p>
     <p> Notes: ${emailType.contact.notes} </p>
     <div>
     </div>
     <div>
     </div>
     <a href="https://angular-un-ngrx-node-eshop.herokuapp.com> Bluetooth Eshop </a>
    </div>
    </body>
    </html>
    `;
  }
}
