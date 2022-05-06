function userClicked(userInfo){
  var ss = SpreadsheetApp.openByUrl(ssURL)
  var ws = ss.getSheetByName('Data')

  ws.appendRow([userInfo.businessName, userInfo.email, userInfo.sheet, userInfo.postal, userInfo.shipEst,  new Date()])
  Logger.log(userInfo.firstName + " clicked the button!")
}

function getCost(postal){
  var ss = SpreadsheetApp.openByUrl(ssURL)
  var ws = ss.getSheetByName('Estimates')

  var estimateData = ws.getRange(1,1, ws.getLastRow(), 2).getValues();
  var postalList = estimateData.map(function(r){ return r[0]; });
  var costList = estimateData.map(function(r){ return r[1]; });

  var position = postalList.indexOf(postal);
  if (position > -1){
    return "$"+costList[position].toFixed(2);
  }
  else{
    return "Shipping Estimate Unavailable"
  }
}


function getCalendarBusyDays(){

  var startDate = new Date();
  var endDate = new Date((new Date().setYear(startDate.getFullYear()+1)));

  var calendar = CalendarApp.getCalendarsByName("adam.rocq@gmail.com")[0];
  var events = calendar.getEvents(startDate, endDate)
  var dateArray = events.map(function(e){return e.getStartTime().setHours(0,0,0,0);})
  var uniqueDays = [];
  dateArray.forEach(function(d){
    if(uniqueDays.indexOf(d) === -1){
      uniqueDays.push(d)
    }
  });
  return dateArray
}

function getWords(){
  var ss = SpreadsheetApp.openByUrl(ssURL)
  var ws = ss.getSheetByName('Options')  
  var wordData = ws.getRange(1,3).getDataRegion().getValues();

  var autoComplOptions = {}
  wordData.forEach(function(v){
    autoComplOptions[v[0]] = null;
  });

  return autoComplOptions
}