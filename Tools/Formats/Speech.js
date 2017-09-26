import * as T from '../../Tools'

export const Speech = {
  ui: {
    weight_gain: 'Gain {var} pounds',
    weight_loss: 'Loss {var} pounds'
  },
  range: {
    bmi: (bmi) => {
      if (bmi < 18.5) { // Underweight
        return 'Considered Underweight'
      }
      if (bmi > 20 && bmi < 24.9) {
        return 'Ideal weight range'
      }
      if (bmi > 25 && bmi < 26.9) {
        return 'Perfect weight range'
      }
      if (bmi > 27 && bmi < 29.9) {
        return 'Ideal weight range'
      }
      if (bmi > 29.9) { // Overweight
        return 'Considered Overweight'
      }
    },
    steps: (count) => {
      if (count > 4000) { // Trying
        return 'Recommended you walk +1000 more steps a day'
      }
      else if (count > 5000) { // Average
        return 'Recommended you walk +1000 more steps a day'
      }
      else if (count > 8000) { // Recommended
        return 'Recommended you walk +1000 more steps a day'
      }
      else if (count > 10000) { // Overachiever
        return 'Recommended you walk +1000 more steps a day'
      }
      if (count < 4000) { // No Steps
        return 'Recommended you walk +1000 more steps a day'
      }
    }
  },
  single: {
    steps: (count) => {

      // Create Number
      if (isNaN(count)) {
        count = count.replace(/[^0-9]/g,'');
      }

      if (count > 10000) { // Overachiever
        return 'Truly amazing!'
      }
      if (count > 8000) { // Recommended
        return 'On point with recommended!'
      }
      if (count > 5000) { // Average
        return 'Your Average!!'
      }
      if (count > 4000) { // Trying
        return 'Your below Average!!'
      }
      if (count < 4000) { // No Steps
        var dif = T.thousand(8000 - count)
        return `${dif} below recommended`
      }
    }
  },
  today: {
    steps: (count) => {

      // Create Number
      if (isNaN(count)) {
        count = count.replace(/[^0-9]/g,'');
      }

      if (count > 10000) { // Overachiever
        return 'Truly amazing!'
      }
      if (count > 8000) { // Recommended
        return 'On point with recommended!'
      }
      if (count > 5000) { // Average
        return 'Your Average!!'
      }
      if (count > 4000) { // Trying
        return 'Your below Average!!'
      }
      if (count < 4000) { // No Steps
        var dif = T.thousand(8000 - count)
        return `${dif} setps until recommended`
      }
    }
  }
}
