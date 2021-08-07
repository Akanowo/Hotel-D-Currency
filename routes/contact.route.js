const router = require('express').Router();
const sendMail = require('../_helpers/sendMail');
const uniqid = require('uniqid');

const routes = () => {

	router.route('/')
		.post((req, res) => {
			const {
				booking_type,
				check_in_date,
				check_out_date,
				check_in_time,
				check_out_time,
				adults,
				children,
				name,
				email,
				phone
			} = req.body;

			const message = `
			<html>
				<body>
				<p>A new booking just occured through the website contact form from:</p>
				<b>Booking Code</b>: ${uniqid('#')}<br>
				<b>Booking Type</b>: ${booking_type}<br>
				<b>Name</b>: ${name}<br>
				<b>Phone Number</b>: ${phone}<br>
				<b>Check In Date</b>: ${check_in_date}<br>
				${check_out_date ? `<b>Check Out Date</b>: ${check_out_date}<br>` : ''}
				${check_in_time ? `<b>Check In Time</b>: ${check_in_time}<br>` : ''}
				${check_out_time ? `<b>Check Out Time</b>: ${check_out_time}<br>` : ''}
				<b>Adults</b>: ${adults > 0 ? adults : 0}<br>
				<b>Children</b>: ${children > 0 ? children : 0}<br>
				</body>
			</html>
		`;

			// send mail
			sendMail({ to: process.env.RECIPIENT_EMAIL, from: email, subject: 'Hotel Booking', message }, (err, response) => {
				if(err) {
					console.log(err)
					return res.status(500).json({
						status: false,
						error: 'An error occured'
					})
				}
				return res.status(200).json({
					status: true,
					response
				})
			})
		});

	return router;
}

module.exports = routes;