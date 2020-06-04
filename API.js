const _BASIC_AUTH = (service = '[SERVICE]', endpoint = '[API_ENDPOINT]', user = '[USER]', token = '[TOKEN]') => {
  return {
    api_name: service,
    api_endpoint: endpoint,
    api_user: user,
    api_token: token
  }
}

function CHARGEBEE_API() {
  return {
    AUTH: function (spreadsheet = SpreadsheetApp.getActive()) {
    const authSheet = spreadsheet.getSheetByName('SYS_auth') 
    || writeObjectsOnSheet (spreadsheet.insertSheet('SYS_auth')) ([_BASIC_AUTH('CHARGEBE')]) ()
    return readObjectsFromSheet(authSheet)[0] 
  },
    TEST_AUTH: function (credentials = CHARGEBEE_API().AUTH()) {
      return CHARGEBEE_API().GET(credentials)('invoice')('limit=1')(true).length > 0
    },
      GET:  function (credentials = CHARGEBEE_API().AUTH()) { 
        return  function (object = 'TEST') { 
          return  function (params = null) {
            return  function (muteHttpExceptions = true) { 
              // /_!_\ MUTATIONS
              let result = new Array()
              let offset = null
              // If the user limits its result from query params. Will return limit at least 
              const limit =  params 
              ? 
                  ( Array.isArray(params.match(/limit=[0-9]+/)) 
                   ? params.match(/limit=[0-9]+/).reduce(function(acc, e){
                     acc = Array.isArray(e.match(/[0-9]+/)) ? e.match(/[0-9]+/)[0] : null
                     return acc
                   },null) 
                   : null )
              : null
              const url   = 'https://' + credentials.api_endpoint+object+'s?' + params || ''

              do {
                let header   =  _getChargebeeHeader('GET')(credentials)(null)(muteHttpExceptions)
                let response = JSON.parse(
                  UrlFetchApp.fetch(url + (offset ? '&offset='+encodeURIComponent(offset) : '')
                ,header).getContentText())
                
                offset = response.next_offset || null
                
                // If the response is an array (aka request is valid)
                Array.isArray(response.list) ? 
                  // For each element in response
                  response.list.forEach(function (element) {
                    result.push(element[object] || element )
                  })
                : null
                Utilities.sleep(200)
              } while (offset && (limit ? (result.length < limit) : false))
              // If the result is empty, we return an error value instead
              return result.length > 0 ? 
                result 
              :SHEET_LOG ({type:'error',origin:'CHARGEBEE_API.GET()', body:'invalid GET @'+url}) (result)
            }
          }
        }
      },
        POST:  function (credential = CHARGEBEE_API().AUTH()) {
          return  function (object) {
            return  function (action) {
              try{
                const objcp = {...object};
                const urlencoded = toUrlEncoded("?", objcp);

                /* Check if the object already exists in Chargebee */
                const exists = CHARGEBEE_API().GET(credential) (object.object) ("?id[is]="+object.id) () [0]
                /* if it does, we access the object before writing it */
                const url    = 'https://'+credential.api_endpoint+object.object+'s'
                + (exists ? "/"+object.id+"/"+( action || "") : "")+(urlencoded||"");
                console.log("url", url);
                console.log("object", object);
                const header = _getChargebeeHeader("POST") (credential) (object) ()
                /* If an object attribute can't be updated, Chargebee throw an error. We delete the faulty attribute then try to repost the object */
                do{
                  var  response = JSON.parse(UrlFetchApp.fetch(url, header).getContentText())
                  console.log("response", response);
                  delete object[response.param || null]
                }while(!response[object.object] && 
                       (response.error_code === "param_should_not_be_sent" || response.error_code === "param_should_not_be_blank") );
                /* The updated object is returned or null if tthe API doesn't return an object */
                const result = {}
                
                
                return !response.error_code ? response
                : SHEET_LOG({type:'error',origin:"CHARGEBEE_API>POST", body:response})
                ({step: 'post_error', log: response.message, ...object})
              } catch(e) {
                console.error(e);
              }
            }
          }
        },
        POST_NO_TARGET:  function (credential = CHARGEBEE_API().AUTH()) {
          return  function (object) {
            return  function (action) {
              try{

                const objcp = {...object};
                const urlencoded = toUrlEncoded("?", objcp);

                const url    = 'https://'+credential.api_endpoint+object.object+(action||"")+(urlencoded||"");
                console.log("url", url);
                console.log("object", object);
                const header = _getChargebeeHeader("POST") (credential) (object) ()
                /* If an object attribute can't be updated, Chargebee throw an error. We delete the faulty attribute then try to repost the object */
                do{
                  var  response = JSON.parse(UrlFetchApp.fetch(url, header).getContentText())
                  console.log(response);
                  delete object[response.param || null]
                }while(!response[object.object] && 
                       (response.error_code === "param_should_not_be_sent" || response.error_code === "param_should_not_be_blank") );
                /* The updated object is returned or null if tthe API doesn't return an object */
                const result = {}
                
                
                return !response.error_code ? response
                : SHEET_LOG({type:'error',origin:"CHARGEBEE_API>POST", body:response})
                ({step: 'post_error', log: response.message, ...object})
              } catch(e) {
                console.error(e);
              }
            }
          }
        },
    }
}


function toUrlEncoded(old, objs) {
  if (Object.keys(objs).length <= 0) 
    return old.slice(0, old.length-1);

  if (Object.keys(objs)[0].includes("[")) 
    old = old.concat(Object.keys(objs)[0] + '=' + objs[Object.keys(objs)[0]] + '&');
  

  delete objs[Object.keys(objs)[0]];

  return toUrlEncoded(old, objs);
}


/** 
* Prepare the HTTP request that will be send to Chargebee's API
*
* @param  {String} method   - The desired method (i.e. GET, POST, UPDATE)
* @param  {String} credentials    - Chargebee's API token
* @param  {String} payload  - The data attached to the request. Represented as stringified JSON
* @param  {Bool}   verbose  - verbose mode - muteHttpExceptions

* @return {Request}           A request header ready to be sent
*/
function _getChargebeeHeader (method = 'GET') { 
  return function (credential = CHARGEBEE()._AUTH()) {
    return function (payload = null) {
      return function (muteHttpExceptions = true) {
        return {
          "method": method,
          "muteHttpExceptions" : muteHttpExceptions,
          "headers": {
            "Authorization" : "Basic "
            + Utilities.base64Encode(credential.api_user + ':' + credential.api_token || ''),
          },
          "Content-Type" : "application/x-www-form-urlencoded",
          "payload": payload    
        }
      }
    }
  }
}

