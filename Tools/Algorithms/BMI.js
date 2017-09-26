import AppleHealthkit from 'rn-apple-healthkit';

export function bmi(fn) {

  new Promise((resolve, reject) => {

    // Weight (Pounds)
    AppleHealthkit.getLatestWeight({ unit: 'pound' }: Object, (err: string, results: Object) => {
      if (results) {
        resolve(results.value)
      }
    });
    
  }).then((weight) => {

    // Height (Inches)
    AppleHealthkit.getLatestHeight(null: Object, (err: string, results: Object) => {
      if (results) {
        let height = results.value
        const bmi = ((weight * 703) / Math.pow(height, 2)).toFixed(2);
        fn(bmi)
      }
    });

  })

}
