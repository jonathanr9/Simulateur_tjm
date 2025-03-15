import { useState } from "react";

export function RadioGroup({ value, onValueChange, className = "", children }) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {children}
    </div>
  );
}

export function RadioGroupItem({ value, id, checked, onChange }) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-4 h-4 text-primary focus:ring-primary-light"
    />
  );
}
