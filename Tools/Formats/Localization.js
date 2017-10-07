import * as T from '../../Tools'


export function getLocalization(fn) {

  // Set Localization
  T.getStorage('Localization', (results) => {
    const localization = {}

    // Weight
    localization.weight = {
      display: T.Speech.localization.us.weight,
      unit: 'pound',
      placeholder: '160',
    }
    if (results == 'Metric') {
      localization.weight = {
        display: T.Speech.localization.metric.weight,
        unit: 'gram',
        placeholder: '72',
      }
    }

    // Height
    localization.height = {
      display: T.Speech.localization.us.height,
      unit: 'foot',
      placeholder: "6'1"
    }
    if (results == 'Metric') {
      localization.height = {
        display: T.Speech.localization.metric.height,
        unit: 'cm',
        placeholder: '185',
      }
    }

    fn(localization);
  });

}
