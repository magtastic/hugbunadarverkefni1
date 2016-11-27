// Globals!
var allEvents = [];
var shownEvents = [];
var filters = {
  startTime: new Date(),
  endTime: new Date(),
  minAttenders: 0,
  maxAttenders: 500,
};

$(document).ready(function () {
  initEventCards();
  initFilterEvents();
  initGoogleAPI();
});

function initEventCards() {

  var zindex = 10;

  $("div.card").click(function(){

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true;
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
}


//init the google geocoder
function initGoogleAPI(){
  var theForm = $('.inputbox');
  var inputBox = $(theForm.find('input'));
  inputBox.keypress( function (e) {
    var enterKeycode = 13;
    if (e.keyCode === enterKeycode) {
      console.log('hae');
      e.preventDefault();
      var inputValue = inputBox.val();
      getLatitudeAndLongitude(processResponse, inputValue);
    }
  });
  function getLatitudeAndLongitude (callback, inputValue) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': inputValue}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            //console.log("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
          } else {
            console.log("Something got wrong " + status);
          }
          if (results)
          callback(results);
        });
  }
  function processResponse (results) {
    //inputBox.val([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
    theForm.submit();
    location.assign('/search?searchString='+results[0].geometry.location.lat()+'%2C'+results[0].geometry.location.lng());
  }
}

//When the site loads we filters
//get all events from the location
//and filter them out acording to
//the filters option.
function initFilterEvents(){
    var events = $('.hidden-info');
    events.each(getJsonFromHTML);
    saveFiltersInLocalStorage(filters); //only saved on search submit
    var loadedFilters = loadFiltersInLocalStorage();
    setLoadedFilters(loadedFilters);
    filterEventsByTime();
    filterEventsByAttenders();
    showEvents();
}

//gets hidden JSON-string from
//element and converts to a JS-object
function getJsonFromHTML(){
    var myJson = this.innerHTML.replace("<p>","").replace("</p>","");
    allEvents.push(JSON.parse(myJson));
}

//Filters out shownEvents acording to
//min and max attenders.
//This assumes that we have filtered
//acording to date filter options.
function filterEventsByAttenders(){
    var removeEvents = [];
    for(var num in shownEvents){
        var attendees = shownEvents[num].stats.attending;
        if(filters.minAttenders > attendees){
            removeEvents.push(shownEvents[num]);
        }
        if(filters.maxAttenders && filters.maxAttenders < attendees ){
            removeEvents.push(shownEvents[num]);
        }
    }
    for(var num in removeEvents){
        shownEvents.splice(shownEvents.indexOf(removeEvents[num]),1);
    }
}

//Filter all events acording to date filter options.
function filterEventsByTime(){
    console.log(filters);
    if(filters.startTime.valueOf() == filters.endTime.valueOf()){
        filters.endTime.setDate(filters.endTime.getDate()+1);
    }
    shownEvents=[];
    var tmpStartDate = "";
    var tmpEndDate= "";

    for(var event in allEvents){
       if(allEvents[event].startTime !== null
         && typeof allEvents[event].startTime.length === 'function') {
        allEvents[event].startTime = convertFacebookDateToJavaScriptDate(allEvents[event].startTime);
       }
        tmpStartDate = new Date(allEvents[event].startTime);
        if(tmpStartDate < filters.endTime && tmpStartDate > filters.startTime && !eventIsInArray(shownEvents, allEvents[event].id)){
            shownEvents.push(allEvents[event]);
        }
    }
}

//Checks if id is in given array
function eventIsInArray(arr,id){
    for(var check in arr){
        if(arr[check].id == id){
            return true;
        }
    }
    return false;
}

//Converts the string that facebook gives to
//a JS Date object.
function convertFacebookDateToJavaScriptDate(facebookDate){
    if(facebookDate === null || !facebookDate || facebookDate === undefined){
        return false;
    }
    facebookDate = facebookDate.replace(/-/g, "/");
    facebookDate = facebookDate.substring(0,facebookDate.indexOf("+"));
    facebookDate = facebookDate.replace("T"," ");
    var result = new Date(facebookDate);
    return result;
}

//Shows all events in shownEvents array
function showEvents(){
    var id = null;
    var element = null;

    for(var att in shownEvents){
        id = shownEvents[att].id;
        element = $("#"+id);
        element.css("display","inline-block");
    }
}

//Hide all events in shownEvents array
function hideEvents() {
  var id = null;
  var element = null;
  for(var att in shownEvents){
      id = shownEvents[att].id;
      element = $("#"+id);
      element.css("display","none");
  }
}

//Saves fitler options to localStorage
function saveFiltersInLocalStorage(f){
  var theForm = $('.inputbox');
  var inputBox = $(theForm.find('input'));
  inputBox.keypress(function (e) {
    var enterKeycode = 13;
    if(e.keyCode === enterKeycode) {
      e.preventDefault();
      localStorage.startTime = f.startTime;
      localStorage.endTime = f.endTime;
      localStorage.minAttenders = f.minAttenders;
      localStorage.maxAttenders = f.maxAttenders;
    }
  });
}

//loads events from localStorage
function loadFiltersInLocalStorage(){
  var f = {};
  f.startTime = new Date(localStorage.startTime);
  f.endTime = new Date(localStorage.endTime);
  f.minAttenders = localStorage.minAttenders;
  f.maxAttenders = localStorage.maxAttenders;
  return f;
}

//Makes loaded filters from localStorage active
 function setLoadedFilters(lf){
   if(isNaN(lf.startTime.getDate()) === false ) {
     filters.startTime = lf.startTime;
   }
   if(isNaN(lf.endTime.getDate()) === false) {
     filters.endTime = lf.endTime;
   }
   if(lf.minAttenders !== null && lf.minAttenders && lf.minAttenders != undefined) {
     filters.minAttenders = lf.minAttenders;
   }
   if(lf.maxAttenders !== null && lf.maxAttenders && lf.maxAttenders != undefined) {
     filters.maxAttenders = lf.maxAttenders;
   }
 };

//open filters
jQuery(function($)
{
    $(".hamburger").click(function()
    {
        $(".navigation").toggleClass("open");

    });
});

//init date slider
 $( function() {
    console.log(filters.startTime.getDay());
    console.log(filters.endTime.getDay());
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 7,
      values: [ filters.startTime.getDay(),filters.endTime.getDay()],
      slide: function( event, ui ) {
          var handles = $("#slider-range > span");
          handles[0].innerHTML = ui.values[0];
          handles[1].innerHTML = ui.values[1];
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
    var handles = $("#slider-range > span");
    handles[0].innerHTML = 0;
    handles[1].innerHTML = 1;
  });

//init attending slider
 $( function() {
   console.log(filters);
    $( "#slider-range_1" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ filters.minAttenders, filters.maxAttenders],
      slide: function( event, ui ) {
          var handles = $("#slider-range_1 > span");
          handles[0].innerHTML = ui.values[0];
          handles[1].innerHTML = ui.values[1];
          updateFilter("ATTENDEES", ui.values[0], ui.values[1]);
          hideEvents();
          filterEventsByTime();
          filterEventsByAttenders();
          showEvents();
      }
    });
    var handles = $("#slider-range_1 > span");
    handles[0].innerHTML = filters.minAttenders;
    handles[1].innerHTML = filters.maxAttenders;
  } );

  function updateFilter(type, min, max) {
    if(type === "ATTENDEES") {
      filters.minAttenders = min;
      filters.maxAttenders = max;
    }else if(type === "DATE"){
      filters.startTime = min;
      filters.endTime = max;
    }
  };
