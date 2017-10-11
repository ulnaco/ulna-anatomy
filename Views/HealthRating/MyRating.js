import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class MyRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      goodExplanation: [],
      okExplanation: [],
      badExplanation: [],
    };
  }

  componentWillMount() {
    T.Watchdog(this);

    // Localization
    T.getLocalization((results) => {
      this.setState({
        localization: results
      })
      this.Healthkit()
    })

    T.getStorage('Healthkit', (results) => {
      results = JSON.parse(results)
      this.setState({
        Rating: results.Rating,
        Weight: results.Weight,
        BMI: results.BMI,
      })
    });

  }

  Healthkit() {

    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        let stepsOpts = {
          startDate: moment().subtract(7, 'days').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getDailyStepCountSamples(stepsOpts: Object, (err: string, results: Object) => {
          var total = 0
          for (var i = 0; i < results.length; i++) {
            total = Number(results[i].value) + total
          }

          this.setState({
            steps: T.thousand((total/results.length))
          })

        });

        // Health Rating
        T.rating((result, explanation, more) => {
          var goodExplanations = []
          var okExplanations = []
          var badExplanations = []
          for(var i = 0; i < explanation.length; i++) {
            if (explanation[i].type == 'good') {
              goodExplanations.push(<UI.UIListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
            if (explanation[i].type == 'ok') {
              okExplanations.push(<UI.UIListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
            if (explanation[i].type == 'bad') {
              badExplanations.push(<UI.UIListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
          }
          this.setState({
            rating: result,
            goodExplanation: goodExplanations,
            okExplanation: okExplanations,
            badExplanation: badExplanations,
            fitness: more.scores.fitness,
            weight: more.scores.weight
          })
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>
          <View style={{marginBottom: UI.UIStyleguide.spacing}}>
            { this.state.rating && <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontWeight: 'bold', marginBottom: 0, fontSize: 80} ]}>{this.state.Rating}</Text> }
          </View>
          <View style={{marginBottom: UI.UIStyleguide.spacing}}>
            <View style={{marginTop: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="Activity" />
            </View>
            { this.state.fitness && <UI.UIListItem title="Rating" subTitle={this.state.fitness} /> }
            { this.state.steps && <UI.UIListItem title="7 Day Step Average" subTitle={this.state.steps} /> }
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('Steps')
               }}>
               <View style={{marginTop: UI.UIStyleguide.spacing}}>
                <UI.UIButton style="accent" text="Activity Insights" />
              </View>
            </TouchableHighlight>
          </View>
          <View style={{marginBottom: UI.UIStyleguide.spacing}}>
            <View style={{marginTop: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="Body Measurements" />
            </View>
            { this.state.fitness && <UI.UIListItem title="Rating" subTitle={this.state.weight} /> }
            { this.state.Weight && <UI.UIListItem title="Weight" subTitle={this.state.Weight} /> }
            { this.state.BMI && <UI.UIListItem title="BMI" subTitle={this.state.BMI} /> }
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('Weight')
               }}>
               <View style={{marginTop: UI.UIStyleguide.spacing}}>
                <UI.UIButton style="accent" text="Body Measurements" />
              </View>
            </TouchableHighlight>
          </View>
          {this.state.goodExplanation.length > 0 &&
            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="The Good" />
              { this.state.goodExplanation }
            </View>
          }
          {this.state.okExplanation.length > 0 &&
            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="The Ok" />
              { this.state.okExplanation }
            </View>
          }
          {this.state.badExplanation.length > 0 &&
            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="The Bad" />
              { this.state.badExplanation }
            </View>
          }
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Profile')
             }}>
            <View>
              <UI.UIButton style="primary" text="Health Profile" />
            </View>
          </TouchableHighlight>
          <UI.UISpace small={true} />
        </View>
      </ScrollView>
    )
  }
}
