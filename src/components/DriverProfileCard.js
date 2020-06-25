import React from 'react'

function DriverProfileCard(props) {

    const {Data} = props;

    return (
        <div>
            <div className='card'>
                <div className='card__content'>
                    <div className='card__text'>
                        {/* <h3>{props.email}</h3> */}
                        <span><b>Driver License :</b> {Data.driver_license}</span>
                        <br />
                        <span><b>Car Model :</b> {Data.car_model}</span>
                        <br />
                        <span><b>Car Color :</b> {Data.car_color}</span>
                        <br />
                        <span><b>Seat Available :</b> {Data.seat}</span>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverProfileCard
