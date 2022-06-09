'use strict';

const e = React.createElement;
const url = 'https://api.openweathermap.org/data/2.5/weather?q=kingston&appid=c5d6b7ff96335b152495fe9801217984&units=metric';
const root_url = base_url || document.querySelector('body').dataset.base_url;

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: 'Kingston',
        main: {
          temp: '30'
        },
        weather: [{
          icon: '02d'
        }]
      }
    }
  }

  componentDidMount(){
      fetch(url)
      .then(response => response.json())
      .then((response) => {
        this.setState({
          data: response
        })
      })
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "city-name"
    }, this.state.data.name), /*#__PURE__*/React.createElement("div", {
      className: "weather-icon"
    }, /*#__PURE__*/React.createElement("img", {
      src: getIcon(this.state.data.weather[0].icon)
    })), /*#__PURE__*/React.createElement("div", {
      className: "current-temp"
    }, parseRound(this.state.data.main.temp), /*#__PURE__*/React.createElement("sup", null, "o"), "C"));
    
  }
}

const domContainer = document.querySelector('#jis-weather');
const root = ReactDOM.createRoot(domContainer);
root.render(e(WeatherWidget));

 function getIcon(icon){
  return 'assets/img/weather-icons/' + icon + '.png';
}

function parseRound(stringNum){
  return Math.round(parseFloat(stringNum));
}