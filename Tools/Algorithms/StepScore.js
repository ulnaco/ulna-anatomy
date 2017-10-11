import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'
import * as T from '../../Tools'

export function StepScore(date, fn) {

  AppleHealthkit.getStepCount({ date: date }, (err: string, results: Object) => {
    if (results) {
      var score = T.Speech.today.steps(results.value)
    }
    fn(T.Speech.today.steps(0))
  })

}
