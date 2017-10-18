import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

export function Badges(fn) {
  var status = {
    numberOfTest: 0
  }
  let stepsOverTimeOpts = {
    startDate: moment().subtract(1, 'years').toISOString(),
    endDate: moment().toISOString()
  }
  AppleHealthkit.getDailyStepCountSamples(stepsOverTimeOpts: Object, (err: string, results: Object) => {
    for (var i = 0; i < results.length; i++) {

      // Steps
      if (Number(results[i].value) >  7000) {
        status.steps1 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  8000) {
        status.steps2 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  9000) {
        status.steps3 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  10000) {
        status.steps4 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  20000) {
        status.steps5 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  30000) {
        status.steps6 = moment(results[i].startDate).format('MMM YYYY');
      }
      if (Number(results[i].value) >  40000) {
        status.steps7 = moment(results[i].startDate).format('MMM YYYY');
      }

      // Streaks
      if (i > 0) {
        var before = i-1;
        if (Number(results[i].value) > 8000 && Number(results[before].value) > 8000) {
          status.streak1 = moment(results[i].startDate).format('MMM YYYY');
        }
        if (Number(results[i].value) > 9000 && Number(results[before].value) > 9000) {
          status.streak2 = moment(results[i].startDate).format('MMM YYYY');
        }
        if (Number(results[i].value) > 10000 && Number(results[before].value) > 10000) {
          status.streak3 = moment(results[i].startDate).format('MMM YYYY');
        }
      }
      if (i > 1) {
        var before = i-1;
        var twodays = before-1;
        if (Number(results[i].value) > 8000 && Number(results[before].value) > 8000 && Number(results[twodays].value) > 8000) {
          status.streak4 = moment(results[i].startDate).format('MMM YYYY');
        }
        if (Number(results[i].value) > 9000 && Number(results[before].value) > 9000 && Number(results[twodays].value) > 9000) {
          status.streak5 = moment(results[i].startDate).format('MMM YYYY');
        }
        if (Number(results[i].value) > 10000 && Number(results[before].value) > 10000 && Number(results[twodays].value) >10000) {
          status.streak6 = moment(results[i].startDate).format('MMM YYYY');
        }
      }

    }
    status.numberOfTest = 13

    status.loading = false

    fn(status)

  });
}
