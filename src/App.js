import "./App.css";
import React, { useState, useEffect } from "react";
import { Arrow, RaindropTask, Loader } from "./Styled-Components";
import {
  endOfShift,
  normalTimeToFixABug,
  maxBugs,
  maxWidth,
  maxHeight,
  colors,
} from "./config";

function App() {
  const [pizzaChance, setPizzaChance] = useState(0);
  const [pizzaPercent, setPizzaPercent] = useState(0);
  const [numberOfBugs, setNumberOfBugs] = useState(0);
  const [makeRaindropsVisible, setMakeRaindropsVisible] = useState(false);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [shiftIsOver, setShiftIsOver] = useState(false);
  const [noBugs, setNoBugs] = useState(false);
  const [error, setError] = useState("");

  const createRaindropsForTasks = (numberOfBugs) => {
    const outcome = [];
    for (let i = 0; i < numberOfBugs; i++) {
      const randomWidth = Math.floor(Math.random() * maxWidth);
      const randomHeight = Math.floor(Math.random() * maxHeight);
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];
      outcome.push({
        color: randomColor,
        width: randomWidth > 10 ? randomWidth : randomWidth + 10,
        height: randomHeight > 10 ? randomHeight : randomHeight + 10,
        top: Math.floor(Math.random() * 100),
        left: Math.floor(Math.random() * 100),
      });
    }
    setTimeout(() => {
      setMakeRaindropsVisible(true);
    }, 500);
    return outcome.map((item, index) => (
      <RaindropTask key={index} makeVisible={makeRaindropsVisible} {...item} />
    ));
  };

  const calculateBugs = async () => {
    let bugs = await fetch(
      `http://www.randomnumberapi.com/api/v1.0/random?min=1&max=${maxBugs}&count=1`
    ).then((res) => res.json());

    if (!bugs || !bugs[0]) {
      setPizzaPercent(1);
      setPizzaChance(1);
      return false;
    }

    setNumberOfBugs(bugs[0]);
    return bugs[0];
  };

  const algorithm = async () => {
    const remainingTime =
      60 * endOfShift - (new Date().getHours() * 60 + new Date().getMinutes());
    setMinutesRemaining(remainingTime);
    if (remainingTime <= 0) {
      setShiftIsOver(true);
      return;
    }

    const bugs = await calculateBugs();
    if (!bugs) {
      setNoBugs(true);
      return;
    }

    const timePerBug = Math.floor(remainingTime / bugs);
    if (timePerBug <= 0) {
      setPizzaPercent(100);
      setPizzaChance(170);
      return;
    }

    const timeDifference = timePerBug - normalTimeToFixABug;
    if (timeDifference <= 0) {
      setPizzaPercent(100);
      setPizzaChance(170);
    } else {
      const percentage = !Math.floor(100 / timeDifference)
        ? 1
        : Math.floor(100 / timeDifference);
      const degrees = !Math.floor((180 / 100) * percentage)
        ? 1
        : Math.floor((180 / 100) * percentage);
      setPizzaPercent(percentage);
      setPizzaChance(degrees);
    }
  };

  document.body.onclick = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    algorithm();
  }, []);

  return (
    <div>
      <div style={{ color: "white", textAlign: "center" }}>
        {shiftIsOver ? (
          <h1>The shift is over! Hope your pizza is good!</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : noBugs ? (
          <h1>You're lucky! There are no bugs!</h1>
        ) : (
          <>
            <h1>
              {pizzaPercent > 50 ? "Rainy " : "Relatively calm "} with{" "}
              {pizzaPercent ? pizzaPercent : <Loader />}% of pizza
            </h1>
            {numberOfBugs ? numberOfBugs : <Loader />} bugs found and{" "}
            {minutesRemaining ? minutesRemaining : <Loader />} minutes until{" "}
            {endOfShift}:00
          </>
        )}
      </div>
      {createRaindropsForTasks(numberOfBugs)}
      <div className="pizza" />
      <Arrow degrees={pizzaChance} />
    </div>
  );
}

export default App;
