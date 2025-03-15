export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${className}`}
      {...props}
    />
  );
}
