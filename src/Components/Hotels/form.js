import React from 'react'
//FOR REFACTORING REASONS THE FORM INSIDE HOTELSEARCHFORM CREATED AS ITS OWN COMPONENT
const Form=(props)=>{
    const {
        hotelClass,
        locationId,
        checkin,
        nights,
        adults,
        rooms,
        pricesMin,
        pricesMax,
        subCategory,
        priceRange,
        setTripData,
        today,
        locationSearch,
        determineNights,
        sendSearch
      } =props;

    return(

        <form id="hotel-form">
                    <p>Nights: {nights.toString().split('-')}</p>
                    <div className="info-box">
                      <label>CITY</label>
                      <input
                        placeholder="Search by city"
                        type="text"
                        name="city"
                        onChange={(e) => {
                          // setTripData(e);
                          locationSearch(e);
                        }}
                      />
                    </div>
                  
                    <div id="hotel-dates">
                      <div className="info-box">
                        <label>Check IN</label>
                        <input
                          type="date"
                          id="leave-date"
                          name="checkin"
                          min={today}
                          onChange={(e) => setTripData(e)}
                        />
                      </div>

                      <div className="info-box" id="return-box">
                        <label>Check OUT</label>
                        <input
                          type="date"
                          min={checkin}
                          id="return-date"
                          name="checkout"
                          onChange={(e) => {
                            setTripData(e);
                            determineNights(e);
                          }}
                        />
                      </div>
                    </div>
                    <div id="hotel-info">
                      <div className="info-box">
                        <label htmlFor="adults">ADULTS</label>
                        <select
                          name="adults"
                          name="adults"
                          onChange={(e) => setTripData(e)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="rooms">ROOMS</label>
                        <select
                          name="rooms"
                          name="rooms"
                          onChange={(e) => setTripData(e)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label>STAR RATING</label>
                        <select
                          name="hotelClass"
                          onChange={(e) => setTripData(e)}
                        >
                          <option value="all">ALL</option>
                          <option value="&hotel_class=1">1</option>
                          <option value="&hotel_class=2">2</option>
                          <option value="&hotel_class=3">3</option>
                          <option value="&hotel_class=4">4</option>
                          <option value="&hotel_class=5">5</option>
                        </select>
                      </div>
                      <div className="info-box">
                        <label htmlFor="subcategory">CATEGORY</label>
                        <select
                          name="subcategory"
                          id="subcategory"
                          onChange={(e) => setTripData(e)}
                        >
                          <option value="all">ALL</option>
                          <option value="&subcategory=hotel">Hotel</option>
                          <option value="&subcategory=resort">Resort</option>
                          <option value="&subcategory=bb">
                            Bed + Breakfast
                          </option>
                          <option value="&subcategory=specialty">
                            Specialty
                          </option>
                        </select>
                      </div>
                    </div>
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
                    <div className="price-range">
                      {priceRange === 'true' ? (
                        <React.Fragment>
                          <label for="formControlRange">
                            Price Range $0-${pricesMax} Per Night
                          </label>
                          <input
                            type="range"
                            class="form-control-range"
                            id="formControlRange"
                            name="pricesMax"
                            min="0"
                            max="700"
                            onChange={(e) => {
                              setTripData(e);
                            }}
                          />
                        </React.Fragment>
                      ) : null}

                      <label>Set Price Range</label>
                      <input
                        type="radio"
                        name="priceRange"
                        value={true}
                        defaultChecked
                        onChange={(e) => {
                          setTripData(e);
                        }}
                      />

                      <label>NO Price Limit </label>
                      <input
                        type="radio"
                        name="priceRange"
                        value={false}
                        onChange={(e) => {
                          setTripData(e);
                        }}
                      />
                    </div>
                    {/* <!-- SEARCH BUTTON --> */}
                    <div id="hotel-search">
                      <div className="info-box">
                        <input
                          type="submit"
                          id="search-hotel"
                          value="SEARCH ROOMS"
                          onClick={(e) => sendSearch(e)}
                        />
                      </div>
                    </div>
                  </form>
    )
}
export default Form

// <Form
// hotelClass={hotelClass}
// locationId={locationId}
// checkin={checkin}
// nights={nights}
// adults={adults}
// rooms={rooms}
// pricesMin={pricesMin}
// pricesMax={pricesMax}
// subCategory={subCategory}
// today={today}
// priceRange={priceRange}
// setTripData={this.setTripData}
// locationSearch={this.locationSearch}
// determineNights={this.determineNights}
// sendSearch={this.sendSearch}
// />