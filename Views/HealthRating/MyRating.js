import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UL from 'ulna-ui'
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
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        let weightOpts = {
          startDate: moment().subtract(5, 'days').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getDailyStepCountSamples(weightOpts: Object, (err: string, results: Object) => {
          var total = 0
          for (var i = 0; i < results.length; i++) {
            total = Number(results[i].value) + total
          }

          this.setState({
            steps: T.thousand((total/5))
          })

        });

        // BMI
        T.bmi((result) => {
          this.setState({
            bmi: result
          })
        })

        // Health Rating
        T.rating((result, explanation) => {
          var goodExplanations = []
          var okExplanations = []
          var badExplanations = []
          for(var i = 0; i < explanation.length; i++) {
            if (explanation[i].type == 'good') {
              goodExplanations.push(<UL.ULListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
            if (explanation[i].type == 'ok') {
              okExplanations.push(<UL.ULListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
            if (explanation[i].type == 'bad') {
              badExplanations.push(<UL.ULListItem key={i} justtext={true} text={explanation[i].text} subText={explanation[i].score} />)
            }
          }
          this.setState({
            rating: result,
            goodExplanation: goodExplanations,
            okExplanation: okExplanations,
            badExplanation: badExplanations,
          })
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            { this.state.rating && <UL.ULListItem title="Health Rating" subTitle={this.state.rating} /> }
          </View>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            { this.state.bmi && <UL.ULListItem title="BMI" subTitle={this.state.bmi} /> }
            { this.state.steps && <UL.ULListItem title="5 Day Step Average" subTitle={this.state.steps} /> }
          </View>
          {this.state.goodExplanation.length > 0 &&
            <View style={{marginBottom: UL.ULStyleguide.spacing}}>
              <UL.ULSubTitle text="The Good" />
              { this.state.goodExplanation }
            </View>
          }
          {this.state.okExplanation.length > 0 &&
            <View style={{marginBottom: UL.ULStyleguide.spacing}}>
              <UL.ULSubTitle text="The Ok" />
              { this.state.okExplanation }
            </View>
          }
          {this.state.badExplanation.length > 0 &&
            <View style={{marginBottom: UL.ULStyleguide.spacing}}>
              <UL.ULSubTitle text="The Bad" />
              { this.state.badExplanation }
            </View>
          }
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.Track('event', 'Button/Health Profile', { view: this.props.navigation.state.routeName })
               const { navigate } = this.props.navigation;
               navigate('Profile')
             }}>
            <View>
              <UL.ULButton style="accent" text="Health Profile" />
            </View>
          </TouchableHighlight>
          <UL.ULSpace small={true} />
        </View>
      </ScrollView>
    )
  }
}
