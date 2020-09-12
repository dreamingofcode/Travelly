import React, { PureComponent } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
//  import { colourOptions } from '../data';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const animatedComponent = makeAnimated();


export default class AutoComplete extends PureComponent {
  
  state = { selectedCity: [] };
  onChange = (selectedCity) => {
    this.setState({
      selectedCity: selectedCity || [],
    });
  };
  loadOptions = async (inputText, callback) => {
    const configObj = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '78658dd993msha58b4f039c6c59ep11289djsn173e61927b34',
      },
    };
    const response = await fetch(
      `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=10&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=chicago`,
      configObj
    );
    const json = await response.json();
    console.log(json);
    callback(
      json.data.map((i) => ({
        label: i.result_object.name,
        value: i.result_object.location_id,
      }))
    );

    // setTimeout(() => {
    // callback(this.setResults(json));
    // }, 10000);
  };

  // renderEveryTrip = (trip) => {
  //   return <p>{trip}</p>;
  // };

  //   handleInputChange = (newValue: string) => {
  //     const inputValue = newValue.replace(/\W/g, '');
  //     this.setState({ inputValue });
  //     return inputValue;
  //   };
  render() {
    return (
      <div className="trips">
        {/* <pre>inputValue: {this.state.inputValue}</pre> */}
        <AsyncSelect
          isMulti
          components={animatedComponent}
          value={this.state.selectedCity}
          onChange={this.onChange}
          placeholder={'Find City..'}
          loadOptions={this.loadOptions}
          // theme={(theme) => ({
          //   ...theme,
          //   borderRadius: 0,
          //   colors: {
          //     ...theme.colors,
          //     primary25: 'green',
          //     primary: 'black',
          //     neutral0: '#c8c8c8',
          //     neutral90: '',
          //   },
          // })}
          cacheOptions
          // loadOptions={loadOptions}
          // defaultOptions
          // onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}
