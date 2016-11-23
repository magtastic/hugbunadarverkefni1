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
          console.log("event: " + event);
          console.log("ui: " + ui);
      }
    });
  } );
  
 $( function() {
    $( "#slider-range_1" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
          console.log("event: " + event);
          console.log("ui: " + ui);
      }
    });
  } );