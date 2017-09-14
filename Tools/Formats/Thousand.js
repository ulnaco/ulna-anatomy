/**
 * Thousand number format
 * @param  {Number} num "1000"
 * @return "1,000"
 */
export function thousand(num) {
  return num.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
