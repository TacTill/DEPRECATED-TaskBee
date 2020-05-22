const _INIT_LOG = () => {
  return {
  timestamp: new Date(Date.now()).toISOString(),
  type:'init', 
  origin:'run',
  body: 'init log sheet'
}
}

function SHEET_LOG(log) {
  return function (object){
    ( SpreadsheetApp.getActive().getSheetByName('SYS_logs') 
      || ORM.writeObjectsOnSheet (SpreadsheetApp.getActive().insertSheet('SYS_logs')) 
    ([_INIT_LOG()]) ( ) )
    .appendRow([new Date(Date.now()).toISOString(), log.type, log.origin, log.body])
    return object
  }
}

function addAuthToSheet(apiName = 'CHARGEBEE', apiEndpoint = 'yourapiendpointhere', apiUser = 'yourapiuserhere', apiToken = 'yourapitokenhere') {
 SpreadsheetApp.getActive().getSheetByName('SYS_auth').appendRow([apiName, apiEndpoint, apiUser, apiToken]);
 // ORM.writeObjectsOnSheet (spreadsheet.insertSheet('SYS_auth')) ([apiName, apiEndpoint, apiUser, apiToken]) ()
}