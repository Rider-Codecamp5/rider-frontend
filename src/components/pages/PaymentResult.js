import React from 'react';

const PaymentResult = props => {
  return (
    <div>
      <h1>Payment Succeeded to driver id: {props.match.params.id}</h1>
    </div>
  );
};

export default PaymentResult;
