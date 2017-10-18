import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

export function Badges(fn) {
  var status = {}
  let stepsOverTimeOpts = {
    startDate: moment().subtract(1, 'years').toISOString(),
    endDate: moment().toISOString()
  }
  AppleHealthkit.getDailyStepCountSamples(stepsOverTimeOpts: Object, (err: string, results: Object) => {
    for (var i = 0; i < results.length; i++) {
      if (Number(results[i].value) >  7000) {
        status.steps1 = true;
      }
      if (Number(results[i].value) >  8000) {
        status.steps2 = true;
      }
      if (Number(results[i].value) >  9000) {
        status.steps3 = true;
      }
      if (Number(results[i].value) >  10000) {
        status.steps4 = true;
      }
    }

    status.loading = false

    fn(status)

  });
}
