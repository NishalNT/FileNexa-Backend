const sendMail = require('./services/emailService');

async function testSendMail() {
  try {
    const emailOptions = {
      from: 'n461700@gmail.com',
      to: 'nishalnthingalaya1@gmail.com.com',
      subject: 'Test Email',
      text: 'This is a test email sent using Nodemailer with Brevo SMTP relay.',
      html: '<p>This is a <b>test email</b> sent using <i>Nodemailer</i> with Brevo SMTP relay.</p>',
    };

    await sendMail(emailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testSendMail();
