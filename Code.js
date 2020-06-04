function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
  .createMenu('🐝 TaskBee 🐝')
  .addItem('Launch TaskBee', 'showSidebar')
  .addToUi();
}

function showSidebar() {
  try {CHARGEBEE_API().TEST_AUTH(); switchpage(2)}
  catch (error) {switchpage(1);}
}

function getEmail() {
  return Session.getActiveUser().getEmail();
}

function storeAuth(sub, token) {
  switchpage(3);
  const authSheet = SpreadsheetApp.getActive().getSheetByName('SYS_auth');
  if (authSheet) {
    writeObjectsOnSheet(SpreadsheetApp.getActive().getSheetByName('SYS_auth')) ([_BASIC_AUTH('CHARGEBE', token, sub, 'whatever')]) ();
  }
  showSidebar();
  return true;
}

function isPOST(D, A) {
  if (RUNTREE(EN_txt)[D].process[A] !== undefined)
    return true;
  return false;
}

function sendReq(selectedData, selectedAction, filters, auth) {

  switchpage(3);
  console.log('+'+selectedData+'+'+selectedAction+'+'+JSON.stringify(CHARGEBEE_API().AUTH())+'+');
  if (isPOST(selectedData, selectedAction))
  {
    try {const resultpost = CONTROLLER().run (selectedData) (selectedAction); console.log(resultpost); switchpage(4); return true}
    catch (err) {console.error(err); switchpage(5) ; return false}
  }
  else 
  {
    const credentials = {subdomain: CHARGEBEE_API().AUTH().api_endpoint, token: CHARGEBEE_API().AUTH().api_user};
    const resultget = getObjectsFromChargebee(selectedData)(credentials)();
    writeObjectsOnSheet(SpreadsheetApp.getActive().getSheetByName('SYS_auth')) ([resultget]) ();

    console.log(resultget);
  }
}

function isRequestWithCredentialsWorking(credentialsToTest) {
  // If the Chargebee response is not empty, the credentials are valid.
  return getObjectsFromChargebee("addon")(credentialsToTest)(null).length
  ? true
  : false;
}

function switchpage(newone) {
  const name = 
  newone == 1 ? "auth" : 
  newone == 2 ? "action_filters" :
  newone == 3 ? "loadingScreen" : 
  newone == 4 ? "result" : 
  newone == 5 ? "err" : 
  false;

  var html = HtmlService.createHtmlOutputFromFile(name)
  .setHeight(720)
  .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

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
