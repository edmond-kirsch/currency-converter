import './ConverterItem.css';

export default function ConverterItem({ currencyInfo, rate, setBase, setCurrencies, setValue }) {
  let view = rate.toString().replace(/^0(?!\.|$)/, '');
  const handleInput = e => {
    setCurrencies((prevState) => {
      const result = {...prevState};
      result.rates[currencyInfo.abbr] = +e.target.value;
      return result;
    })
    setValue(+e.target.value)
    setBase(currencyInfo.abbr);
  }

  return (
    <div className="converter-item">
      <label className="converter-item__label" htmlFor="">{currencyInfo.abbr}</label>
      <input className="converter-item__input" type="number" value={view} onInput={handleInput}/>
      <div className="converter-item__description">{currencyInfo.description}</div>
    </div>
  )
}
