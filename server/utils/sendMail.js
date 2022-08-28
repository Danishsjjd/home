const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: "smtp.gmail.com",
		port: "465",
		service: "gmail",
		auth: {
			user: process.env.SMTP_MAIL,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.SMTP_MAIL,
		to: options.email,
		subject: options.subject,
		html: options.message,
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
