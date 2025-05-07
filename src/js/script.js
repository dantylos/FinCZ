
// Test scripts for search button
const data = ["Business", "Stocks rates", "Real Estate", "Cryptocurrencies", "Oil", "Gold", "Silver"];

document.getElementById("search-input").addEventListener("keyup", function() {
    let input = this.value.toLowerCase();
    let filteredData = data.filter(item => item.toLowerCase().includes(input));
    
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";
    filteredData.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        resultsList.appendChild(li);
    });
});
