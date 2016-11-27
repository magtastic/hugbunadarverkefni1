//Globals!
var allEvents = [];
var shownEvents = [];
var filters = {
    startTime: new Date(),
    endTime: new Date(),
    minAttenders: 0,
    maxAttenders: 500
};

//When the site loads we filters
//get all events from the location 
//and filter them out acording to
//the filters option.
$(document).ready(function(){
    var events = $('.hidden-info');
    events.each(getJsonFromHTML);
    saveFiltersInLocalStorage(filters); //only saved on search submit
    var loadedFilters = loadFiltersInLocalStorage();
    setLoadedFilters(loadedFilters);
    filterEventsByTime();
    filterEventsByAttenders();
    showEvents();
});

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
    if(filters.startTime.valueOf() == filters.endTime.valueOf()){
        filters.endTime.setDate(filters.endTime.getDate()+1);
    }
    shownEvents=[];
    var tmpStartDate = "";
    var tmpEndDate= "";

    for(var event in allEvents){
       if(allEvents[event].startTime != null
         && typeof allEvents[event].startTime.length === 'function') {
        allEvents[event].startTime = convertFacebookDateToJavaScriptDate(allEvents[event].startTime);
       }
       if(allEvents[event].endTime != null
         && typeof allEvents[event].endTime.length === 'function') {
         allEvents[event].endTime = convertFacebookDateToJavaScriptDate(allEvents[event].endTime);
       }
        tmpStartDate = new Date(allEvents[event].startTime);
        tmpEndDate = new Date(allEvents[event].endTime);
        if(tmpStartDate < filters.endTime && tmpEndDate > filters.startTime && !eventIsInArray(shownEvents, allEvents[event].id)){
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
    if(facebookDate == null || !facebookDate || facebookDate == undefined){
        return false;
    };
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
  const theForm = $('.inputbox');
  const inputBox = $(theForm.find('input'));
  inputBox.keypress((e) => {
    const enterKeycode = 13;
    if(e.keyCode === enterKeycode) {
      e.preventDefault();
      localStorage.startTime = f.startTime;
      localStorage.endTime = f.endTime;
      localStorage.minAttenders = f.minAttenders;
      localStorage.maxAttenders = f.maxAttenders;
    }
  })
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
   if(lf.minAttenders != null) {
     filters.minAttenders = lf.minAttenders;
   }
   if(lf.maxAttenders != null) {
     filters.maxAttenders = lf.maxAttenders;
   }
 }
