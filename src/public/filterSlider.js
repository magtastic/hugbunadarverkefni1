jQuery(function($)
{
    $(".hamburger").click(function()
    {
        $(".navigation").toggleClass("open");

    })
});

 $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 7,
      values: [ 0, 1],
      slide: function( event, ui ) {
          var startDate = new Date();
          var endDate = new Date();
          startDate.setDate(startDate.getDate()+ui.values[0]);
          endDate.setDate(endDate.getDate()+ui.values[1]);

          updateFilter("DATE", startDate, endDate);
          hideEvents();
          filterEventsByTime();
          filterEventsByAttenders();
          showEvents();
      }
    });
  } );

 $( function() {
    $( "#slider-range_1" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ filters.minAttenders, 500 ],
      slide: function( event, ui ) {
          updateFilter("ATTENDEES", ui.values[0], ui.values[1]);
          hideEvents();
          filterEventsByTime();
          filterEventsByAttenders();
          showEvents();
      }
    });
  } );

  function updateFilter(type, min, max) {
    if(type === "ATTENDEES") {
      filters.minAttenders = min;
      filters.maxAttenders = max;
    }else if(type === "DATE"){
      filters.startTime = min;
      filters.endTime = max;
    }
  }
