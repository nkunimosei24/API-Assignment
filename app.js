// JavaScript (app.js)

document.querySelector(".primary-btn").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
  
    const inputValue = document.querySelector(".input").value;
    
    // Fetch cocktail data from TheCocktailDB API
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        const cocktailContainer = document.createElement('div');
        cocktailContainer.classList.add('cocktail-container');
  
        if (data.drinks) {
          // Loop through the cocktail results and display them
          data.drinks.forEach(drink => {
            const cocktailCard = document.createElement('div');
            cocktailCard.classList.add('cocktail-card');
  
            // Cocktail name
            const name = document.createElement('h2');
            name.textContent = drink.strDrink;
            cocktailCard.appendChild(name);
  
            // Cocktail image
            const img = document.createElement('img');
            img.src = drink.strDrinkThumb;
            img.alt = drink.strDrink;
            img.classList.add('cocktail-img');
            cocktailCard.appendChild(img);
  
            // Cocktail instructions
            const instructions = document.createElement('p');
            instructions.textContent = `Instructions: ${drink.strInstructions}`;
            cocktailCard.appendChild(instructions);
  
            // Append the cocktail card to the container
            cocktailContainer.appendChild(cocktailCard);
          });
        } else {
          // If no drinks found, display a message
          const noResultsMessage = document.createElement('p');
          noResultsMessage.textContent = "No cocktails found with that letter.";
          cocktailContainer.appendChild(noResultsMessage);
        }
  
        // Add the cocktail container to the body
        document.body.appendChild(cocktailContainer);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  