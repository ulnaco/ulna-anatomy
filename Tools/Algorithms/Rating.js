import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'

export function rating(fn) {

  var explanation = []

  // BMI
  new Promise((resolve, reject) => {
    bmi((result) => {
      let score = 0;
      if (result < 18.5) {
        score = 1
        explanation.push({
          type: 'bad',
          text: 'Considered Underweight'
        })
      }
      if (result > 18.5 && result < 20) {
        score = 3
      }
      if (result > 20 && result < 24.9) {
        explanation.push({
          type: 'good',
          text: 'Ideal height to weight ratio'
        })
        score = 5
      }
      if (result > 25 && result < 26.9) {
        score = 4
      }
      if (result > 27 && result < 29.9) {
        score = 2
      }
      if (result > 30) {
        score = 0
      }
      resolve(score)
    })
  }).then((score) => {

    let weightOpts = {
      startDate: moment().subtract(5, 'days').toISOString(),
      endDate: moment().toISOString()
    }
    AppleHealthkit.getDailyStepCountSamples(weightOpts: Object, (err: string, results: Object) => {
      var total = 0
      for (var i = 0; i < results.length; i++) {
        total = Number(results[i].value) + total
      }

      var fitnessScore = 0
      var stepAverage = (total/5)
      if ((total/5) > 4000) {
        fitnessScore = 2
        explanation.push({
          type: 'bad',
          text: 'Recommended you walk +2000 more steps a day'
        })
      }
      if ((total/5) > 5000) {
        fitnessScore = 3
        explanation.push({
          type: 'ok',
          text: 'Recommended you walk +1000 more steps a day'
        })
      }
      if ((total/5) > 8000) {
        fitnessScore = 4
        explanation.push({
          type: 'good',
          text: 'Recommended daily steps on point'
        })
      }
      if ((total/5) > 10000) {
        fitnessScore = 5
        explanation.push({
          type: 'good',
          text: 'Overachiever when it comes to steps'
        })
      }

      if (fitnessScore < 1) {
        explanation.push({
          type: 'bad',
          text: 'Your walking in 10x less than the average'
        })
      }

      console.log(explanation)

      ratings = ['F', 'E', 'D', 'C', 'B', 'A+']
      fn(ratings[ Math.floor((score+fitnessScore)/2) ], explanation)

    });
  })
}
