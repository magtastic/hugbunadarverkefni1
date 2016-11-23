$(document).ready(function(){
  var zindex = 10;

  $("div.card").click(function(){

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show")
        .removeClass("show");
      $(this).find('h3').removeClass('unhide-overflow');
      $(this).children('h2').removeClass('unhide-overflow');

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards")
          .removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no cards in view
      $("div.cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");
      $(this).find('h3').addClass('unhide-overflow');
      $(this).children('h2').addClass('unhide-overflow');

      zindex++;
    }

  });
});
