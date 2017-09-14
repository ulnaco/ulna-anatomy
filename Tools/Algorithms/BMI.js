import AppleHealthkit from 'rn-apple-healthkit';

export function bmi(num, fn) {

  // Weight (Pounds)
  new Promise((resolve, reject) => {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthkit.getLatestWeight({ unit: 'pound' }: Object, (err: string, results: Object) => {
          if (results) {
            resolve(results.value)
          }
        });
      }
    });
  }).then((weight) => {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthkit.getLatestHeight(null: Object, (err: string, results: Object) => {
          if (results) {
            let height = results.value
            const bmi = ((weight * 703) / Math.pow(height, 2)).toFixed(2);
            fn(bmi)
          }
        });
      }
    });
  })

}
