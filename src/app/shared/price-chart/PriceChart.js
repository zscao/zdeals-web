import React from 'react'

import { createPriceChart } from './createPriceChart'

const styles = {
  // border: "1px solid #000000"
  border: "none"
}


class PriceChart extends React.Component {

  canvasEl = React.createRef();
  containerEl = React.createRef();

  componentDidMount() {
    const canvas = this.canvasEl.current;
    const container = this.containerEl.current;

    canvas.width = container.clientWidth;

    this.chart = createPriceChart(canvas);
    this.chart.drawChart(this.props.data)
  }

  componentDidUpdate(prevProps) {
    //console.log('drawing chart..');
    if(this.props.data !== prevProps.data) this.chart.drawChart(this.props.data);
  }

  render() {
    //console.log('rendering price chart component..');

    return (
      <div ref={this.containerEl}>
        <canvas ref={this.canvasEl} width={1} height={250} style={styles}></canvas>
      </div>
    )
  }
}

export default PriceChart