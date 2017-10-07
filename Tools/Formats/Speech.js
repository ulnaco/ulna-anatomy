import * as T from '../../Tools'

export const Speech = {
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
    weight_gain: 'Gain {var} pounds',
    weight_loss: 'Loss {var} pounds'
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
  },
}
