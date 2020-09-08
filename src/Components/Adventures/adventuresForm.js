import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AdventuresMap from './adventuresMap';
import { locationSearch } from '../formFunctions';
import './adventuresForm.css';
function AdventureForm(props) {
  const USER_LOCATION = localStorage.getItem('USER_LOCATION');

  const [searchData, setSearchData] = useState({
    latitude: USER_LOCATION.split(',')[0],
    longitude: USER_LOCATION.split(',')[1],
    locationID: 'Near Me',
    nearMe: true,
    restaurants: false,
    attractions: false,
  });
  const {
    longitude,
    latitude,
    restaurants,
    attractions,
    locationID,
    nearMe,
  } = searchData;

  const { setAttractions, setRestaurants } = props;
  const location = localStorage.getItem('locationID');
  console.log('data', searchData);
  useEffect(() => {
    // attractions=== false? setAttractions(null):console.log()
    // restaurants=== false? setRestaurants(null):console.log()
    {
    nearMe
        ? localStorage.removeItem('locationID')
        : console.log();
    }
    setSearchData({ ...searchData, locationID: location });
  }, [location]);
  const sendSearch = (e) => {
    e.preventDefault();
    let ATTRACTIONS_URL = '';
    let RESTAURANTS_URL = '';
    if (nearMe) {
      {
        restaurants
          ? (RESTAURANTS_URL = `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=${latitude}&longitude=${longitude}`)
          : setRestaurants(null);
      }
      {
        attractions
          ? (ATTRACTIONS_URL = `https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=30&distance=5&lang=en_US&longitude=${longitude}&latitude=${latitude}`)
          : setAttractions(null);
      }
    } else {
      restaurants
        ? (RESTAURANTS_URL = `https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=${locationID}`)
        : setRestaurants(null);
      attractions
        ? (ATTRACTIONS_URL = `https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id=${locationID}`)
        : setAttractions(null);
    }
    {
      restaurants
        ? fetch(RESTAURANTS_URL, {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
              'x-rapidapi-key':
                '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
            },
          })
            .then((resp) => resp.json())
            .then((response) => {
              console.log(response);
              setRestaurants(response);
            })
            .catch((err) => {
              console.log(err);
            })
        : setRestaurants(null);
      attractions
        ? fetch(ATTRACTIONS_URL, {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
              'x-rapidapi-key':
                '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
            },
          })
            .then((resp) => resp.json())
            .then((response) => {
              console.log(response);
              setAttractions(response);
            })
            .catch((err) => {
              console.log(err);
            })
        : setAttractions(null);

        
    }

    // {
    //   attractions
    //     ? fetch(ATTRACTIONS_URL, {
    //         method: 'GET',
    //         headers: {
    //           'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    //           'x-rapidapi-key':
    //             '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
    //         },
    //       })
    //         .then((resp) => resp.json())
    //         .then((response) => {
    //           console.log(response);
    //           setAttractions(response);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //     : setAttractions(null);
    // }
  };
  return (
    <div className="adventures-form">
      <div className="adventures-map-container">
      <h1>Find Your Next Adventure</h1>
      <AdventuresMap searchData={searchData} />
      </div>
      <div className="search-form">
        <div className="selectors">
          <input
            type="checkbox"
            name="restaurants"
            defaultChecked
            onChange={(e) => {
              setSearchData({ ...searchData, nearMe: !nearMe });
            }}
          />{' '}
          <label>Near Me</label>
          <input
            type="checkbox"
            name="restaurants"
            onChange={(e) => {
              setSearchData({ ...searchData, restaurants: !restaurants });
              //   sendSearch(e);
            }}
          />
          <label> Restaurants</label>
          <input
            type="checkbox"
            name="attractions"
            // defaultChecked="true"
            onChange={(e) => {
              setSearchData({ ...searchData, attractions: !attractions });
              //   sendSearch(e);
            }}
          />
          <label> Attractions </label>
        </div>
        {nearMe?
        <button onClick={(e) => sendSearch(e)}>Search</button>:null}
        {nearMe ? null : (
          <div>
            <input
              type="text"
             placeholder="Search By City"
              onChange={(e) => {
                setSearchData({ ...searchData, locationID: locationSearch(e) });
              }}
            />
            <button onClick={(e) => sendSearch(e)}>Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    attractions: state.attractions,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAttractions: (results) => {
      const action = {
        type: 'SET_ATTRACTIONS',
        attractions: results,
      };
      dispatch(action);
    },
    setRestaurants: (results) => {
      const action = {
        type: 'SET_RESTAURANTS',
        restaurants: results,
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdventureForm);
