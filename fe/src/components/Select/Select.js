import CURRENCIES from "../../utils/currencies";
import './Select.css';

export default function Select({ viewedCurrency, setViewedCurrency, setIsSelect }) {
  const addCurrency = newCurrency => {
    setViewedCurrency(prevState => [...prevState, newCurrency]);
    setIsSelect(false);
  }

  return (
    <div className="select-container">
      {CURRENCIES.filter(elem => !viewedCurrency.includes(elem.abbr)).map(el => {
        return <div className="select-container__item" key={el.id} onClick={() => addCurrency(el.abbr)}><b>{el.abbr}</b> {el.description}</div>
      })}
    </div>
  )
}