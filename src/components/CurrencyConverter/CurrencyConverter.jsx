import { useState, useEffect } from "react"

import "./CurrencyConverter.scss"
// import CurrencySelector from "./CurrencySelector.jsx"


export default function CurrencyConverter() {
  // state of input and output currencies
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

return (
  <section className="main h-[100vh] justify-center flex items-center">
    <div className="converter">
      <div className="converter__text max-w-[600px] flex mb-[20px] flex-col justify-center items-center">
        <h1 className="block m-auto text-3xl font-semibold text-blue-900">Currency Converter</h1>
        <p>
          Check live rates, set rate alerts, receive 
          notifications and more
        </p>
      </div>

      <div className="w-full p-8 bg-white shadow-lg converter__panel rounded-xl">
        <div className="flex flex-col items-center justify-center currency-input">
          <span>Amount</span>
          {/* <CurrencySelector> */}
          <input type="number" className="inline-block text-base font-semibold text-center border border-black rounded-lg bg-zinc-100"/>
          <img 
            src="../../public/design-icon.png"
            alt="Currency exchange design button"
            className="w-[100px] cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-center justify-center currency-output">
          <span>Converted Amount</span>
          {/* <CurrecySelector> */}
          <input type="number" className="inline-block text-base font-semibold text-center border border-black rounded-lg bg-zinc-100"/> 
        </div>
      </div>

      <div className="converter__output">
        <span>Indicative Exchange Rate:</span>
        <p>{}</p>
      </div>
    </div>
  </section>
  );

}