import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    items: [],
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

  render() {
    const image = new Image(20, 30);
    image.src = "./media/red-marker.png";
    const images = ["newIcon", image];

    return (
      <div className='home'>
        <Map
          style='mapbox://styles/therenotthere/cka2jeg5b0cpt1isl310p5kvc'
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
              />
            ))}
          </Layer>
        </Map>
      </div>
    );
  }
}

export default Home;
