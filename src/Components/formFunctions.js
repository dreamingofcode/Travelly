export const locationSearch = (event) => {
  const string = event.target.value;
  event.preventDefault();

  string !== ''
    ? fetch(
        `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${string}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
            'x-rapidapi-key':
              '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log('sss', response.data[0].result_object.location_id);
          const data = response.data[0].result_object.location_id;
          localStorage.setItem('locationID', data);
          console.log("FF",data);

          localStorage.setItem('location_coordinates', [
            response.data[0].result_object.latitude,
            response.data[0].result_object.longitude,
          ]);
        })
        .catch((err) => {
          console.log(err);
        })
    : console.log('hi');
};
