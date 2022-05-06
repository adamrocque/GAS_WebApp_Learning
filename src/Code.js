// Make the spreadsheet URL a global variable
var ssURL = "https://docs.google.com/spreadsheets/d/1zyQfliC7bFU7tT7ZBfpzfK5tEvgLuUj6zys70JhgcQs/edit#gid=0";
var Route = {};

Route.path = function(route, callback){
  Route[route]=callback;
}

function doGet(event){

  Route.path("form", loadForm);
  
  if(Route[event.parameters.v]){
    return Route[event.parameters.v]();
  }
  else{
    return render("home");
  }

  
}

function loadForm(){
  var ss = SpreadsheetApp.openByUrl(ssURL);
  var ws = ss.getSheetByName('Options');

  // This gets all the data in the sheet, starting from A1,
  // getValues shows this table as a 2D array, 1D is each row, 2D is the elements in the Rows
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  
  // We need a 1D array, so we map through the rows taking only the 1st column (0th) values
  // We are also putting that together directly with the HTML that will use those values
  // Finally, we're joining the options together, so there won't be any gaps or [] around elements
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>'; }).join('');

  return render("page", {list:htmlListArray});

}

// Building a render function to take arguments of template file and the arguments to render it with
function render(file, templateArgsObject){
  // Initialize the template
  var webTemplate =  HtmlService.createTemplateFromFile(file);

  // If arguments were passed, get the keys from the arguments
  if (templateArgsObject){
    var keys = Object.keys(templateArgsObject);

    // for each key, our callback function will assign the value of the key to a key within the template
    keys.forEach(function(key){
      webTemplate[key] = templateArgsObject[key]
    });
  } //End If
  return webTemplate.evaluate();

}