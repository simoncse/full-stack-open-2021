import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0){
        return (
            <h4>No feedback given</h4>
        )
    }
    const sum = good + neutral + bad;
    //good = 1, neutral = 0, bad = -1, since we can ignore the adding of neutral, the total sum
    //is just the difference between good and bad, i.e good - bad.
    const average = (good-bad)/sum;   
    const positve = 100 * good/sum;
    
    return (
        <div className="statistics">
            <Statistic text = "good" value = {good} />
            <Statistic text = "neutral" value = {neutral} />
            <Statistic text = "bad" value = {bad} />
            <Statistic text = "all" value = {sum} />
            <Statistic text = "average" value = {average.toFixed(2)} />
            <Statistic text = "positve" value = {positve.toFixed(2) + "%"} />
        </div>
    )
  };



export default Statistics;