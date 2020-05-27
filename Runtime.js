    // TODO RUDY : [prio basse] Améliorer cette partie -> functor ?

function foo(){
  const result = CONTROLLER().run ('invoice') ('collect')
  console.log(result)
}

function RUNTIME(process){
  SHEET_LOG({type:'log',origin:'RUNTIME',body:'starts runtime'})(null)
  
  const getProcessSheet = (process) => (label) =>
    SpreadsheetApp.getActive().getSheetByName(process.uiLabel+" "+label) 
    || writeObjectsOnSheet (SpreadsheetApp.getActive().insertSheet(process.uiLabel+" "+label))
    (process.params) ()
    
    // TODO : Factoriser à partir d'ici
    console.log(process)
    console.log(process.funct)
    const inputs = _binaryFilterArray(process.validate.input) (readObjectsFromSheet(getProcessSheet (process) ("INPUT")))
    console.log(inputs);
    console.log(inputs.yes.map(process.funct(process)));
    
    const outputs = inputs.yes.length > 0 ? 
      _binaryFilterArray ((e) => !e.step) (inputs.yes.map(process.funct(process)))
    : {yes:[],no:[]}
    const valids = outputs.yes.length > 0 ?
      _binaryFilterArray (process.validate.output) (outputs.yes)
    : {yes:[],no:[]}
    const errors = outputs.no.concat(valids.no)
                                            
    return SHEET_LOG({type:'log',origin:'RUNTIME',body:'ends runtime'})
    ( inputs.yes.length > 0 ? 
      {
        success: writeObjectsOnSheet (getProcessSheet (process) ("OUTPUT")) 
                  (valids.yes.length > 0 ? 
                    valids.yes 
                   : [{error:"Sorry. Your action didn't succeed. \nConsult ERRORS for more details."}]) 
                  (),
        errors : errors.length > 0 ? 
                   writeObjectsOnSheet (getProcessSheet (process) ("ERRORS")) 
                   (errors) ({keys:['id','step','log']})  
                 : null
      }
      : SHEET_LOG({type:'error',origin:'RUNTIME',body:'no valid input object'})(null) )
}

function _getProcessSheet(process) {
  return function (label) {
    return SpreadsheetApp.getActive().getSheetByName(process.uiLabel+" "+label) 
    || writeObjectsOnSheet (SpreadsheetApp.getActive().insertSheet(process.uiLabel+" "+label))
    (process.template) ()
  }
}

function _binaryFilterArray(filter) {
  return function (array) {
    return array.reduce(
      (acc,e) => {
        acc[filter(e) ? 'yes' : 'no'] = acc[filter(e) ? 'yes' : 'no'].concat({...e})
        return acc 
      },{yes:[],no:[]}
    )
  }
}



