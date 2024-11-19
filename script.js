console.log("Script loaded successfully!");

// API URL to fetch random user data
const apiURL = "https://randomuser.me/api?results=3";

// DOM elements references
const slider = document.getElementById("slider");
const searchInputField = document.getElementById("search");
const userCountElement = document.getElementById("userCount");
const contactAccordionElement = document.getElementById("contactAccordian");
const spinnerElement = document.getElementById("spinner");
const contactListElement = document.getElementById("contact-list");

// Holds the fetched list of contacts
let contactList = [];

// Event listener to handle the slider change and unlock the screen
slider.addEventListener("change", (e) => {
  const { value } = e.target;

  if (value < 70) {
    slider.value = 0; // Reset slider if value is less than 70
  } else {
    displayAppScreen(); // Unlock and display the app screen
  }
});

// Event listener to handle search functionality in the contact list
searchInputField.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  // Filter contacts based on the search term
  const filteredContacts = contactList.filter((item) => {
    const fullName = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
    return fullName.includes(searchTerm);
  });

  // Display filtered contacts
  displayContactList(filteredContacts);
});

// Utility function to fetch contacts from the API
const fetchContacts = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

// Utility function to hide all screens and display the specified one
const displayScreen = (screenName) => {
  const screens = document.getElementsByClassName("screen");

  for (const screen of screens) {
    screen.style.display = "none";
  }

  const mainScreen = document.getElementById(screenName);
  mainScreen.style.display = "block";
};

// Display the main app screen after unlocking
const displayAppScreen = () => {
  displayScreen("appScreen");
};

// Populate and display the contact list in the accordion
const displayContactList = (userList) => {
  // Update the user count
  const userNumber = userList.length;
  userCountElement.innerText = userNumber;

  // Clear the existing accordion content
  contactAccordionElement.innerHTML = "";

  // Populate the accordion with new contact data
  userList.forEach((item, index) => {
    const accItem = `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#contact-${index}"
            aria-expanded="false" aria-controls="contact-${index}">
            <img src="${item.picture.thumbnail}" alt="Thumbnail" width="50px" height="50px" class="rounded-circle" />
            <div class="ms-2">
              <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
              <small>${item.location.street.number} ${item.location.street.name}</small>
            </div>
          </button>
        </h2>
        <div id="contact-${index}" class="accordion-collapse collapse" data-bs-parent="#contactAccordian">
          <div class="accordion-body d-flex justify-content-center flex-column align-items-center">
            <img src="${item.picture.medium}" alt="Profile Picture" width="100px" height="100px" class="rounded-circle" />
            <div class="d-flex flex-column mt-3">
              <div><i class="bi bi-person-circle"></i> ${item.name.title} ${item.name.first} ${item.name.last}</div>
              <div><i class="bi bi-phone-fill"></i> ${item.cell}</div>
              <div><i class="bi bi-envelope-at-fill"></i> ${item.email}</div>
              <div><i class="bi bi-globe-americas"></i> ${item.location.street.number} ${item.location.street.name}, ${item.location.state}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    contactAccordionElement.innerHTML += accItem;
  });
};

// Display the contact list screen and fetch contact data
const displayContactListScreen = async () => {
  // Show the contact list screen
  displayScreen("contactListScreen");

  // Before fetching data: show spinner, hide contact list
  spinnerElement.style.display = "block";
  contactListElement.style.display = "none";

  // Fetch contacts from API
  contactList = await fetchContacts();

  // After fetching data: hide spinner, show contact list
  spinnerElement.style.display = "none";
  contactListElement.style.display = "block";

  // Populate the contact list
  displayContactList(contactList);
};

// Start with the lock screen
displayScreen("lockScreen");
