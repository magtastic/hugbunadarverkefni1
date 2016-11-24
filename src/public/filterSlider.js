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
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
          //updateFilter(ui.values[0], ui.values[1]);

      }
    });
  } );

 $( function() {
    $( "#slider-range_1" ).slider({
      range: true,
      min: 0,
      max: 500,
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
    }
  }
