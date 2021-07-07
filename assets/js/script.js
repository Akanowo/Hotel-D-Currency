$('.datepicker').datepicker();


const handleTabClick = (e) => {
  $('.booking .tabs .item').toggleClass('tab-active');
};

$('.booking .tabs .item').on('click', handleTabClick);