import React from 'react'
import './hotelSearchForm.css'
const AmenitiesInput=(props)=>{
    const {setTripData}=props
    return(

  
<div className="amenities">
<label
  class="btn btn-link"
  data-toggle="collapse"
  data-target="#collapseOne"
  aria-expanded="true"
  aria-controls="collapseOne"
>
  <label>AMENITIES</label>
</label>

<div
  id="collapseOne"
  class="collapse hide"
  aria-labelledby="headingOne"
  data-parent="#accordion"
>
  <div class="card-body">
    <input
      type="checkbox"
      name="amenities"
      value="airport_transportation"
      onChange={(event) => setTripData(event)}
    />
    <p>Airport-Shuttle</p>
    <input
      type="checkbox"
      name="amenities"
      value="smoking_rooms"
      onChange={(event) => setTripData(event)}
    />
    <p>Smoking-room</p>
    <input
      type="checkbox"
      name="amenities"
      value="free-internet"
      onChange={(event) => setTripData(event)}
    />
    <p>Free-Wifi</p>
    <br />
    <input
      type="checkbox"
      name="amenities"
      value="free_breakfast"
      onChange={(event) => setTripData(event)}
    />
    <p>Free-Breakfast</p>
    <input
      type="checkbox"
      name="amenities"
      value="pets_allowed"
      onChange={(event) => setTripData(event)}
    />
    <p>Pets-Allowed</p>
    <input
      type="checkbox"
      name="amenities"
      value="swimming_pool"
      onChange={(event) => setTripData(event)}
    />
    <p>Swimming-Pool</p>
    <input
      type="checkbox"
      name="amenities"
      value="fitness_center"
      onChange={(event) => setTripData(event)}
    />
    <p>Fitness-Center</p>
  </div>
</div>
</div> 
 )
}
export default AmenitiesInput