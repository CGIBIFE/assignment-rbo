export const parseCSV = (csvString) => {

  const parsedJson = {}
  const rows = csvString.split('\n');
  parsedJson.head = rows[0].split(',').map(item => item.replace(/"/g, ''))
  parsedJson.body = rows.filter((row, index) => {
    if (index !== 0) return row
  }).map(item => {
    const newRow = {}
     item.split(',').map((item, index) => {
      newRow[parsedJson.head[index]] = item.replace(/"/g, '')
    })
    return newRow
  })
  return parsedJson
}
