export function Button({ children, variant = "default", className = "", ...props }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary-light hover:to-primary",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-gray-600 hover:text-primary hover:bg-gray-100",
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
