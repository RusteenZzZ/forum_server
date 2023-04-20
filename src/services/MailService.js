import dotenv from 'dotenv'
dotenv.config()
import nodemailer from "nodemailer"

class MailService {
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      html:
        `
          <div>
            <h2>Please, follow the link to activate your account</h2>
            <a href="${link}">Activate account</a>
          </div>
        `
    })
  }
}

export default new MailService