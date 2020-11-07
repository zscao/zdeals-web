
import moment from 'moment'

import { buildDataModel } from './DataModel'
import { calculatePriceAxisParams, calculateDateAxisParams } from './helpers'

export function createPriceChart(canvas) {

  // const canvasRect = canvas.getBoundingClientRect();

  // console.log('canvas rect: ', canvasRect);
  // console.log('canvas size: ', canvas.width, canvas.height)

  const gridMargin = {
    left: 50,
    right: 20,
    top: 30,
    bottom: 30
  }
  const gridRect = {
    x: gridMargin.left,
    y: gridMargin.bottom,
    width: canvas.width - gridMargin.left - gridMargin.right,
    height: canvas.height - gridMargin.top - gridMargin.bottom,
    right: canvas.width - gridMargin.right,
    top: canvas.height - gridMargin.top,
  }

  const context = canvas.getContext('2d');
  context.font = "10px sans-serif";
  context.save();

  // console.log('creating price chart...')
  
  function init() {
    // console.log('initing chart...')

    context.restore();
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();

    //context.transform(1, 0, 0, -1, 0, canvas.height);    
    context.translate(0.5, 0.5);
    context.setLineDash([]);
  }


  function drawXAxis(priceParams) {

    context.lineWidth = 0.5;
    context.strokeStyle = "#CCCCCC";    

    context.beginPath();

    // draw lines
    for(let i= 0; i < priceParams.series.length; i ++) {

      const y = flipY(gridRect.y + priceParams.series[i].value * priceParams.spacing);

      context.moveTo(gridRect.x, y);
      context.lineTo(gridRect.right, y);
    }
    context.stroke();

    // draw labels
    for(let i= 0; i < priceParams.series.length; i ++) {

      const y = flipY(gridRect.y + priceParams.series[i].value * priceParams.spacing);

      const priceLabel = (priceParams.series[i].value + priceParams.min).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67;
      context.textAlign = "right";
      context.fillText(priceLabel, gridRect.x - 10, y);
    }    
  }

  function drawYAxis(dateParams) {

    context.lineWidth = 0.5;
    context.strokeStyle = "#CCCCCC";

    // draw lines
    for (let i = 0; i < dateParams.series.length; i++) {
      const day = dateParams.series[i];
      let x = gridRect.x + day.serialNumber * dateParams.spacing;
      context.moveTo(x, gridRect.y);
      context.lineTo(x, gridRect.top);
    }
    context.stroke();

    // draw labels
    for (let i = 0; i < dateParams.series.length; i++) {
      const day = dateParams.series[i];
      let x = gridRect.x + day.serialNumber * dateParams.spacing;

      context.textAlign = "center"
      context.fillText(day.date, x, flipY(gridRect.y - 18));
    }
  }

  function drawPrice(model, priceParams, dateParams) {
    context.lineWidth = 2.0;
    context.strokeStyle = "#63A85E";

    const series = model.series;
    const minPrice = priceParams.min;

    if(!Array.isArray(series) || series.length === 0) return;

    context.beginPath();
    // draw start point
    let y = flipY(gridRect.y + (series[0].price - minPrice) * priceParams.spacing);
    context.moveTo(gridRect.x - 4, y);
    if(series.length === 1) {
      context.lineTo(gridRect.x + gridRect.width, y);
    }
    else {
      model.series.forEach(day => {
        context.lineTo(gridRect.x + day.serialNumber * dateParams.spacing, flipY(gridRect.y + (day.price - minPrice) * priceParams.spacing));
      })
    }
    context.stroke();
  }

  function drawChart(data) {

    const model = buildDataModel(data);
    //console.log('draw chart. Model: ', model);

    const priceAxisParams = calculatePriceAxisParams(model.minPrice.price, model.maxPrice.price, gridRect.height);
    const dateAxisParams = calculateDateAxisParams(model.startDate, model.endDate, gridRect.width);

    init();
    drawXAxis(priceAxisParams);
    drawYAxis(dateAxisParams);
    drawPrice(model, priceAxisParams, dateAxisParams);
  }

  function flipY(y) {
    return canvas.height - y;
  }

  return {
    drawChart
  }

}