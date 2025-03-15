export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
