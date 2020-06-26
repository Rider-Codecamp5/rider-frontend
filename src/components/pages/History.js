import React, { useState } from 'react';
import './History.css';
import HistoryCard from '../HistoryCard';
import RoleButton from '../RoleButton';

function History() {
  return (
    <div className='history'>
      <div className='App__heading'>
        <h2>Trip History</h2>
      </div>
      <div className='history__display'>
        <RoleButton />
        <HistoryCard name='Shinzo Abe' from='Siam' to='Silom' dateTime='Friday 55555555' carModel='Tesla T' price='300' result='Deny' />
        <button className='App__button App__button--red'>Back</button>
      </div>
    </div>
  )
}

export default History;