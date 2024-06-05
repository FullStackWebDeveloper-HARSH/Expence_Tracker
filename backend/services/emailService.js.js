const nodemailer = require('nodemailer');

exports.sendInvitationEmail = async (email, groupId) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_SERVICE_API_KEY,
      pass: process.env.EMAIL_SERVICE_API_KEY
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Invitation to Join Group',
    text: `You have been invited to join a group. Click the link to join: http://localhost:3000/group/${groupId}`
  };

  await transporter.sendMail(mailOptions);
};
