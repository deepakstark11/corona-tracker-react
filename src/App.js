import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import classes from "./App.module.css";
import { fetchData } from "./api/index";
import coronaImage from "./images/image.png";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  countryChangedHandler = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={classes.container}>
        <img src={coronaImage} className={classes.image} alt="COVID_19"></img>
        <Cards data={data} />
        <CountryPicker countryChangedHandler={this.countryChangedHandler} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
