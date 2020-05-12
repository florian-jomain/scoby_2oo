import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from "axios";
import ItemCard from "../components/ItemCard";
import "../styles/popupCard.css";
import mapboxStyle from "../styles/map-style.json";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    items: [],
    displayPopup: false,
    selectedItem: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/items")
      .then((apiResponse) => {
        this.setState({ items: apiResponse.data });
      })
      .catch((apiError) => {
        console.log(apiError);
      });
  }

  toggleItem = (index) => {
    const displayPopup = this.state.displayPopup;
    this.setState({ displayPopup: !displayPopup, selectedItem: index });
  };

  render() {
    const image = new Image(30, 30);
    image.src = "./media/marker-purple.svg";
    const images = ["newIcon", image];

    const { selectedItem, items, displayPopup } = this.state;

    return (
      <div className='home'>
        {displayPopup && <ItemCard selectedItem={items[selectedItem]} />}
        <Map
          style={mapboxStyle}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[2.3488, 48.8534]}
        >
          <Layer
            type='symbol'
            id='marker'
            layout={{ "icon-image": "newIcon" }}
            images={images}
          >
            {this.state.items.map((item, index) => (
              <Feature
                key={index}
                coordinates={[
                  item.location.coordinates[1],
                  item.location.coordinates[0],
                ]}
                onClick={(event) => this.toggleItem(index)}
              />
            ))}
          </Layer>
        </Map>
      </div>
    );
  }
}

export default Home;
