import React from "react";

const Statistic = ({text, value}) => {
    return (
        <div className = "statistic">
            <span>{text}</span>
            <span>{value}</span>
        </div>
    )
  };

  export default Statistic;