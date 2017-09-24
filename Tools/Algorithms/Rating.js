import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'

import * as T from '../../Tools'

export function rating(fn) {

  var explanation = []

  // BMI
  new Promise((resolve, reject) => {
    bmi((result) => {
      let score = 0;
      var message = T.Speech.range.bmi(result)
      if (result < 18.5) {
        score = 1
        explanation.push({
          type: 'bad',
          text: message,
          score: 'F'
        })
      }
      else if (result > 18.5 && result < 20) {
        score = 3
      }
      else if (result > 20 && result < 24.9) {
        explanation.push({
          type: 'good',
          text: message,
          score: 'A+'
        })
        score = 5
      }
      else if (result > 25 && result < 26.9) {
        score = 4
      }
      else if (result > 27 && result < 29.9) {
        score = 2
      }
      else {
        score = 0
      }
      resolve(score)
    })
  }).then((score) => {

    let weightOpts = {
      startDate: moment().subtract(30, 'days').toISOString(),
      endDate: moment().toISOString()
    }
    AppleHealthkit.getDailyStepCountSamples(weightOpts: Object, (err: string, results: Object) => {
      var total = 0
      var fitnessScore = 0
      var trendingScore = 0
      for (var i = 0; i < results.length; i++) {
        total = Number(results[i].value) + total
        if (i > (results.length/2)) {
          trendingScore = Number(results[i].value) + trendingScore
        }
      }

      var message = T.Speech.range.steps((total/5))

      trendingScore = (trendingScore/(results.length/2))
      var stepAverage = (total/results.length)
      if ((total/5) > 4000) {
        fitnessScore = 3
        explanation.push({
          type: 'bad',
          text: message,
          score: 'C'
        })
      }
      else if ((total/5) > 7000) {
        fitnessScore = 4
        explanation.push({
          type: 'ok',
          text: message,
          score: 'B'
        })
      }
      else if ((total/5) > 8000) {
        fitnessScore = 5
        explanation.push({
          type: 'good',
          text: message,
          score: 'A'
        })
      }
      else if ((total/5) > 10000) {
        fitnessScore = 5
        explanation.push({
          type: 'good',
          text: message,
          score: 'A+'
        })
      }

      if (fitnessScore < 1) {
        explanation.push({
          type: 'bad',
          text: message,
          score: 'F'
        })
      }

      ratings = ['F', 'E', 'D', 'C', 'B', 'A+']
      fn(ratings[ Math.floor((score+fitnessScore)/2) ], explanation, {
        average_steps: stepAverage,
        trending_steps: trendingScore,
      })

    });
  })
}
