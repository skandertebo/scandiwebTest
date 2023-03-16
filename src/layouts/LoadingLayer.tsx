import React from 'react';

export default function LoadingLayer() {
  return (
    <div className="loading-layer">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}