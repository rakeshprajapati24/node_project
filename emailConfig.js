const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: 'contact@theadroithr.com',
    pass: 'gvIOFwC3U5ENGdyS',
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
