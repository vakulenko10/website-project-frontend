// FitAppCalorieIntake.js
import React, { useEffect, useState } from 'react';
import './CreateRecipe.css';
import Container from '../../Container';

const CreateRecipe = () => {
  const [selectedItems, setSelectedItems] = useState({
    likes: [],
    dislikes: [],
  });

  const handleItemClick = (type, item) => {
    const items = selectedItems[type];
    setSelectedItems({
      ...selectedItems,
      [type]: items.includes(item)
        ? items.filter((i) => i !== item)
        : [...items, item],
    });
  };
  useEffect(() => {
    console.log(JSON.stringify(selectedItems))
  }, [selectedItems])
  const products = ['Oats', 'Bananas', 'Carrots', 'Eggs', 'Berries', 'Honey', 'Nuts', 'Rice'];


  const handleButtonClick = async (e) => {
    e.preventDefault();

    // Prepare the data
    const dataToSend = {
      likes: selectedItems.likes,        // Products user likes
      dislikes: selectedItems.dislikes,  // Products user dislikes
    };

    try {
      // Send data to the API
      const response = await fetch('https://your-api-route/calculate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // Handle the response from the API
      if (response.ok) {
        const result = await response.json();
        console.log('Recipe created:', result);
        // Handle success, you can also display a success message
      } else {
        console.error('Error creating recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <main>
      <div className="calorie-intake">
        <Container>
          <div className='calorie-intake__inner'>
            <h1 className="calorie-intake__title">Your daily calorie intake</h1>
            <p className="calorie-intake__amount">3200 calories</p>

            <div className="calorie-intake__sections">
              <div className="calorie-intake__section calorie-intake__section--products">
                <h2 className="calorie-intake__section-title">Products you would like to see in the dishes</h2>
                <div className="calorie-intake__items">
                  {products.map((product) => (
                    <button
                      key={product}
                      className={`calorie-intake__item calorie-intake__wanted-item ${selectedItems.likes.includes(product) ? 'calorie-intake__wanted-item--selected' : ''}`}
                      onClick={() => handleItemClick('likes', product)}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calorie-intake__section calorie-intake__section--allergens">
                <h2 className="calorie-intake__section-title">Allergens or unwanted foods</h2>
                <div className="calorie-intake__items">
                  {products.map((product) => (
                    <button
                      key={product}
                      className={`calorie-intake__item calorie-intake__unwanted-item ${selectedItems.dislikes.includes(product) ? 'calorie-intake__unwanted-item--selected' : ''}`}
                      onClick={() => handleItemClick('dislikes', product)}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <input
              type="text"
              className="calorie-intake__input"
              placeholder="write your wishes for the recipes "
            />

            <button className="calorie-intake__button" onClick={handleButtonClick}>Create recipe</button>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default CreateRecipe;
