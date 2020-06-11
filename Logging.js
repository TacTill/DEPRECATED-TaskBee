const _INIT_LOG = () => {
  return {
    timestamp: new Date(Date.now()).toISOString(),
    type:'init', 
    origin:'run',
    body: 'init log sheet',
    user: getEmail()
  }
}

function SHEET_LOG(log) {
  return function (object){
    ( SpreadsheetApp.getActive().getSheetByName('SYS_logs') 
      || writeObjectsOnSheet (SpreadsheetApp.getActive().insertSheet('SYS_logs')) 
      ([_INIT_LOG()]) ( ) )
    .appendRow([new Date(Date.now()).toISOString(), log.type, log.origin, log.body, log.user])
    return object
  }
}