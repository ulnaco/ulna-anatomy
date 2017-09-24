import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'

import * as T from '../../Tools'

export function StepScore(date, fn) {

  AppleHealthkit.getStepCount({ date: date }, (err: string, results: Object) => {
    var score = T.Speech.single.steps(results.value)
    fn(score)
  })

}
