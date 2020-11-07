import moment from 'moment'

export function calculatePriceAxisParams(minPrice, maxPrice, length) {

  const min = Math.floor(minPrice);
  const max = Math.ceil(maxPrice);

  const diff = max - min;

  const result = {
    min,
    max,
    count: diff,
  }

  let lowerBound = 0;
  let upperBound = diff;

  let step = 1;
  let count = diff;
  let margin = 0;
  let scale = 1;

  if(diff > 15) {
  // make the price range with 0 - 100
    const power = Math.ceil(Math.log10(diff));
    scale = Math.pow(10, power - 2);
    const priceRange = Math.ceil(diff / scale);
    upperBound = priceRange;


    margin = 8;

    for(let i=0; i<8; i++) {
      const upper = priceRange + i;
      for(let a = 8; a<=15; a++) {
        if(upper % a === 0 && upper - priceRange < margin) {       
            upperBound = upper;
            margin = upperBound - priceRange
            step = upperBound / a;
            count = a;        
        }
      }
    }
  }
  if(margin <= 0) {
    upperBound += step;
    lowerBound -= step;
    count += 2;
  }
  else if(margin <= step) {
    lowerBound -= step;
    count += 1;
  }
  else {
    upperBound -= step;
    lowerBound -= step;
  }

  // console.log('upper bound, count, step, mode', upperBound, count, step, gap);

  result.max = upperBound * scale + result.min;
  result.min = lowerBound * scale + result.min;
  if(result.min < 0) {
    result.max += -result.min;
    result.min = 0;
  }
  result.count = count;
  result.series = [];

  for(let i=0; i<=result.count; i++) {
    result.series.push({
      value: i * step * scale,
      label: `${result.min + i * step * scale}`
    })
  }

  result.spacing = length / (result.max - result.min);

  // console.log('price params: ', result);

  return result;
}

export function calculateDateAxisParams(startDate, endDate, length) {

  const start = moment(startDate);
  const end = moment(endDate);

  let totalDays = end.diff(start, 'days');
  if(totalDays === 0) totalDays = 1;
  
  const result = {
    totalDays,
    spacing: length / totalDays,
    series: []
  }

  result.series.push({
    serialNumber: 0,
    date: start.format('DD/MM/YYYY')
  })

  // if there is only one day, then we don't show the end date
  if(totalDays === 1) {
    result.series.push({
      serialNumber: 1,
      date: ''
    })
  }
  else {
   let lines = Math.ceil(length / 80);
   let step = Math.floor(totalDays / lines);
   let reminder = totalDays - step * lines;

   if(step < 2 && reminder > 0) {
     if(reminder <= lines * 0.3) {
       lines = totalDays;
       step = 1;
       reminder = 0;
     }
     else {
       lines = Math.floor(totalDays / 2);
       step = 2;
       reminder = totalDays - step * lines;
     }
   } 

   const reminderOnStep = reminder / lines;
    let accumlativeReminder = 0;

    const date = moment(start);
    
    for(let i = 1; i<=lines; i++) {
      accumlativeReminder += reminderOnStep;

      let r = reminder;
      if(i < lines) r = Math.floor(accumlativeReminder);
      if(r >= 1) accumlativeReminder = 0;
      
      reminder -= r;

      date.add(step + r, 'days');
      
      result.series.push({
        serialNumber: date.diff(start, 'days'),
        date: date.format('DD/MM')
      })
    }
  }
  
  // console.log('date params: ', result);

  return result;
}
