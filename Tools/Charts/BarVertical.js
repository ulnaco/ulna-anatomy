import React, { Component } from 'react';
import { BarChart } from 'react-native-charts'

import * as UI from '../../UI'

export class BarVertical extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <BarChart
        dataSets={[
          {
            fillColor: UI.UIStyleguide.color.primaryLite,
            data: [
              { value: this.props.values[0] },
            ]
          },
          {
            fillColor: UI.UIStyleguide.color.primary,
            data: [
              { value: this.props.values[1] },
            ]
          }
        ]}
        graduation={1}
        horizontal={false}
        showGrid={false}
        barSpacing={5}
        style={{
          height: UI.UIStyleguide.spacing * 10,
          margin: UI.UIStyleguide.spacing,
        }} />
    )
  }
}
