import {useState, uesEffect} from "react"
import { CURRENCIES } from "./currencies.js"

export default function CurrencySelector({value}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="currency-selector">
      <button
      onClick={() => setOpen(!open)}
      className="relative px-4 py-2 text-center border border-black rounded-lg">
        {value}
      </button>

      {open && (
        <div className="absolute overflow-y-auto max-h-60">
          {CURRENCIES.map((curr) => 
            (<div key={curr} onClick={() => setOpen(!open)} className="bg-white">
              {curr}
            </div>)
          )}
        </div>)}
    </div>
  );
}