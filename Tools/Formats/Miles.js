/**
 * Meters to Miles
 * @param  {Number} num "Meters"
 * @return miles
 */
export function getMiles(num) {
  return (num*0.000621371192).toFixed(2).toLocaleString();
}
