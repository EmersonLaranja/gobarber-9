import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, segure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      segure,
      auth: auth.user ? auth : null, // check if exists a user, cause in some cases is not necessary
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    ); // how compile the template emails, formatting our message
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}
export default new Mail();
