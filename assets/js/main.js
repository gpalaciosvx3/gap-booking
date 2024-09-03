function addSearchEventListener() {
  const searchBtn = document.querySelector('.search-btn');
  const clearBtn = document.querySelector('.clear-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const query = document.querySelector('.search-bar input[type="text"]').value.trim().toLowerCase();
        const resultsContainer = document.getElementById('search-results');

        fetch('database/pais.json')
            .then(response => response.json())
            .then(data => {
                const country = Object.keys(data).find(key => key.toLowerCase() === query);
                if (country) {
                    resultsContainer.style.display = 'block';
                    resultsContainer.innerHTML = '';
                    const countryData = data[country];
                    const timezone = countryData.timezone;
                    const cities = countryData.cities;
                    if(timezone){
                      const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
                      const timeBox = document.createElement('div');
                      timeBox.classList.add('time-box');
                      timeBox.innerHTML = `<h2>Current Local Time (${timezone}): ${currentTime}</h2>`;
                      resultsContainer.appendChild(timeBox);
                    }

                    cities.forEach(city => {
                        const cityBox = document.createElement('div');
                        cityBox.classList.add('city-box');
                        cityBox.innerHTML = `
                            <img src="${city.image}" alt="${city.name}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                            <button class="visit-btn">Visit</button>
                        `;
                        resultsContainer.appendChild(cityBox);
                    });

                } else {
                    alert(`Country ${query} was not found in the database.`);
                }
            })
            .catch(error => console.error('Error to load database:', error));
    });

    if(clearBtn){
      const queryInput = document.querySelector('.search-bar input[type="text"]');
      const resultsContainer = document.getElementById('search-results');

      clearBtn.addEventListener('click', function() {
          queryInput.value = '';
          resultsContainer.innerHTML = ''; // Limpiar resultados
          resultsContainer.style.display = 'none'; // Oculta el contenedor de resultados
      });
    }

    clearInterval(interval); // Detener el intervalo cuando se encuentra el botón
  }
}

// Ejecutar el intervalo cada 100ms para verificar si el botón está disponible
const interval = setInterval(addSearchEventListener, 100);
