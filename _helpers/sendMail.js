const AWS = require('aws-sdk');
const nodemailer = require('nodemailer')

const config = new AWS.Config({
	region: process.env.AWS_REGION,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	accessKeyId: process.env.AWS_ID
});

const ses = new AWS.SES(config);

module.exports = async function sendMail({ to, from, message, subject, code }, cb) {
	//   console.log('In send mail function');
	//   const params = {
	//     Destination: {
	//       ToAddresses: [
	//         to
	//       ]
	//     },
	//     Message: {
	//       Body: {
	//         Text: {
	//           Charset: 'UTF-8',
	//           Data: `${message}`
	//         },
	//       },
	//       Subject: {
	//         Charset: 'UTF-8',
	//         Data: subject
	//       }
	//     },
	//     Source: `Deggia<${from}>`
	//   };

	//   return ses.sendEmail(params, handleError);

	const transport = nodemailer.createTransport({
		host: process.env.HOST,
		port: process.env.AWS_PORT,
		secure: true,
		auth: {
			user: process.env.AWS_SES_USER,
			pass: process.env.AWS_SES_PASS
		},
	});

	const mailData = {
		from,
		to,
		subject,
		html: message
	};

	const replyData = {
		from: to,
		to: from,
		subject: `Booking [#${code}]<${from}>`,
		html: `
      <html>
        <body>
      		<h4>Hello, ${name.val()}</h4>
         	<p>Thank you for booking with us, your booking code is ${bookingCode}. Kindly note this as it will be required for any futher operation. Our team will review your booking status and get back to you. <br>Many Thanks!</p>
          </body>
          </html>
		`
	}

	transport.sendMail(mailData, (err, res) => {
		if(err) {
			cb(err, false);
			return;
		}
		transport.sendMail(replyData, (replyErr, replyRes) => {
			cb(replyErr, replyRes)
		})
	});

}

function handleError(err) {
	if (err) {
		const error = new Error('could not send mail');
		console.log('mail send failed');
		return error;
	}
	return 'mail sent';
}