import React, { useState } from 'react';
import '../../styles/HistoryCard.css';
import HistoryCard from '../HistoryCard';
import RoleButton from '../RoleButton';

function History(props) {
  const [isPassenger, setIsPassenger] = useState(true);
  
  return (
    <div className='history'>
      <div className='App__heading'>
        <h2>Trip History</h2>
      </div>
      <div className='history__display'>
        <div className='route__form '>
          <RoleButton isPassenger={isPassenger} setIsPassenger={setIsPassenger} />
          <HistoryCard name='Shinzo Abe' from='Siam' to='Silom' dateTime='Friday 55555555' carModel='Tesla T' price='300' history='Deny' />
          <button className='App__button App__button--red'>Back</button>
        </div>
      </div>
    </div>
  )
}

export default History;