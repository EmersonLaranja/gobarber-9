import nodemailer from 'nodemailer';
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
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...mailConfig.default, ...message });
  }
}
export default new Mail();
