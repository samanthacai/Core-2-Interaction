const nycURL = 'https://data.cityofnewyork.us/resource/jb3k-j3gp.json';
const namesContainer = document.getElementById('namesContainer');
const licenseContainer = document.getElementById('licenseContainer');

const workWithData = json => {
    json.forEach(item => {
        const name = item.name;
        const licenseNumber = item.license_number; // Extract license number
        const expirationDate = item.expiration_date; // Extract expiration date

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name; // Set name as initial text content

        // Store license number, expiration date, and year as data attributes
        nameElement.setAttribute('data-license', licenseNumber);
        nameElement.setAttribute('data-expiration', expirationDate);

        // Position names randomly within the visible area of the webpage
        const maxX = window.innerWidth - 200; // Max X-coordinate (width of window minus padding)
        const maxY = window.innerHeight - 15000; // Max Y-coordinate (height of window minus padding)
        const x = Math.random() * maxX;
        const y = Math.random() * maxY + 14320;
        nameElement.style.left = `${x}px`;
        nameElement.style.top = `${y}px`;

        // Add hover event listener
        nameElement.addEventListener('mouseover', () => {
            const width = nameElement.getBoundingClientRect().width; // Get width of element
            nameElement.textContent = licenseNumber; // Display license number on hover
            nameElement.style.width = `${width}px`; // Set width to match original width
            nameElement.style.textAlign = 'center'; // Center align text
        });

        // Restore original text on mouseout
        nameElement.addEventListener('mouseout', () => {
            nameElement.textContent = name; // Restore original name
            nameElement.style.width = 'auto'; // Allow element to expand to fit content
            nameElement.style.textAlign = 'left'; // Restore text alignment
        });

        namesContainer.appendChild(nameElement);
    });
    nameElement.setAttribute('data-expiration', expirationDate);

};

const fetchData = () => {
    fetch(nycURL)
        .then(response => response.json())
        .then(data => {
            workWithData(data); // Display all names initially
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

fetchData(); // Initial fetch and processing of data

function scrollToBottom() {
    const scrollButton = document.getElementById('scrollButton');
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Scroll to bottom
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// Attach click event listener to the button
document.getElementById('scrollButton').addEventListener('click', scrollToBottom);

function scrollToBottom() {
    const scrollButton = document.getElementById('scrollButtonBottom');
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Scroll to bottom
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}

// Attach click event listener to the button
document.getElementById('scrollButtonBottom').addEventListener('click', scrollToBottom);

document.querySelectorAll('button[class^="year"]').forEach(button => {
    button.addEventListener('click', () => {
        // Get the selected year from the button's class
        const selectedYear = button.textContent;

        // Toggle background color based on selected year
        document.querySelectorAll('.name').forEach(nameElement => {
            // Extract the expiration date
            const expirationDate = nameElement.getAttribute('data-expiration');
            
            // Check if expiration date contains the selected year
            if (expirationDate.includes(selectedYear)) {
                nameElement.classList.toggle('highlight');
            }
        });
    });
});

const buttons = document.querySelectorAll('.year1');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle the 'active' class for the clicked button
        button.classList.toggle('active');
    });
});