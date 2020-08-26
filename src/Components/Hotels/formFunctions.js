 const locationSearch = (event) => {
  const string = event.target.value;

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
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    : console.log('hi');
 
};
export default locationSearch