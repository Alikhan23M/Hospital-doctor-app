import React from 'react';

export default function Alert(props) {
  const baseClasses = "fixed top-0 left-0 right-0 z-50 px-4 py-3 border-t border-b text-center";
  const typeClasses = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  if (!props.alert) {
    return null;
  }

  return (
    <div className={`${baseClasses} ${typeClasses[props.alert.type]}`} role="alert">
      <p className="font-bold">{props.alert.type.charAt(0).toUpperCase() + props.alert.type.slice(1)}</p>
      <p className="text-sm">{props.alert.message}</p>
    </div>
  );
}
