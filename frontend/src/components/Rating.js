import React from "react";

export default function Rating({ value, text, color }) {
    
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (value >= i + 1) {
      stars.push(<i key={i} style={{ color }} className="fas fa-star"></i>);
    } else if (value >= i + 0.5) {
      stars.push(
        <i
          key={i}
          style={{ color }}
          className="fas fa-star-half-alt"
        ></i>
      );
    } else {
      stars.push(<i key={i} style={{ color }} className="far fa-star"></i>);
    }
  }

  return (
    <div className="rating">
      {stars}
      <span style={{ paddingLeft: "10px" }}>{text && text}</span>
    </div>
  );
}
