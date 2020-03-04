import React from "react";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Rain from "./Rain";
import Storm from "./Storm";
import Drizzle from "./Drizzle";
import Fog from "./Fog";

const Icon = props => {
  switch (props.name) {
    case "Clear":
      return <Sun {...props} />;
    case "Clouds":
      return <Cloud {...props} />;
    case "Rain":
      return <Rain {...props} />;
    case "Thunderstorm":
      return <Storm {...props} />;
    case "Drizzle":
      return <Drizzle {...props} />;
    case "Fog":
      return <Fog {...props} />;
    default:
      return <Cloud {...props} />;
  }
};

export default Icon;
