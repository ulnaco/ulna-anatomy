import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'

export function StepScore(date, fn) {

  AppleHealthkit.getStepCount({ date: date }, (err: string, results: Object) => {
    var score = 'Awful. Are you sick? Watch at home?'
    if (results.value > 4000) {
      score = 2
    }
    else if (results.value > 5000) {
      score = 3
    }
    else if (results.value > 8000) {
      score = 4
    }
    else if (results.value > 10000) {
      score = 5
    }

    fn(score)
  })

}
