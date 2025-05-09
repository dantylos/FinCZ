
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


// Registration form

const signInBtn = document.getElementById('signInBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

signInBtn.addEventListener('click', () => {
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});