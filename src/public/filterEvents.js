var allEvents = [];
var shownEvents = [];
var filters = {
    startTime: new Date(),
    endTime: new Date(),
    minAttenders: 0,
    maxAttenders: null
};

$(document).ready(function(){
    var events = $('.hidden-info');
    events.each(getJsonFromHTML);
    saveFiltersInLocalStorage(filters);
    var loadedFilters = loadFiltersInLocalStorage();
    setLoadedFilters(loadedFilters);
    filterEventsByTime();
    filterEventsByAttenders();
    hideEvents();
});

function getJsonFromHTML(){
    var myJson = this.innerHTML.replace("<p>","").replace("</p>","");
    allEvents.push(JSON.parse(myJson));
}

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

function filterEventsByTime(){
    if(filters.startTime.valueOf() == filters.endTime.valueOf()){
        filters.endTime.setDate(filters.endTime.getDate()+1);
    }

    var tmpStartDate = "";
    var tmpEndDate= "";

    for(var event in allEvents){
        allEvents[event].startTime = convertFacebookDateToJavaScriptDate(allEvents[event].startTime);
        allEvents[event].endTime = convertFacebookDateToJavaScriptDate(allEvents[event].endTime);
        tmpStartDate = new Date(allEvents[event].startTime);
        tmpEndDate = new Date(allEvents[event].endTime);
        if(tmpStartDate < filters.endTime && tmpEndDate > filters.startTime && !eventIsInArray(shownEvents, allEvents[event].id)){
            shownEvents.push(allEvents[event]);
        }
    }
}

function eventIsInArray(arr,id){
    for(var check in arr){
        if(arr[check].id == id){
            return true;
        }
    }
    return false;
}

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


function hideEvents(){
    var id = null;
    var element = null;

    for(var att in shownEvents){
        id = shownEvents[att].id;
        element = $("#"+id);
        element.css("display","inline-block");
    }
}

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
      console.log('save filters in LS');
    }
  })
}

function loadFiltersInLocalStorage(){

  var f = {};
  f.startTime = new Date(localStorage.startTime);
  f.endTime = new Date(localStorage.endTime);
  f.minAttenders = localStorage.minAttenders;
  f.maxAttenders = localStorage.maxAttenders;
  return f;
}

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
