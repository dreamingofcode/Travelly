import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import savingsIcon from '../../icons/savingIcons.png';
import star from '../../icons/star.png';
import heart from '../../icons/heart.png';
import filledHeart from '../../icons/filledHeart.png';
function HotelDetailsCard(props) {
  const [toggleButtonClassName, setToggleButtonClassName] = useState(
    'hotel-details-card'
  );
  const [toggleButtonStyle, setToggleButtonStyle] = useState('Select');
 
  const [favorited, setFavorited] = useState(false);
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  
  return () => {
   
  };
}, [favorited]);

  const {
    // hotel,
    id,
    setToggleButtonDisplay,
    hotelSelected,
    hotel,
    setHotelSelected,
  } = props;
  const hotelName = id;
  const location = hotel.location_string;
  const imageURL = hotel.photo.images.original.url;
  const imageALT = hotel.photo.images.caption;
  const price = hotel.price;
  const priceLevel = hotel.price_level;
  const rating = hotel.rating;
  const reviews = hotel.num_reviews;
  // const specialOffer= hotel.hac_offers.offers[0]
  // const specialOfferLink= specialOffer.link
  let savingsAlert = false;
  {
    hotel.saving_alert
      ? (savingsAlert = hotel.saving_alert.message)
      : (savingsAlert = false);
  }

  // const hotelName = 'TRUMP TOWERS';
  // const location = 'chicago,Illinois';
  // const imageURL =
  //   'https://media-cdn.tripadvisor.com/media/photo-s/1b/34/ce/b2/swissotel-chicago.jpg';
  // const imageALT = 'cute hotel';
  // const price = '$$130-300';
  // const priceLevel = '$$';
  // const rating = '3.0';
  // const reviews = 22334;
  const specialOffer = '$120';
  const specialOfferLink =
    'https://media-cdn.tripadvisor.com/media/photo-s/1b/34/ce/b2/swissotel-chicago.jpg';
  // const savingsAlert = '80% cheaper!';

  let starRating = [];

  for (let i = 0; i < parseInt(rating); i++) {
    starRating.push(i);
  }

  const toggleHeart = () => {
   ;
   setFavorited(!favorited)
    setLoaded(!loaded)
    console.log("ff",favorited)
  };
  const setToggleButton = () => {

    toggleButtonClassName === 'hotel-details-card'
      ? setToggleButtonClassName('hotel-details-card-selected-hotel')
      : setToggleButtonClassName('hotel-details-card');
    if (toggleButtonStyle === 'Select') {
      setToggleButtonStyle('Remove');
    } else if (toggleButtonStyle === 'Remove') {
      setToggleButtonStyle('Select');
    }

    setToggleButtonDisplay(id, toggleButtonStyle);
  };

  return (
    <div className={toggleButtonClassName}>
      <div className="details-image">
        <img className="hotel-image" src={imageURL} alt={imageALT} />
        <h5>{location}</h5>
      </div>
      <div className="specifics">
        <ul>
          <h3>{price}</h3>
          <h1>{hotelName}</h1>
          <hr />
          <li>
            {starRating.map((rating) => {
              return (
                <img className="star-rating" src={star} alt="star rating" />
              );
            })}
          </li>
          <li>{reviews} reviews</li>
        </ul>
      </div>
      <div className="specifics-row2">
        <ul>
          <li>{priceLevel}</li>
          <li>
            {' '}
            <a href={specialOfferLink}>{specialOffer} Special Offer!</a>
          </li>
        </ul>
      </div>
      {savingsAlert ? (
        <div className="savings-alert">
          <img
            className="savings-alert-image"
            src={savingsIcon}
            alt="savings icon"
          />
          <p>{savingsAlert}!</p>
        </div>
      ) : null}
       
      <div className="select">
        {hotelSelected.boolean && hotelSelected.id !== id ? null : (
          <button id={`${id}`} onClick={(id) => setToggleButton(id)}>
            {toggleButtonStyle}
          </button>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { flightSearchResults: state.flightSearchResults };
};
export default connect(mapStateToProps, null)(HotelDetailsCard);
