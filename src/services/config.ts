
const holidayURL = 'https://zgyqwkz8d9.execute-api.eu-central-1.amazonaws.com/prod/'


export const appConfig = {
  REGION: 'eu-central-1',
  USER_POOL_ID: 'eu-central-1_2AXMltmOr',
  APP_CLIENT_ID: '7a89n6a13df7i12k6iajcjpcbk',
  api: {
    baseURL: holidayURL,
    holidayURL: `${holidayURL}holidays`
  },
  uploadBucketName: 'holiday-upload-0ac6cca0cf34'

}


export const states: Map<string, string> = new Map<string, string> ([
  ["DE_BW", "Baden-Württemberg"], ["DE_BY", "Bayern"], ["DE_BE", "Berlin"], ["DE_BB", "Brandenburg"], ["DE_HB", "Bremen"], 
  ["DE_HH", "Hamburg"], ["DE_HE", "Hessen"], ["DE_MV", "Mecklenburg-Vorpommern"], ["DE_NI", "Niedersachsen"], 
  ["DE_NW", "Nordrhein-Westfalen"], ["DE_RP", "Rheinland-Pfalz"], ["DE_SL", "Saarland"], ["DE_SN", "Sachsen"], 
  ["DE_ST", "Sachsen-Anhalt"], ["DE_SH", "Schleswig-Holstein"], ["DE_TH", "Thüringen"]
])

export const vacationNames = ['Winterferien', 'Osterferien', 'Pfingstferien', 'Sommerferien', 
                          'Herbstferien', 'Weihnachtsferien']