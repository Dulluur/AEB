import React from "react";
import male from "../assets/icons/male.svg";
import female from "../assets/icons/female.svg";
import alien from "../assets/icons/alien.svg";

const GenderIcon = ({ gender }) => {
  const styles = {
    width: "20px",
    height: "20px",
    marginLeft: "5px",
    verticalAlign: "middle",
  };

  let iconSrc;
  if (gender === "Male") {
    iconSrc = male;
  } else if (gender === "Female") {
    iconSrc = female;
  } else {
    iconSrc = alien;
  }

  if (!iconSrc) {
    console.error("SVG NOT FOUND:", gender);
    return null;
  }

  return <img src={iconSrc} alt={gender} style={styles} />;
};

export default GenderIcon;
