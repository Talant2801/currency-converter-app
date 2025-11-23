import {useState, useEffect} from "react"
import { CURRENCIES } from "./currencies.js"

export default function CurrencySelector({value, onChange}) {
  const [open, setOpen] = useState(false);

  console.log("value =", value);
  console.log("onChange =", onChange);

  return (
    <div className="relative currency-selector">
      <button
      onClick={() => setOpen(!open)}
      className="relative px-4 py-2 text-center border border-black rounded-lg">
        {value}
      </button>

      {open && (
        <div className="absolute left-0 z-50 w-full mt-1 overflow-x-hidden overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg top-full max-h-40">
          {CURRENCIES.map((curr) => 
            (<div 
            key={curr} 
            onClick={() => { setOpen(!open); 
                             onChange(curr); }} 
            className="px-2 py-1 cursor-pointer hover:bg-blue-100">
              {curr}
            </div>)
          )}
        </div>)}
    </div>
  );
}