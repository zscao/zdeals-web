import moment from 'moment'

// data structure:
// [
//   {
//     date: 'YYYY-MM-DDTHH:mm:ss',
//     price: 20.0,
//   } 
// ]
export function buildDataModel(data = []) {

  if(data.length === 0) return {};

  // find min and max price
  const priceSeries = getPriceSeries(data);
  const minMaxPrice = getMinMaxPrice(priceSeries.series);

  return {
    ...minMaxPrice,
    ...priceSeries
  }
} 

function getMinMaxPrice(data) {
  // find min and max price
  let minPrice = data[0];
  let maxPrice = data[0];

  data.forEach(p => {
    if(p.price < minPrice.price) minPrice = p;
    if(p.price >= maxPrice.price) maxPrice = p;
  })

  // make a copy
  return {
    minPrice,
    maxPrice
  }
}

function getPriceSeries(data) {

  const startDate = moment(data[0].date);
  const endDate = moment(data[data.length - 1].date);

  // console.log('days diff: ', totalDays);

  let current = {
    date: formatDate(data[0].date),
    price: data[0].price,
    serialNumber: 0,
  }

  const series = [current];

  for(let i=1; i<data.length; i++) {

    const date = data[i].date;
    const serialNumber = moment(date).diff(startDate, 'days');
    const dateFormatted = formatDate(date);

    if(data[i].price !== current.price) {
      series.push({
        date: dateFormatted,
        price: current.price,
        serialNumber
      });
    }
    current = {
      date: dateFormatted,
      price: data[i].price,
      serialNumber,
    }

    series.push(current);
  }

  return {
    series,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };

}

function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}