
const holidayURL = 'https://zsasuut2rd.execute-api.eu-central-1.amazonaws.com/prod/'


export const appConfig = {
  REGION: 'eu-central-1',
  USER_POOL_ID: 'eu-central-1_3f9vScFzJ',
  APP_CLIENT_ID: '2rpgpb9uedhsa6b28uj3ellih7',
  api: {
    baseURL: holidayURL,
    holidayURL: `${holidayURL}holidays`
  } 

}


export const states: Map<string, string> = new Map<string, string> ([
  ["BW", "Baden-Württemberg"], ["BY", "Bayern"], ["BE", "Berlin"], ["BB", "Brandenburg"], ["HB", "Bremen"], 
  ["HH", "Hamburg"], ["HE", "Hessen"], ["MV", "Mecklenburg-Vorpommern"], ["NI", "Niedersachsen"], 
  ["NW", "Nordrhein-Westfalen"], ["RP", "Rheinland-Pfalz"], ["SL", "Saarland"], ["SN", "Sachsen"], 
  ["ST", "Sachsen-Anhalt"], ["SH", "Schleswig-Holstein"], ["TH", "Thüringen"]
])

export const vacationNames = ['Winterferien', 'Osterferien', 'Pfingstferien', 'Sommerferien', 
                          'Herbstferien', 'Weihnachtsferien']