// @ts-nocheck
$(document).ready(() => {
  const bookingForm = document.getElementById('bookingForm');
  const email = $('#email');
  const name = $('#name');
  const phone = $('#phone');
  const checkInDate = $('#checkInDate');
  const checkOutDate = $('#checkOutDate');
  const checkInTime = $('#checkInTime')
  const checkOutTime = $('#checkOutTime');
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

  $('#checkInTime').timepicker();
  $('#checkOutTime').timepicker();

  const handleTabClick = (e) => {
    $('.booking .tabs .item').toggleClass('tab-active');
    if(e.target.innerHTML.includes('Short rest')) {
      $('#checkInTimeDiv').toggleClass('hide');
      $('#checkOutTimeDiv').toggleClass('hide');
      $('#checkOutDate').toggleClass('hide');
    }

    if(e.target.innerHTML.includes('Lodging')) {
      $('#checkInTimeDiv').toggleClass('hide');
      $('#checkOutTimeDiv').toggleClass('hide');
      $('#checkOutDate').toggleClass('hide');
    }
  };

  $('.booking .tabs .item').on('click', handleTabClick);

  // Form handling
  bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    submitBtn.text('sending...');
    submitBtn.attr('disabled', true);

    const data = {
      booking_type: checkInTime.val() ? 'Short Rest' : 'Lodging',
      check_in_date: checkInDate.val(),
      check_out_date: checkOutDate.val(),
      check_in_time: checkInTime.val(),
      check_out_time: checkOutTime.val(),
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