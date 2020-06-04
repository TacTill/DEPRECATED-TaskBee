/**
 * Executes as many queries as entered credentials. Creates as many sheets as
 * needed to store the data of each entered APIs, executes the query for each
 * API, stores the response on the corresponding sheet and stores the query into
 * the configuration sheet.
 *
 * @param {Object} query - User selected query options.
 * @returns Array containing the sheets and the credentials we wrote data to.
 */
function executeQueriesMultipleSheets(query) {
  // Gets the array containing all the entered API credentials.
  const credentials = getConfigKey("credentials");
  console.log(credentials);
  // Gets the current spreadsheet.
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Creates a sheet per entered API and deletes the other existing ones.
  const sheetsToWriteAndCredentials = _createSheetsToWriteAndDeleteOldSheets(
    spreadsheet
  )(credentials)(query.endpoint);

  // For each sheet to write, executes the query and stores the API response.
  sheetsToWriteAndCredentials.forEach(function(sheetToWriteAndCredential) {
    _executeQueryMultiplesSheets(query)(sheetToWriteAndCredential.sheet)(
      sheetToWriteAndCredential.credential
    );
  });
  // Stores the query done in the config sheet.
  !query.lastQuery && setConfigObject("lastQuery")(query);
  // Returns the array with the sheets we wrote data to and their credentials.
  return sheetsToWriteAndCredentials;
}

/**
 * Executes as many queries as entered credentials. Creates an only sheet to
 * store the data of each entered APIs, executes the query for each API, stores
 * the responses on the sheet by concatenating all the API results, and stores
 * the query into the configuration sheet.
 *
 * @param {Object} query - User selected query options.
 * @returns Sheets we wrote data to.
 */
function executeQueriesOneSheet(query) {
  // Gets the array containing all the entered API credentials.
  const credentials = getConfigKey("credentials");
  // Gets the current spreadsheet.
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Removes the sheets we don't need.
  _deleteOldSheets(spreadsheet);
  // Gets the sheet where to store the conatenated API results.
  const sheet = spreadsheet.getActiveSheet();

  // Sets the sheet's name according to the queried endpoint.
  sheet.setName(query.endpoint + "s");
  _executeQueryOneSheet(query)(sheet)(credentials);
  // Stores the query done in the config sheet.
  !query.lastQuery && setConfigObject("lastQuery")(query);
  // Returns the array with the sheets we wrote data to and their credentials.
  return sheet;
}

/**
 * Deletes the old sheets within the spreadsheet and creates a new sheet per
 * entered API credential.
 *
 * @param {Spreadsheet} spreadsheet - The current spreadsheet object.
 * @param {Array} credentials - All the entered API credentials.
 * @param {String} endpoint - Name of the queried endpoint.
 * @returns Array containing the sheets and the corresponding credentials.
 */
function _createSheetsToWriteAndDeleteOldSheets(spreadsheet) {
  return function(credentials) {
    return function(endpoint) {
      // Deletes the old sheets.
      _deleteOldSheets(spreadsheet);
      // Returns the new sheets and their credentials.
      return _createSheetsToWrite(spreadsheet)(credentials)(endpoint);
    };
  };
}

/**
 * Creates one sheet per API subdomain to store the API response. It names them
 * according to the API subdomain and the queried endpoint. Builds an array
 * containing an object per API subdomain, with the sheet object and the
 * credential object of the API subdomain. Deletes the previous current sheet,
 * as we want to only have these sheets visible.
 *
 * @param {Spreadsheet} spreadsheet - The current spreadsheet object.
 * @param {Array} credentials - All the entered API credentials.
 * @param {String} endpoint - Name of the queried endpoint.
 * @returns Array containing a sheet and its credential per API subdomain.
 */
function _createSheetsToWrite(spreadsheet) {
  return function(credentials) {
    return function(endpoint) {
      // Keeps the old sheet to delete it after creating the needed ones.
      const oldSheet = spreadsheet.getActiveSheet();
      // Builds the sheets array by reducing the credentials array.
      const sheets = credentials.reduce(function(acc, credential) {
        // Pushs an object per API subdomain, with the sheet and the credential.
        return acc.concat([
          {
            sheet: spreadsheet
              .insertSheet()
              // Sets the sheet name according to the API to recognize it.
              .setName(
                credential.subdomain +
                  endpoint.charAt(0).toUpperCase() +
                  endpoint.slice(1) +
                  "s"
              ),
            credential: credential
          }
        ]);
      }, []);
      // Deletes the old current sheet to only have the needed sheets.
      spreadsheet.deleteSheet(oldSheet);
      // Returns the sheets to write.
      return sheets;
    };
  };
}

