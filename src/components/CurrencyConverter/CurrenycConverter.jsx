import { useState, useEffect } from "react"

import "./CurrencyConverter.scss"
// import CurrencySelector from "./CurrencySelector.jsx"


export default function CurrencyConverter() {
  // state of input and output currencies
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  return (
    <section className="main-section">
      <div className="text-section">
        <h1>Currency Converter</h1>
        <p>
          Check live rates, set rate alerts, receive 
          notifications and more
        </p>
      </div>
      <div className="converting-section">
        <span>Amount</span>
        <div className="currency-input">
          {/* <CurrencySelector value={fromCurrency} onChange={setFromCurrency}/> */}
          <input type="number" className="block"/>
        </div>
      </div>
    </section>
  )
}