export default function getRecalculatedCurrencies(originalExchangeInfo, base, value) {
  const copiedExchangeInfo = {...originalExchangeInfo};
  const copiedRates = {...originalExchangeInfo.rates};
  for (let rate in copiedRates) { 
    if (rate !== base) {
      copiedRates[rate] = Math.round((+value * copiedRates[rate] * 10000 / copiedRates[base])) / 10000;
    }
  }

  copiedRates[base] = +value;
  copiedExchangeInfo.rates = copiedRates;
  return copiedExchangeInfo;
}
