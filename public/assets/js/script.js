// @ts-nocheck
import { username, password, host, recipient } from './credentials.js';
$(document).ready(() => {
  const bookingForm = document.getElementById('bookingForm');
  const email = $('#email');
  const name = $('#name');
  const phone = $('#phone');
  const checkInDate = $('#checkInDate');
  const checkOutDate = $('#checkOutDate');
  const adults = $('#adults');
  const children = $('#children');
  const bookingCode = `#${Date.now()}`;
  const submitBtn = $('#submitBtn');

  const parsleyInstance = $('#bookingForm').parsley();

  let diff = 0;

  $('#checkIn').datepicker({
    startDate: new Date(),
    clearBtn: true,
    todayHighlight: true
  }).on('changeDate', (e) => {
    const today = new Date().getDate();
    const checkInDay = Number.parseInt(checkInDate.val().split('/')[1]);
    diff = checkInDay - today;
    $('#checkOut').datepicker({
      startDate: `+${diff}d`,
      clearBtn: true,
      // todayHighlight: true
    });
  });


  const handleTabClick = (e) => {
    $('.booking .tabs .item').toggleClass('tab-active');
  };

  $('.booking .tabs .item').on('click', handleTabClick);

  // Form handling
  bookingForm.onsubmit = (e) => {
    e.preventDefault();
    submitBtn.text('sending...');
    submitBtn.attr('disabled', true);
    Email.send({
      Host: host,
      Username: username,
      Password: password,
      To: `<${recipient}>`,
      From: email.val(),
      Subject: 'New Hotel Booking',
      Body: `
        <html>
          <body>
          <p>A new booking just occured through the website contact form from:</p>
          <b>Booking Code</b>: ${bookingCode}<br>
          <b>Name</b>: ${name.val()}<br>
          <b>Phone Number</b>: ${phone.val()}<br>
          <b>Check In Date</b>: ${checkInDate.val()}<br>
          <b>Check Out Date</b>: ${checkOutDate.val()}<br>
          <b>Adults</b>: ${adults.val() > 0 ? adults.val() : 0}<br>
          <b>Children</b>: ${children.val() > 0 ? children.val() : 0}<br>
          </body>
        </html>
      `
    }).then((msg) => {
      console.log(msg)
      if(msg !== 'OK') {
        alert('Something went wrong, try again');
        return;
      }
      Email.send({
        Host: host,
        Username: username,
        Password: password,
        To: `<${email.val()}>`,
        From: recipient,
        Subject: `Booking Success [${bookingCode}]`,
        Body: `
          <html>
            <body>
            <h4>Hello, ${name.val()}</h4>
            <p>Thank you for booking with us, your booking code is ${bookingCode}. Kindly note this as it will be required for any futher operation. Our team will review your booking status and get back to you. <br>Many Thanks!</p>
            </body>
          </html>
        `
      }).then((res) => {
        console.log(res);
        if(res !== 'OK') {
          alert('Something went wrong, try again');
          return;
        }
        submitBtn.text('Submit');
        submitBtn.prop('disabled', false);
        email.val('');
        name.val('');
        phone.val('');
        checkInDate.val('');
        checkOutDate.val('');
        adults.val('');
        children.val('');
        alert('Booking complete, please check your mail');
      });
    });
  };
});