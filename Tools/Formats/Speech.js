import * as T from '../../Tools'

export const Speech = {
  ratings: ['F', 'E', 'D', 'C', 'B', 'A+'],
  onboarding: {
    welcome_title: 'Welcome',
    welcome_sub_title: 'Ulna Anatomy is designed to help people live healthier & happier lives!',
    welcome_button: 'Get Started',
    apple_title: 'Apple Health',
    apple_sub_title: 'Sync your Apple Health data with Ulna Anatomy. Steps, Height, Weight, BMI, Distance Walking + Running, and Date of Birth',
    apple_button_first: 'Connect',
    apple_button: 'Reconnect',
    apple_new_sync: 'Updated Apple Health Support',
    localization_title: 'Localization',
    localization_sub_title: 'Choose a measuring system',
    localization_metric: 'Metric (non-US)',
    localization_imperial: 'Imperial (US)',
  },
  ui: {
    weight_gain: 'Gained Weight',
    weight_loss: 'Loss Weight'
  },
  notification: {
    Halfway: "Halfway to your step goal!",
    Goal: "You reached your step goal!",
  },
  range: {
    bmi: (bmi) => {
      if (bmi < 18.5) { // Underweight
        return 'Considered Underweight'
      }
      if (bmi > 20 && bmi < 24.9) {
        return 'Your BMI is in the ideal range!'
      }
      if (bmi > 25 && bmi < 26.9) {
        return 'Perfect weight range!'
      }
      if (bmi > 27 && bmi < 29.9) {
        return 'Your BMI is in the ideal range!'
      }
      if (bmi > 29.9) { // Overweight
        return 'Considered Overweight'
      }
    },
    steps: (count) => {
      if (count < 1000) { // No Steps
        return '+7,000 steps under average'
      }
      if (count < 2000) { // No Steps
        return '+6,000 steps under average'
      }
      if (count < 3000) { // No Steps
        return '+5,000 steps under average'
      }
      if (count > 4000) { // Trying
        return '+3,000 steps under average'
      }
      else if (count > 5000) { // Average
        return '+2,000 steps under average'
      }
      else if (count > 8000) { // Recommended
        return 'You walk the recommended 8,000 steps a day on average'
      }
      else if (count > 10000) { // Overachiever
        return 'You walk more than the recommended 8,000 steps a day on average'
      }
      if (count < 4000) { // No Steps
        return '+4,000 steps under average'
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
  },
  localization: {
    metric: {
      weight: 'kg',
      height: 'Centimeters',
    },
    us: {
      weight: 'Pounds',
      height: 'Feet',
    }
  }
}
