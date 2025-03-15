import { useEffect, useState } from "react";

export default function Slider({ id, min, max, step, value, onValueChange, className = "" }) {
  const [localValue, setLocalValue] = useState(value[0]);

  useEffect(() => {
    setLocalValue(value[0]);
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    onValueChange([newValue]);
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
