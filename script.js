const fetchCountryBtn = document.getElementById('fetch-country-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');

async function fetchCountryInfo(countryName) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!res.ok) throw new Error('Country not found');
        const data = await res.json();
        const country = data[0];

        
        const capitalCity = Array.isArray(country.capital) ? country.capital[0] : country.capital;

        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${capitalCity}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <img src="${country.flags.png}" alt="${country.name.common} flag">
        `;

       
        if (country.borders) {
            borderingCountries.innerHTML = '<h3>Bordering Countries:</h3>';
            for (let border of country.borders) {
                const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
                const borderData = await borderRes.json();
                const neighbor = borderData[0];

                borderingCountries.innerHTML += `
                    <section>
                        <p><strong>${neighbor.name.common}</strong></p>
                        <img src="${neighbor.flags.png}" alt="${neighbor.name.common} flag">
                    </section>
                `;
            }
        } else {
            borderingCountries.innerHTML = '<p>No bordering countries found.</p>';
        }

    } catch (error) {
        countryInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        borderingCountries.innerHTML = '';
    }
}

fetchCountryBtn.addEventListener('click', () => {
    const countryInput = document.getElementById('country-input').value;
    countryInfo.innerHTML = '';
    borderingCountries.innerHTML = '';
    fetchCountryInfo(countryInput);
});

