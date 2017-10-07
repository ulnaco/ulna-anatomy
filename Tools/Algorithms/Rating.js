import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'
import * as T from '../../Tools'

/**
 * Body Measurements Rating and explanations
 */
export function bodyMeasurement(fn) {
  var explanations = []

  // BMI
  bmi((result) => {
    let score = 0;
    var message = T.Speech.range.bmi(result)
    if (result < 18.5) {
      score = 1
      explanations.push({
        type: 'bad',
        text: message,
      })
    }
    else if (result > 18.5 && result < 20) {
      score = 3
      explanations.push({
        type: 'ok',
        text: message,
      })
    }
    else if (result > 20 && result < 24.9) {
      score = 5
      explanations.push({
        type: 'good',
        text: message,
      })
    }
    else if (result > 25 && result < 26.9) {
      score = 4
      explanations.push({
        type: 'good',
        text: message,
      })
    }
    else if (result > 27 && result < 29.9) {
      score = 2
      explanations.push({
        type: 'bad',
        text: message,
      })
    }
    else {
      score = 0
      explanations.push({
        type: 'bad',
        text: message,
      })
    }

    fn({
      bmi: result,
      score: T.Speech.ratings[score],
      explanations: explanations,
    })
  })

}


/**
 * Activity Measurements Rating and explanations
 */
export function activityMeasurement(fn) {
  var explanations = []

  // Steps
  let stepsOpts = {
    startDate: moment().subtract(7, 'days').toISOString(),
    endDate: moment().toISOString()
  }
  AppleHealthkit.getDailyStepCountSamples(stepsOpts: Object, (err: string, results: Object) => {
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
    if (stepAverage > 10000) {
      fitnessScore = 5
      explanations.push({
        type: 'good',
        text: message,
      })
    }
    else if (stepAverage > 8000 && stepAverage < 10000) {
      fitnessScore = 5
      explanations.push({
        type: 'good',
        text: message,
      })
    }
    else if (stepAverage > 7000 && stepAverage < 8000) {
      fitnessScore = 4
      explanations.push({
        type: 'ok',
        text: message,
      })
    }
    else if (stepAverage > 4000 && stepAverage < 7000) {
      fitnessScore = 3
      explanations.push({
        type: 'bad',
        text: message,
      })
    } else {
      fitnessScore = 0
      explanations.push({
        type: 'bad',
        text: message,
      })
    }

    fn({
      stepAverage: stepAverage,
      score: T.Speech.ratings[fitnessScore],
      explanations: explanations,
    })
  })

}

export function rating(fn) {

  var explanations = []

  // BMI
  new Promise((resolve, reject) => {
    bmi((result) => {
      let score = 0;
      var message = T.Speech.range.bmi(result)
      if (result < 18.5) {
        score = 1
        explanations.push({
          type: 'bad',
          text: message,
        })
      }
      else if (result > 18.5 && result < 20) {
        score = 3
        explanations.push({
          type: 'ok',
          text: message,
        })
      }
      else if (result > 20 && result < 24.9) {
        score = 5
        explanations.push({
          type: 'good',
          text: message,
        })
      }
      else if (result > 25 && result < 26.9) {
        score = 4
        explanations.push({
          type: 'good',
          text: message,
        })
      }
      else if (result > 27 && result < 29.9) {
        score = 2
        explanations.push({
          type: 'bad',
          text: message,
        })
      }
      else {
        score = 0
        explanations.push({
          type: 'bad',
          text: message,
        })
      }
      resolve(score)
    })
  }).then((score) => {

    // Steps
    let stepsOpts = {
      startDate: moment().subtract(7, 'days').toISOString(),
      endDate: moment().toISOString()
    }
    AppleHealthkit.getDailyStepCountSamples(stepsOpts: Object, (err: string, results: Object) => {
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
      if (stepAverage > 10000) {
        fitnessScore = 5
        explanations.push({
          type: 'good',
          text: message,
        })
      }
      else if (stepAverage > 8000 && stepAverage < 10000) {
        fitnessScore = 5
        explanations.push({
          type: 'good',
          text: message,
        })
      }
      else if (stepAverage > 7000 && stepAverage < 8000) {
        fitnessScore = 4
        explanations.push({
          type: 'ok',
          text: message,
        })
      }
      else if (stepAverage > 4000 && stepAverage < 7000) {
        fitnessScore = 3
        explanations.push({
          type: 'bad',
          text: message,
        })
      } else {
        fitnessScore = 1
        explanations.push({
          type: 'bad',
          text: message,
        })
      }

      fn(T.Speech.ratings[ Math.floor((score+fitnessScore)/2) ], explanations, {
        scores: {
          fitness: T.Speech.ratings[fitnessScore],
          weight: T.Speech.ratings[score],
        }
      })

    });
  })
}
