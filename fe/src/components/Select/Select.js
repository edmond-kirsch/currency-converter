import CURRENCIES from "../../utils/currencies";
import './Select.css';

export default function Select({ viewedCurrencies, setViewedCurrencies, setIsSelect }) {
  const addCurrency = newCurrencyBase => {
    setViewedCurrencies(prevState => [...prevState, newCurrencyBase]);
    setIsSelect(false);
  }

  return (
    <div className="select-container">
      {CURRENCIES.filter(currencyItem => !viewedCurrencies.includes(currencyItem.abbr)).map(currencyItem => {
        return <div className="select-container__item" key={currencyItem.id} onClick={() => addCurrency(currencyItem.abbr)}><b>{currencyItem.abbr}</b> {el.description}</div>
      })}
    </div>
  )
}
