import { useState, useEffect } from "react";

import "./CurrencyConverter.scss";
import CurrencySelector from "./CurrencySelector.jsx";

export default function CurrencyConverter() {
  // Currently selected base and target currencies
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  // Input values for each field
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  // Latest fetched exchange rate
  const [exchangeRate, setExchangeRate] = useState(null);

  // Fetch exchange rate whenever currencies or input change
  useEffect(() => {
    async function fetchRate() {
      try {
        // Request exchange rates for the selected base currency
        const query = await fetch(
          `https://v6.exchangerate-api.com/v6/06b5040e7641239a3dd7ab7a/latest/${fromCurrency}`
        );

        const result = await query.json();

        // Extract rate for the target currency
        const rate = result.conversion_rates[toCurrency];
        setExchangeRate(rate);

        // Auto-update the converted amount if user typed in the "from" input
        if (fromAmount !== "" && !isNaN(fromAmount)) {
          setToAmount((Number(fromAmount) * rate).toFixed(2));
        }
      } catch (err) {
        console.error("Error fetching exchange rate:", err);
        setExchangeRate(null);
      }
    }

    fetchRate();
  }, [fromCurrency, toCurrency, fromAmount]);

  // When user types into the top input (amount to convert)
  const handleFromChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);

    // If no rate yet or input is empty, clear the second field
    if (!exchangeRate || value === "") {
      setToAmount("");
      return;
    }

    const num = Number(value);
    if (isNaN(num)) {
      setToAmount("");
    } else {
      // Convert using fetched exchange rate
      setToAmount((num * exchangeRate).toFixed(2));
    }
  };

  // When user edits the converted value in the second input
  const handleToChange = (e) => {
    const value = e.target.value;
    setToAmount(value);

    if (!exchangeRate || value === "") {
      setFromAmount("");
      return;
    }

    const num = Number(value);
    if (isNaN(num)) {
      setFromAmount("");
    } else {
      // Reverse conversion: target → base
      setFromAmount((num / exchangeRate).toFixed(2));
    }
  };

  return (
    <section className="main h-[100vh] justify-center flex items-center">
      <div className="converter">
        <div className="converter__text max-w-[600px] flex mb-[20px] flex-col justify-center items-center">
          <h1 className="block m-auto text-3xl font-semibold text-blue-900">
            Currency Converter
          </h1>
          <p>Check live rates, set rate alerts, receive notifications and more</p>
        </div>

        <div className="w-full p-8 bg-white shadow-lg converter__panel rounded-xl ">
          <span>Amount</span>

          {/* First input row */}
          <div className="flex items-center justify-center gap-4 currency-input">
            <CurrencySelector value={fromCurrency} onChange={setFromCurrency} />

            <input
              type="number"
              className="inline-block px-4 py-2 text-base font-semibold text-right border border-black rounded-lg bg-zinc-100"
              value={fromAmount}
              onChange={handleFromChange}
            />
          </div>

          {/* Icon between inputs */}
          <div className="flex items-center justify-center w-full">
            <img
              src="../../public/design-icon.png"
              alt="Currency exchange design button"
              className="w-[100px] cursor-pointer"
            />
          </div>

          <span>Converted Amount</span>

          {/* Second input row */}
          <div className="flex items-center justify-center gap-4 currency-output">
            <CurrencySelector value={toCurrency} onChange={setToCurrency} />

            <input
              type="number"
              className="inline-block px-4 py-2 text-base font-semibold text-right border border-black rounded-lg bg-zinc-100"
              value={toAmount}
              onChange={handleToChange}
            />
          </div>
        </div>

        {/* Display current exchange rate */}
        <div className="converter__output">
          <span>Indicative Exchange Rate:</span>
          <p>
            {exchangeRate
              ? `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`
              : "No exchange rate available"}
          </p>
        </div>
      </div>
    </section>
  );
}
