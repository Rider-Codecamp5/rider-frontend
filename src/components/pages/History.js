import React, { useState, useEffect } from 'react';
import '../../styles/HistoryCard.css';
import HistoryCard from '../HistoryCard';
import RoleButton from '../RoleButton';
import axios from '../../configs/axios';
import { Spin, Space, Pagination } from 'antd';
import { useHistory } from 'react-router-dom';

function History(props) {
  const [isPassenger, setIsPassenger] = useState(true);
  const [historyAsPassenger, setHistoryAsPassenger] = useState([]);
  const [historyAsDriver, setHistoryAsDriver] = useState([]);

  const [passengerPageAmount, setPassengerPageAmount] = useState(1);
  const [driverPageAmount, setDriverPageAmount] = useState(1);
  const [minPassengerPageValue, setMinPassengerPageValue] = useState(0);
  const [maxPassengerPageValue, setMaxPassengerPageValue] = useState(5);
  const [minDriverPageValue, setMinDriverPageValue] = useState(0);
  const [maxDriverPageValue, setMaxDriverPageValue] = useState(5);

  const cardPerPage = 5 

  let history = useHistory();
  
  useEffect(() => {
    async function getAllTripAsPassenger() {
      let result = await axios.get('/trip-history/passenger');
      setHistoryAsPassenger(result.data.history);
      setPassengerPageAmount(Math.ceil(result.data.history.length / cardPerPage))
    }
    async function getAllTripAsDriver() {
      let result = await axios.get('/trip-history/driver');
      setHistoryAsDriver(result.data.history);
      console.log(result.data.history.length / 5)
      setDriverPageAmount(Math.ceil(result.data.history.length / cardPerPage))
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

  const passengerPageChange = (value) => {
    setMinPassengerPageValue((value - 1) * cardPerPage);
    setMaxPassengerPageValue(value * cardPerPage);
  }

  const driverPageChange = (value) => {
    setMinDriverPageValue((value - 1) * cardPerPage);
    setMaxDriverPageValue(value * cardPerPage);
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
              {/* .slice(minPageValue, maxPageValue) */}
                {renderHistory(historyAsPassenger.slice(minPassengerPageValue, maxPassengerPageValue).reverse() )}
                <Pagination 
                  defaultCurrent={1} 
                  total={passengerPageAmount * 10} 
                  onChange={passengerPageChange} 
                  showSizeChanger={false} 
                  style={{textAlign: 'center', margin: '1.5rem'}} 
                />
              </>
            :
              <>
                {renderHistory(historyAsDriver.slice(minDriverPageValue, maxDriverPageValue).reverse())}
                <Pagination 
                  defaultCurrent={1} 
                  total={driverPageAmount * 10} 
                  onChange={driverPageChange} 
                  showSizeChanger={false} 
                  style={{textAlign: 'center', margin: '1.5rem'}} 
                />
              </>
          }
          <button className='App__button App__button--red' onClick={() => history.push('/')}>Back</button>
        </div>
      </div>
    </div>
  )
}

export default History;