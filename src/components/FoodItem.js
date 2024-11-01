import React, { useState } from 'react';

const FoodItem = ({ name, isSelected, handleClick, classes }) => {
  return (
    <button
      className={`food-item ${classes} ${isSelected ? 'selected' : ''} `}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
export default FoodItem;
// const App = () => {
//   const [selectedFoods, setSelectedFoods] = useState([]);
//   const [unwantedFoods, setUnwantedFoods] = useState([]);

//   const handleFoodClick = (name) => {
//     if (selectedFoods.includes(name)) {
//       setSelectedFoods(selectedFoods.filter((item) => item !== name));
//     } else {
//       setSelectedFoods([...selectedFoods, name]);
//     }
//   };

//   const handleUnwantedFoodClick = (name) => {
//     if (unwantedFoods.includes(name)) {
//       setUnwantedFoods(unwantedFoods.filter((item) => item !== name));
//     } else {
//       setUnwantedFoods([...unwantedFoods, name]);
//     }
//   };

//   const foods = [
//     'Oats',
//     'Bananas',
//     'Carrots',
//     'Eggs',
//     'Berries',
//     'Honey',
//     'Nuts',
//     'Rice',
//   ];

//   return (
//     <div className="container">
//       <div className="header">
//         <h1>Your daily calorie intake</h1>
//         <p>3200 calories</p>
//       </div>
//       <div className="content">
//         <div className="section">
//           <h2>Products you would like to see in the dishes</h2>
//           <div className="food-list">
//             {foods.map((food) => (
//               <FoodItem
//                 key={food}
//                 name={food}
//                 isSelected={selectedFoods.includes(food)}
//                 handleClick={() => handleFoodClick(food)}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="section">
//           <h2>Allergens or unwanted foods</h2>
//           <div className="food-list">
//             {foods.map((food) => (
//               <FoodItem
//                 key={food}
//                 name={food}
//                 isSelected={unwantedFoods.includes( food )}
//                 handleClick={() => handleUnwantedFoodClick(food)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;