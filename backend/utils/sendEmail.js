const nodemailer = require('nodemailer');

const sendEmail = async options => {
  
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'shopit290@gmail.com', // TODO: your gmail account
              pass: 'shopit12345' // TODO: your gmail password
          }
      });

      const message = {
          to: options.email,
          from: 'Shop IT - noreply@shopit.com',
          subject: options.subject,
          text: options.message,
      }

      await transporter.sendMail(message)

  }

module.exports = sendEmail;