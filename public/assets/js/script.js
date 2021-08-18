// @ts-nocheck
$(document).ready(() => {
  const bookingForm = document.getElementById('bookingForm');
  const email = $('#email');
  const name = $('#name');
  const phone = $('#phone');
  const checkInDate = $('#checkInDate');
  const checkOutDate = $('#checkOutDate');
  const adults = $('#adults');
  const children = $('#children');
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

  // Form handling
  bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.text('sending...');
    submitBtn.attr('disabled', true);

    const data = {
      check_in_date: checkInDate.val(),
      check_out_date: checkOutDate.val(),
      adults: adults.val(),
      children: children.val(),
      name: name.val(),
      email: email.val(),
      phone: phone.val()
    }

    let response;
    try {
      response = await (await axios.post('/api/booking/', data)).data;      
    } catch (error) {
      alert('An error occured');
      console.log(error);
    }

    if(response.status) {
      alert('Booking Successful! Please check you mail');
    }
  };
});