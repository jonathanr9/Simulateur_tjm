export default function Button({ children, variant = "default", className = "", ...props }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none";
  
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:text-blue-600 hover:bg-gray-100",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