/**
 * Deletes all the old sheets on the spreadsheet to only see the ones we need.
 * Keeps the hidden configuration sheet, and one visible sheet, because Google
 * Sheets does not allow us to delete all visible sheets.
 *
 * @param {Spreadsheet} spreadsheet - The current spreadsheet object.
 * @returns
 */
function _deleteOldSheets(spreadsheet) {
  // Gets the array containing all the current spreadsheet's sheets
  const sheets = spreadsheet.getSheets();
  // Creates the active sheet we will keep.
  const activeSheet = spreadsheet.insertSheet();
  // Sets this visible sheet as the current sheet.
  spreadsheet.setActiveSheet(activeSheet);

  // Deletes all sheets except the config sheet and the active sheet.
  sheets.map(function(sheet) {
    return sheet.getName() !== DEFAULTCONFIG().configSheetName
      ? spreadsheet.deleteSheet(sheet)
      : null;
  });
  // Returns the active sheet object.
  return activeSheet;
}

/**
 * Query functions.
 */

/**
 * Executes the given query on the given sheet with the given credentials.
 * Gets the API response for the query endpoint, formats the dates and prices,
 * writes the formatted response to the given sheet, and returns the response.
 *
 * @param {Object} query - User selected query options.
 * @param {Sheet} sheet - The sheet to write the API response to.
 * @param {Object} credential - The wanted API credential object.
 * @returns The formatted API response.
 */
function _executeQueryMultiplesSheets(query) {
  return function(sheet) {
    return function(credential) {
      // Gets the objects from the API depending on the query.
      const response = _getFilteredEndpointObjects(credential)(query.endpoint)(
        query.filters
      );
      // Formats dates and prices on the API response.
      const formattedResponse = formatResponseDatesAndPricesOnObjects(response)(
        query.attributes
      );

      // Writes the formatted response on the given sheet.
      formattedResponse
        ? writeObjectsOnSheet(sheet, formattedResponse, {
            keys: query.attributes.map(function(attribute) {
              return attribute.name;
            })
          })
        : userMessage("queryFailure");
      // Returns the formatted response.
      return formattedResponse;
    };
  };
}

/**
 * Executes the given query on the given sheet with the given credentials.
 * Gets the API response for the query endpoint, formats the dates and prices,
 * writes the formatted response to the given sheet (with the origin of the data
 * added to the written keys), and returns the response.
 *
 * @param {Object} query - User selected query options.
 * @param {Sheet} sheet - The sheet to write the API response to.
 * @param {Array} credentials - API credentials to retrieve.
 * @returns The formatted API response.
 */
function _executeQueryOneSheet(query) {
  return function(sheet) {
    return function(credentials) {
      // Gets the objects from the API depending on the query.
      const response = credentials.reduce(function(acc, credential) {
        return acc.concat(
          _getFilteredEndpointObjects(credential)(query.endpoint)(
            query.filters
          ).map(function(object) {
            object.origin = credential.subdomain;
            return object;
          })
        );
      }, []);
      // Formats dates and prices on the API response.
      const formattedResponse = formatResponseDatesAndPricesOnObjects(response)(
        query.attributes
      );

      // Writes the formatted response on the given sheet.
      formattedResponse
        ? writeObjectsOnSheet(sheet, formattedResponse, {
            keys: query.attributes
              .map(function(attribute) {
                return attribute.name;
              })
              // Adds the field origin to the written keys.
              .concat(["origin"])
          })
        : userMessage("queryFailure");
      // Returns the formatted response.
      return formattedResponse;
    };
  };
}

/**
 * API get function.
 */

/**
 * Gets the API response object, depending on the given endpoint and the given
 * filters. Builds the query string before sending it to the API requester.
 *
 * @param {Object} credential - The wanted API credential object.
 * @param {String} endpoint - The requested endpoint.
 * @param {Object} filters - Filters object to build the URL query parameters.
 * @returns API response object.
 */
function _getFilteredEndpointObjects(credential) {
  return function(endpoint) {
    return function(filters) {
      // Gets the API response object, with the query string.
      return getObjectsFromChargebee(endpoint)(credential)(
        _getQueryParametersFromFilters(filters)
      );
    };
  };
}

/**
 * Formatting functions (timestamps and prices).
 * The ORM does not format the dates if we don't turn the timestamps into
 * instances of Date. There are 2 options, either transform them into Date
 * objects or into date strings.
 */

