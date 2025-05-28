import React, { useEffect, useState } from "react";
import "../styles/Loader.scss";


const cookingIcons = [
  "🥕", // Carrot
  "🥦", // Broccoli
  "🥬", // Lettuce
  "🌽", // Corn
  "🍗", // Chicken leg
  "🥩", // Steak
  "🍳", // Fried egg
  "🧀", // Cheese
  "🍞", // Bread
  "🥖", // Baguette
  "🍚", // Rice
  "🧂", // Salt shaker
  "🫙", // Spice jar
  "🥫", // Canned food
  "🍎", // Apple
  "🍇", // Grapes
  "🍋", // Lemon
  "🍓", // Strawberry
  "🥛", // Milk
  "🍦", // Ice cream
  "🧄", // Garlic
  "🧅", // Onion
  "🥒"  // Cucumber
];

const Loader = () => {
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => (prevIcon + 1) % cookingIcons.length);
    }, 600); // Change icon every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Loader">
      <div className="LoaderIcon">{cookingIcons[currentIcon]}</div>
      <p className="LoaderText">Simmering a recipe just for you...</p>
    </div>
  );
};

export default Loader;
