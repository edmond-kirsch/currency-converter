export default function getRecalculatedCurrencies(state, base, value) {
  const copy = {...state};
  const rates = {...state.rates};
  for (let rate in rates) { 
    if (rate !== base) {
      rates[rate] = Math.round((+value * rates[rate] * 10000 / rates[base])) / 10000 ;
    }
  }
  rates[base] = +value;
  copy.rates = rates;
  return copy;
}
