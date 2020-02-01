import React from "react";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Rain from "./Rain";
import Storm from "./Storm";

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
    default:
      return <div></div>;
  }
};

export default Icon;
