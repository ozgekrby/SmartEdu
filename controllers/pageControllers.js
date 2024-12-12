const nodemailer = require('nodemailer');
exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};
exports.sendEmail = async (req, res) => {
  const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
  `;

  try {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass, 
      },
    });

    let info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <no-reply@smartedu.com>', 
      to: 'test@example.com', 
      subject: 'Smart EDU Contact Form New Message ✔', 
      html: outputMessage, 
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    req.flash("success", "We Received your message succesfully");
    res.status(200).redirect('contact');
  } catch (error) {
    req.flash("error", `Something happened!`);
    res.status(200).redirect('contact');
  }
};
