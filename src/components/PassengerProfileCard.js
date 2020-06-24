import React from 'react'
import '../components/PassengerProfileCard.css'

function PassengerProfileCard(props) {

    return (
        <div className='card'>
            <div className='card__content'>
                <div className='card__text'>
                    <h3>{props.name}</h3>
                    <span><b>Email :</b> {props.from}</span>
                    <br />
                    <span><b>Phone :</b> {props.to}</span>
                    <br />
                    <span><b>Address :</b> {props.to}</span>
                    <br />
                    {/* <span><b>Bank :</b> {props.to}</span> */}
                    <br />
                </div>
            </div>
        </div>
    )
}

export default PassengerProfileCard
