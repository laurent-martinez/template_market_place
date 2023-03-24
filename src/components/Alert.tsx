import React from 'react';

function Alert({ errorDisplay } : string) {
  return (
    <div
      className="absolute top-5 right-5 z-800 bg-red-500  p-5"
    >
      <p className="text-3xl font-bold text-white">{errorDisplay}</p>
    </div>
  );
}

export default Alert;
