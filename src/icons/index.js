import React from "react";

import ClearDay from "./ClearDay";
import ClearNight from "./ClearNight";
import Clouds from "./Clouds";
import CloudsBroken from "./CloudsBroken";
import CloudsDay from "./CloudsDay";
import CloudsNight from "./CloudsNight";
import Mist from "./Mist";
import Rain from "./Rain";
import RainShower from "./RainShower";
import Snow from "./Snow";
import Thunderstorm from "./Thunderstorm";

const Icon = props => {
  switch (props.name) {
    case "01d":
      return <ClearDay {...props} />;
    case "01n":
      return <ClearNight {...props} />;
    case "02d":
      return <CloudsDay {...props} />;
    case "02n":
      return <CloudsNight {...props} />;
    case "03d" || "03n":
      return <Clouds {...props} />;
    case "04d" || "04n":
      return <CloudsBroken {...props} />;
    case "09d" || "09n":
      return <RainShower {...props} />;
    case "10d" || "10n":
      return <Rain {...props} />;
    case "11d" || "11n":
      return <Thunderstorm {...props} />;
    case "50d" || "50n":
      return <Mist {...props} />;
    case "13d" || "13n":
      return <Snow {...props} />;
    default:
      return <Clouds {...props} />;
  }
};

export default Icon;
