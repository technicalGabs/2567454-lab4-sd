async function fetchCountries(url) {
    try {
        let name = document.getElementById("CountryName").value;
        const urls = `${url}${name}`;
        const response = await fetch(urls);
        const result = await response.json();
        document.getElementById("CountryName").value = '';
        show_information(result[0]);
        return result[0];
    }
    catch (error) {
        console.warn(error);
    }
}

function show_information(result) {
    document.getElementById('capital').innerText = `Capital: ${result.capital ? result.capital[0] : 'N/A'}`;
    document.getElementById('populace').innerText = `Population: ${result.population}`;
    document.getElementById('region').innerText = `Region: ${result.region}`;
    document.getElementById('ImageID').src = result.flags.svg;
}

const press_button = document.getElementById("SubmitCountryName");
press_button.addEventListener("click", async function (callback) {
    callback.preventDefault();
    const url = "https://restcountries.com/v3.1/name/";
    const country = await fetchCountries(url);


    const boarda = document.getElementById('boarda');
    boarda.innerHTML = '';

    if (country.borders) {
        const Codes = country.borders.join(",");
        const Responses = await fetch(`https://restcountries.com/v3.1/alpha?codes=${Codes}`);
        const Everything = await Responses.json();

        Everything.forEach(element => {
            const item = document.createElement('div');
            item.innerHTML = `
                <p>${element.name.common}</p>
                <img src="${element.flags.svg}" alt="${element.name.common} flag" />
            `;
            boarda.appendChild(item);
        });
    }
});
