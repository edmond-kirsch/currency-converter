import './Converter.css';
import ConverterItem from "../ConverterItem/ConverterItem";
import Select from '../Select/Select';
import { useEffect, useState } from 'react';
import CURRENCIES from '../../utils/currencies';

export default function Converter() {
  const [viewedCurrency, setViewedCurrency] = useState(['USD', 'EUR', 'BYN', 'RUB']);
  const [currencies, setCurrencies] = useState();
  const [base, setBase] = useState('USD');
  const [value, setValue] = useState(1);
  const [isSelect, setIsSelect] = useState(false);

  const getRates = async (base, value) => {
    const res = await fetch(`http://localhost:5000?base=${base}&value=${value}`);
    const json = await res.json();
    setCurrencies(json);
  }

  useEffect(() => {
    getRates(base, value);
  }, [base, value]);

  const openSelect = e => {
    e.preventDefault();
    setIsSelect(true);
  }
  
  return (
    <div className="converter">
      <h1>Currency converter</h1>
      {
        currencies ? 
                  <>
                    <h5 className="converter__header">Rates are provided by <i>exchange rate app</i></h5>
                    <p>Last updated {currencies.date}</p>
                    <form className="converter__form">
                    {viewedCurrency.map((element) => {
                      const currencyInfo = CURRENCIES.find(el => element === el.abbr);
                      return <ConverterItem key={currencyInfo.id} 
                                            currencyInfo={currencyInfo} 
                                            rate={currencies.rates[currencyInfo.abbr]}
                                            setBase={setBase}
                                            setCurrencies={setCurrencies}
                                            setValue={setValue}/>
                    })}
                    <button onClick={openSelect} className="converter__add-currency">Add currency</button>
                    {isSelect ? <Select setViewedCurrency={setViewedCurrency} viewedCurrency={viewedCurrency} setIsSelect={setIsSelect} /> : null}
                    </form>
                  </>
                  : null
      }
      
    </div>
  )
}