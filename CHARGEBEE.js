/**
* Get a list of objects from Chargebee's API
* Cette méthode aurait pu être récursive mais on atteint la limite de la stack sur de très grosse requête.
* Cette façon de faire est beaucoup plus safe et n'a encore jamais été mise en défaut
 
* @param   String   object          - The type of object you are requesting from Chargebee (i.e. "addon", "invoice", "customer" ...)
* @param   Object   apiCredentials  - An array containing ["subdomain", "API_key"]
* @option  String   queryParameters - A bunch of parameters you can use to filer Chargebee's API (https://apidocs.chargebee.com/docs/api/#pagination_and_filtering)
* @return  [Object]                 - An array of Objects from Chargebee's API
*/

function getObjectsFromChargebee(object) {
  return function(apiCredentials) {
    return function(queryParameters) {
      // We ask Chargebee's API while there is a next_offset to request
      // We don't use a recursive function because of GAS limitations
      /* We initialize the variables */
      var result = new Array();
      var offset = null;
      /* and start the loop */
      do {
        var url = _getChargebeeUrl(apiCredentials.subdomain)(object)(
          queryParameters
        )(offset);
        var header = _getChargebeeRequest("GET")(apiCredentials.token)(true)(
          null
        );
        var response = JSON.parse(
          UrlFetchApp.fetch(url, header).getContentText()
        );
        offset = response.next_offset || null;
        // For each element in response
        response.list &&
          response.list.forEach(function(element) {
            result.push(element[object] || element);
          });
        Utilities.sleep(200);
      } while (offset);
      return result;
    };
  };
}

/**
 * Prepare the HTTP request that will be send to Chargebee's API
 *
 * @param  {String} method   - The desired method (i.e. GET, POST, UPDATE)
 * @param  {String} token    - Chargebee's API token
 * @param  {String} payload  - The data attached to the request. Represented as stringified JSON
 * @return {Request}           A request object ready to be sent
 */
function _getChargebeeRequest(method) {
  return function(token) {
    return function(verbose) {
      return function(payload) {
        return {
          method: method,
          muteHttpExceptions: verbose,
          headers: {
            Authorization: "Basic " + Utilities.base64Encode(token + ":")
          },
          payload: payload || null
        };
      };
    };
  };
}

/**
 * Build the corresponding Chargebee's URL for given parameters
 *
 * @param  {String} subdomain    Chargebee's subdomain
 * @param  {String} object       Desired Chargebee's API object (i.e. "Addons","Invoices","Customers"...)
 * @param  {String} queryParams  A bunch of parameters you can use to filer Chargebee's API (https://apidocs.chargebee.com/docs/api/#pagination_and_filtering)
 * @return {String}              Valid encoded URL
 */
function _getChargebeeUrl(subdomain) {
  return function(object) {
    return function(queryParams) {
      return function(offset) {
        return (
          "https://" +
          subdomain +
          ".chargebee.com/api/v2/" +
          object +
          "s" +
          "?" +
          (queryParams || "") +
          (offset ? "&offset=" + encodeURIComponent(offset) : "")
        );
      };
    };
  };
}

function _getQueryParametersFromFilters(filters) {
  return filters.map(_getQueryParametersFromFilter).join("&");
}

function _getQueryParametersFromFilter(filter) {
  return (
    filter.attribute +
    "[" +
    filter.operator +
    "]=" +
    (filter.value || _getQueryParametersFromDateRange(filter.dateRange))
  );
}

function _getQueryParametersFromDateRange(dateRange) {
  return (
    "[" +
    Date.parse(dateRange.start || "01/01/1970") / 1000 +
    "," +
    (dateRange.end ? Date.parse(dateRange.end) : Date.now()) / 1000 +
    "]"
  );
}
