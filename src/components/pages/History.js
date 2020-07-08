import React, { useState, useEffect } from 'react';
import '../../styles/HistoryCard.css';
import HistoryCard from '../HistoryCard';
import RoleButton from '../RoleButton';
import axios from '../../configs/axios';
import { Spin, Space } from 'antd';
import { useHistory } from 'react-router-dom';

function History(props) {
  const [isPassenger, setIsPassenger] = useState(true);
  const [historyAsPassenger, setHistoryAsPassenger] = useState([]);
  const [historyAsDriver, setHistoryAsDriver] = useState([]);

  let history = useHistory();
  
  useEffect(() => {
    async function getAllTripAsPassenger() {
      let result = await axios.get('/trip-history/passenger');
      setHistoryAsPassenger(result.data.history);
    }
    async function getAllTripAsDriver() {
      let result = await axios.get('/trip-history/driver');
      setHistoryAsDriver(result.data.history);
    }

    getAllTripAsPassenger();
    getAllTripAsDriver();
  }, []);


  const renderHistory = (trips) => {
    if(!trips) {
      return (
        <Space size='middle'>
          <Spin size='large' />
        </Space>
      ) 
    }

    if(trips.length === 0) {
      return <h1>No Trip Found</h1>
    }

    let history = trips.map((trip) => {
      console.log(props.userInfo.id);
      console.log(trip);
      if(trip.driver_id === props.userInfo.id) {
        return (
          <HistoryCard 
            key={trip.id}
            from={trip.passenger_from}
            to={trip.to}
            dateTime={trip.date_time}
            price={trip.price}
            rating={trip.rating}
            review={trip.passenger_review}
          />
        )
      }

      if(trip.passenger_id === props.userInfo.id) {
        return (
          <HistoryCard 
            key={trip.id}
            from={trip.passenger_from}
            to={trip.to}
            dateTime={trip.date_time}
            price={trip.price}
          />
        )
      }
    });

    return history;
  }

  return (
    <div className='history'>
      <div className='App__heading'>
        <h2>Trip History</h2>
      </div>
      <div className='history__display'>
        <div className='route__form '>
          <RoleButton isPassenger={isPassenger} setIsPassenger={setIsPassenger} />
          {isPassenger
            ?
              <>
              {renderHistory(historyAsPassenger)}
              </>
            :
              <>
                {renderHistory(historyAsDriver)}
              </>
          }
          <button className='App__button App__button--red' onClick={() => history.push('/')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default History;