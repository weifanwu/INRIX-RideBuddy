// Initialize the DOM when the page is loaded and this scripts is executed by the browser when the page is loaded because of the "DOMContentLoaded" attribute in the script tag in the HTML.
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the API token when the "GetToken" link in the navbar is clicked
    const getTokenLink = document.querySelector('.nav-link[href="/getToken"]');
    const tokenContainer = document.getElementById('token-container');
    
    getTokenLink.addEventListener('click', function (event) {
        // Prevent the default behavior of the link (which would navigate to a new page)
        event.preventDefault();

        // Show the token container
        tokenContainer.style.display = 'block';

        // Fetch the API token
        fetch('/getToken')
            //Parse the response as JSON
            .then(response => response.json())
            .then(data => {
                // Append the token data to the HTML
                tokenContainer.innerHTML = `<h4>This is your Auth Token which you can use to fetch real data from INRIX:</h4>\n ${data.message}`;
            })
            .catch(error => console.error('Error fetching API token:', error));
    });
});