/**
 * Formats the API response object to turn the prices and the dates into human
 * readable values. Returns a new object with all in_cents and timestamp fields
 * formatted.
 *
 * @param {Array} objects - The API response object array.
 * @param {Object} attributes - The selected attributes from the query.
 * @returns A new object with formatted dates and prices.
 */
function formatResponseDatesAndPricesOnObjects(objects) {
  return function(attributes) {
    return _formatResponsePricesOnObjects(
      _formatResponseDatesOnObjects(objects)(attributes)(0)
    )(attributes)(0);
  };
}

/**
 * Formats the prices (in_cents fields) on the API response object. It uses a
 * recursion to stay functional (which explains the need of an iterator).
 * This function call itself until the iterator goes out of the range of the
 * attributes array. If the current attributes field is an in_cents data type,
 * we format all the API response objects to see the value in euros instead.
 *
 * @param {Array} objects - The API response objects array.
 * @param {Array} attributes - The selected attributes from the query.
 * @param {number} iterator - The iterator needed to go through the attributes.
 * @returns The API response objects array with formatted in_cents fields.
 */
function _formatResponsePricesOnObjects(objects) {
  return function(attributes) {
    return function(iterator) {
      // If we are at the end of the attributes array, we break the recursion.
      if (iterator >= attributes.length) {
        return objects;
      }
      // If the current attribute is an in_cents data type.
      return attributes[iterator] && attributes[iterator].type === "in_cents"
        ? // Formats the values of that attribute on the API response objects.
          _formatResponsePricesOnObjects(
            _formatResponsePricesOnObjectByAttribute(objects)(
              attributes[iterator].name
            )
          )(attributes)(iterator + 1)
        : // Else, calls itself with iterator + 1 to check the next attribute.
          _formatResponsePricesOnObjects(objects)(attributes)(iterator + 1);
    };
  };
}

/**
 * Formats the in_cents value matching with the attributeKey on each API
 * response object.
 *
 * @param {Array} objects - The API response objects array.
 * @param {String} attributeKey - The key of the attribute we want to format.
 * @returns The API response objects array formatted on the attributeKey fields.
 */
function _formatResponsePricesOnObjectByAttribute(objects) {
  return function(attributeKey) {
    // Formats the attributeKey in_cents value on each API response object.
    return objects.map(function(object) {
      object[attributeKey] = object[attributeKey]
        ? (object[attributeKey] / 100).toFixed(2)
        : object[attributeKey];
      return object;
    });
  };
}

/**
 * Formats the dates (timestamp fields) on the API response object. It uses a
 * recursion to stay functional (which explains the need of an iterator).
 * This function call itself until the iterator goes out of the range of the
 * attributes array. If the current attributes field is a timestamp data type,
 * we format all the API response objects to see the value in date string
 * instead.
 *
 * @param {Array} objects - The API response objects array.
 * @param {Array} attributes - The selected attributes from the query.
 * @param {number} iterator - The iterator needed to go through the attributes.
 * @returns The API response objects array with formatted timestamp fields.
 */
function _formatResponseDatesOnObjects(objects) {
  return function(attributes) {
    return function(iterator) {
      // If we are at the end of the attributes array, we break the recursion.
      if (iterator >= attributes.length) {
        return objects;
      }
      // If the current attribute is a timestamp data type.
      return attributes[iterator] && attributes[iterator].type === "timestamp"
        ? // Formats the values of that attribute on the API response objects.
          _formatResponseDatesOnObjects(
            _formatResponseDatesOnObjectByAttribute(objects)(
              attributes[iterator].name
            )
          )(attributes)(iterator + 1)
        : // Else, calls itself with iterator + 1 to check the next attribute.
          _formatResponseDatesOnObjects(objects)(attributes)(iterator + 1);
    };
  };
}

/**
 * Formats the timestamp value matching with the attributeKey on each API
 * response object.
 *
 * @param {Array} objects - The API response objects array.
 * @param {String} attributeKey - The key of the attribute we want to format.
 * @returns The API response objects array formatted on the attributeKey fields.
 */
function _formatResponseDatesOnObjectByAttribute(objects) {
  return function(attributeKey) {
    // Formats the attributeKey timestamp value on each API response object.
    return objects.map(function(object) {
      object[attributeKey] = object[attributeKey]
        ? new Date(object[attributeKey] * 1000).toDateString()
        : object[attributeKey];
      return object;
    });
  };
}