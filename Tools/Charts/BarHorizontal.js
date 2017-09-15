import React, { Component } from 'react';
import { BarChart } from 'react-native-charts'
import * as UL from 'ulna-ui'

export class BarHorizontal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <BarChart
        dataSets={[
          {
            fillColor: UL.ULStyleguide.color.primaryLite,
            data: [
              { value: this.props.values[0] },
            ]
          },
          {
            fillColor: UL.ULStyleguide.color.primary,
            data: [
              { value: this.props.values[1] },
            ]
          }
        ]}
        graduation={1}
        horizontal={true}
        showGrid={false}
        barSpacing={5}
        style={{
          height: UL.ULStyleguide.spacing * 10,
          margin: UL.ULStyleguide.spacing,
        }} />
    )
  }
}
