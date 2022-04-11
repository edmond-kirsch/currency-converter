import { useEffect, useState } from 'react';
import './Converter.css';
import ConverterItem from "../ConverterItem/ConverterItem";
import Select from '../Select/Select';
import CURRENCIES from '../../utils/currencies';
import { initialSetOfCurrencies, baseCurrency } from '../../utils/initialSetOfCurrencies';
import { IoIosAddCircle } from 'react-icons/io';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Converter() {
  const [viewedCurrencies, setViewedCurrencies] = useState(initialSetOfCurrencies);
  const [currencies, setCurrencies] = useState();
  const [base, setBase] = useState(baseCurrency);
  const [value, setValue] = useState(1);
  const [isSelect, setIsSelect] = useState(false);

  const getRates = async (base, value) => {
    const res = await fetch(`http://localhost:5000?base=${base}&value=${value}`);
    const json = await res.json();
    setCurrencies(json);
  }

  const toggleSelect = e => {
    e.preventDefault();
    setIsSelect(!isSelect);
  }

  useEffect(() => {
    getRates(base, value);
  }, [base, value]);

  return (
    <div className="converter">
      <h1>Currency converter</h1>
      {currencies ? 
        <>
          <h5 className="converter__header">Rates are provided by <i>exchange rate app</i></h5>
          <p>Last updated {currencies.date}</p>
          <form className="converter__form">
          {viewedCurrencies.map(currencyBase => {
            const currencyInfo = CURRENCIES.find(currencyItem => currencyBase === currencyItem.abbr);
            return <ConverterItem key={currencyInfo.id} 
                                  currencyInfo={currencyInfo} 
                                  rate={currencies.rates[currencyInfo.abbr]}
                                  setBase={setBase}
                                  setCurrencies={setCurrencies}
                                  setValue={setValue}/>
          })}
          {isSelect ?
            <button type='button' onClick={toggleSelect} className="converter__add-currency"><AiFillCloseCircle /> Close</button>
            : <button type='button' onClick={toggleSelect} className="converter__add-currency"><IoIosAddCircle /> Add currency</button>}
          {isSelect ?
            <Select setViewedCurrencies={setViewedCurrencies} viewedCurrencies={viewedCurrencies} setIsSelect={setIsSelect} /> 
            : null}
          </form>
        </>
        : null
      }
    </div>
  )
}
