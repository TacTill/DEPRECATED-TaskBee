
// executed when you open a new sheet
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
  .createMenu('🐝 TaskBee 🐝')
  .addItem('Launch TaskBee', 'showSidebar')
  .addToUi();
}

// executed when the add-on is installed
function onInstall() {
  onOpen();
}

// opens the sidebar with TaskBee in it
function showSidebar() {
  try {if (!CHARGEBEE_API().TEST_AUTH()) {SpreadsheetApp.getUi().alert('your credentials seems invalids'); return switchpage(1);} return switchpage(2);}
  catch (error) {console.error(error); switchpage(1);}
}

// returns the email of the connected person
function getEmail() {
  return Session.getActiveUser().getEmail();
}

// updates the credentials on the sheet and resets TaskBee
function storeAuth(sub, token) {
  switchpage(3);
  const authSheet = SpreadsheetApp.getActive().getSheetByName('SYS_auth');
  if (authSheet) {
    writeObjectsOnSheet(SpreadsheetApp.getActive().getSheetByName('SYS_auth')) ([_BASIC_AUTH('CHARGEBE', token, sub, 'whatever')]) ();
  }
  showSidebar();
  return true;
}

// checks if the data/action corresponds to a post 
function isPOST(D, A) {
  if (RUNTREE(EN_txt)[D].process[A] !== undefined)
    return true;
  return false;
}

// open the input sheet corresponding to the data/action selected
function openinputs(data, action) {
  console.log("hello");
  const inps = _getProcessSheet(RUNTREE(EN_txt)[data].process[action])("INPUT");
  console.log("aurvoir", inps);
}

// validates the request emmitted by the user and starts processing it in the back
function sendReq(selectedData, selectedAction, filters, auth) {

  switchpage(3);
  console.log('+'+selectedData+'+'+selectedAction+'+'+JSON.stringify(CHARGEBEE_API().AUTH())+'+');
  if (isPOST(selectedData, selectedAction))
  {
    try {const resultpost = CONTROLLER().run (selectedData) (selectedAction); console.log(resultpost); switchpage(4); return true}
    catch (err) {console.error(err); SHEET_LOG({type: 'error', origin: 'main', body: err}) (err) ; switchpage(5) ; return false}
  }
  else 
  {
    // const query = createQuery(selectedData, selectedAction, filters);
    const credentials = {subdomain: CHARGEBEE_API().AUTH().api_endpoint, token: CHARGEBEE_API().AUTH().api_user};
    const resultget = getObjectsFromChargebee(selectedData)(credentials)();
    // writeObjectsOnSheet(SpreadsheetApp.getActive().getSheetByName('SYS_auth')) ([resultget]) ();

    console.log(resultget);
  }
}

// ready a querry for a get call
function createQuery(data, action, filters) {
   return {
      lastQuery: false,
      concatenateResults: false,
      endpoint: data,
      attributes: _getSelectedAttributes(),
      filters: _getSelectedFilters()
    };
}

// test the credential on a GET call
function isRequestWithCredentialsWorking(credentialsToTest) {
  // If the Chargebee response is not empty, the credentials are valid.
  return getObjectsFromChargebee("addon")(credentialsToTest)(null).length
  ? true
  : false;
}

// switch the oppened page in the side bar to the one given as argument
function switchpage(newone) {
  const name = 
  newone == 1 ? "auth" : 
  newone == 2 ? "action_filters" :
  newone == 3 ? "loadingScreen" : 
  newone == 4 ? "result" : 
  newone == 5 ? "err" : 
  "auth";

  var html = HtmlService.createHtmlOutputFromFile(name)
  .setHeight(720)
  .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

//triggered by the front to request what are the corresponding options for the whatfor selector
function getOptionsFromBack(whatfor, identifier) {
  var opts;
  if (whatfor.indexOf('data') >= 0) {opts = [...new Set(Object.keys(RUNTREE(EN_txt)) /*.concat(getApiEndpoints())*/)];}
  else if (whatfor.indexOf('actions') >= 0) {opts = [...new Set(postAttributes(whatfor.substring(7))/*.concat(getAttributes(whatfor.substring(7)))*/)];}
  else if (whatfor.indexOf('filter') >= 0) opts = [' ', 'foo', 'bar']; 
  else if (whatfor.indexOf('auths') >= 0) opts = CHARGEBEE_API().AUTH().api_endpoint;
  else {switchpage(2); return false;}

  console.log("opts", opts);
  return [whatfor, identifier, opts];
}

// get the atributes for the posts calls
function postAttributes(data) {
  try
  {
    console.log(data);
    return Object.keys(RUNTREE(EN_txt)[data].process)
  }
  catch (error)
  {
    console.error(error);
    return []
  }

}

// get the atributes for the gets calls
function getAttributes(data) {
  try
  {
    console.log("data" , data);
    const attopts = getAttributesOptions(getApiEndpointObject(data));
    console.log("attopts" , attopts);
    const filtered = attopts.filter(f=>f.type == "list") 
    console.log("filtered" , filtered);
    const mapped = filtered.map(a => a.name);
    console.log("mapped" , mapped);
    return mapped;
  }
  catch (error)
  {
    console.error(error)
    return [];
  } 
}

function getApiJsonData() {
  // Returns the data as an object to manipulate them with the javascript.
  return API_CONFIG().getChargebeeConfig()
}

/**
* Searchs for the API endpoints names and puts them into an array.
*
* @returns {array} An array containing the endpoints's names.
*/
function getApiEndpoints() {
  const json = getApiJsonData();
  const endpoints = [];

  for (i = 0; i < json.endpoint.length; i++) {
    endpoints.push(json.endpoint[i].name);
  }
  return endpoints;
}


/**
* Gets the object corresponding to the given object name inside the API data
* and returns it.
*
* @param {string} objectName   The name of the requested endpoint.
*
* @returns {object}  An object containing the data of the requested endpoint.
*/
function getApiEndpointObject(objectName) {
  const json = getApiJsonData();
  const endpointObject = json.endpoint.find(x => x.name == objectName);

  return endpointObject;
}

/**
* Returns the attributes from the given endpoint object.
*
* @param {object} endpointObject   The endpoint data object.
*
* @returns {array}  An array containing the endpoint attributes.
*/
function getAttributesOptions(endpointObject) {
  return endpointObject.attributes;
}
