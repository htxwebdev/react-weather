import React from "react";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Rain from "./Rain";
import Storm from "./Storm";

const Icon = props => {
  switch (props.name) {
    case "sun":
      return <Sun {...props} />;
    case "cloud":
      return <Cloud {...props} />;
    case "rain":
      return <Rain {...props} />;
    case "storm":
      return <Storm {...props} />;
    default:
      break;
  }
};

export default Icon;
