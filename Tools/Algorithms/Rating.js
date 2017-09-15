import AppleHealthkit from 'rn-apple-healthkit';

import { bmi } from './BMI'

export function rating(fn) {

  // BMI
  new Promise((resolve, reject) => {
    bmi((result) => {
      let score = 0;
      if (result < 18.5) {
        score = 1
      }
      if (result > 18.5 && result < 20) {
        score = 3
      }
      if (result > 20 && result < 24.9) {
        score = 5
      }
      if (result > 25 && result < 26.9) {
        score = 3
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
    ratings = ['F', 'E', 'D', 'C', 'B', 'A']
    fn(ratings[score])
  })
}
