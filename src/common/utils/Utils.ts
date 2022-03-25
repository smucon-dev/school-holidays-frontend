
// concert from yyymmmdd to dd.mm.yyyy
export function convertDbDate(dbDate: string) {
  if(!dbDate.match('^[0-9.]{8}$')) {
    throw new Error(`Unxpected date format: ${dbDate} Expected YYYYMMDD.`)
  }

  return `${dbDate.slice(6,8)}.${dbDate.slice(4,6)}.${dbDate.slice(0,4)}`
}

// concert from dd.mm.yyyy to yyymmmdd
export function convertToDbDate(date: string) {
  if(!date.match('^\\d\\d\\.\\d\\d.\\d\\d\\d\\d$')) {
    throw new Error(`Unxpected date format: ${date} Expected dd.mm.yyyy`)
  }

  return `${date.slice(6,10)}${date.slice(3,5)}${date.slice(0,2)}`
}

// create a sort key from start date and end date -> yyyymmdd_yyyymmdd
export function buildSK(startDate: string, endDate: string) {
  return convertToDbDate(startDate) + '_' + convertToDbDate(endDate)
}

// split array into batches
export function createBatches(data: any[], batchSize: number) {

  const numBatches = Math.ceil(data.length / batchSize)
  const batches: any[][] = []
  for (let b = 0; b < numBatches; b++) {
    batches.push(data.slice(b*batchSize, (b+1)*batchSize))
  }

  return batches
}