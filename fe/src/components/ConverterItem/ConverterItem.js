import './ConverterItem.css';

export default function ConverterItem({ currencyInfo, rate, setBase, setCurrencies, setValue }) {
  const inputView = rate.toString().replace(/^0(?!\.|$)/, '');

  const handleInput = e => {
    if (['+','*','-','/'].includes(e.nativeEvent.data)) {
      return;
    }

    setCurrencies(prevState => {
      const newCurrencies = {...prevState};
      newCurrencies.rates[currencyInfo.abbr] = +e.target.value;
      return newCurrencies;
    })

    setValue(+e.target.value)
    setBase(currencyInfo.abbr);
  }

  return (
    <div className="converter-item">
      <label className="converter-item__label" htmlFor="">{currencyInfo.abbr}</label>
      <input className="converter-item__input" type="number" value={inputView} onInput={handleInput}/>
      <div className="converter-item__description">{currencyInfo.description}</div>
    </div>
  )
}
