import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import _ from 'lodash';

class AutoComplete extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: {},
      loaded: false,
    };
    // this.getOptions = _.debounce(this.getOptions.bind(this), 500);
  }

  fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        const configObj = {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
            'x-rapidapi-key':
            '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
          },
        };
        // !this.state.loaded
        //   ?
        fetch(
          `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=10&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${inputValue}`,
          configObj
          )
          .then((resp) => resp.json())
          .then((resp) => {
            resp.data
            ? this.setState({ ...this.state, loaded: !this.state.loaded })
            : console.log();
            console.log(
              resp.data[0].result_object.name,
              resp.data[0].result_object.location_id
              );
              const tempArray = [];
              resp.data.forEach((element) => {
                tempArray.push({
                  value: element.result_object.location_id,
                  label: element.result_object.name,
                });
              });
              console.log(tempArray);
              callback(tempArray);
              // return tempArray
            })
            .catch((error) => {
              console.log(error, 'catch the hoop');
            });
            // : console.log();
          });
        }
      };
      
      onSearchChange = (selectedOption) => {
        if (selectedOption) {
          this.setState({
            selectedOption,
          });
        }
      };
      render() {
        const options=["look","map","turtle"]
        return (
          <div>
        <AsyncSelect
        cacheOptions
          value={this.state.selectedOption}
          defaultOptions={options}
          loadOptions={this.fetchData}
          placeholder="Admin Name"
          onChange={(e) => {
            this.onSearchChange(e);
          }}
          defaultOptions={false}
        />
      </div>
    );
  }
}

export default AutoComplete;
