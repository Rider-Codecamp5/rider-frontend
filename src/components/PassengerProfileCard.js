import React,{useEffect,useState} from 'react'
import '../components/PassengerProfileCard.css'

function PassengerProfileCard(props) {
    
    const {Data} = props;

    return (
        <div className='card'>
            <div className='card__content'>
                <div className='card__text'>
                    {/* <h3>{props.email}</h3> */}
                    <span><b>Email :</b> {Data.email}</span>
                    <br />
                    <span><b>Phone :</b> {Data.phone_number}</span>
                    <br />
                    <span><b>Address :</b> {Data.address}</span>
                    <br />
                    <span><b>Bank :</b> {props.to}</span>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default PassengerProfileCard
