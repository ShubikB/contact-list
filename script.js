// api url to get random user data
const apiURL = "https://randomuser.me/api?results=20"

// unlock slider element
const slider = document.getElementById("slider")

const searchInputField = document.getElementById("search")

// initial contactList array
let contactList = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Kaoutar",
      last: "De Bos",
    },
    location: {
      street: {
        number: 827,
        name: "Kooiwalbos",
      },
      city: "Kallenkote",
      state: "Noord-Holland",
      country: "Netherlands",
      postcode: "9080 YW",
      coordinates: {
        latitude: "36.6830",
        longitude: "-160.4792",
      },
      timezone: {
        offset: "+6:00",
        description: "Almaty, Dhaka, Colombo",
      },
    },
    email: "kaoutar.debos@example.com",
    login: {
      uuid: "82c1f6ac-eb5d-4ab5-9802-4ac43a439fd4",
      username: "angrydog366",
      password: "laurence",
      salt: "7St1NUvM",
      md5: "2cdc7205ae35920ba6d9d746d108c740",
      sha1: "e5ba08ce3b1a46e24654aae0ec2405cf073d135b",
      sha256: "68826001c232170a52b02d3970a667a27114cd7f02da87afea3ae4f48344ce1a",
    },
    dob: {
      date: "1981-02-15T23:06:01.828Z",
      age: 43,
    },
    registered: {
      date: "2018-07-21T12:20:07.108Z",
      age: 6,
    },
    phone: "(026) 2169821",
    cell: "(06) 24800455",
    id: {
      name: "BSN",
      value: "69514393",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/30.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/30.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/30.jpg",
    },
    nat: "NL",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Otto",
      last: "Pollari",
    },
    location: {
      street: {
        number: 8713,
        name: "Hermiankatu",
      },
      city: "Simo",
      state: "Northern Savonia",
      country: "Finland",
      postcode: 70239,
      coordinates: {
        latitude: "-68.6774",
        longitude: "-65.8734",
      },
      timezone: {
        offset: "+8:00",
        description: "Beijing, Perth, Singapore, Hong Kong",
      },
    },
    email: "otto.pollari@example.com",
    login: {
      uuid: "9fdd55a6-047c-4106-88ae-8275f5f0e0fe",
      username: "ticklishmouse190",
      password: "writer",
      salt: "AgdyZDlo",
      md5: "8490b8ede31e2a7a958dde4026b444de",
      sha1: "14f51f23db77cd21aafb02435af8a1b378e91da0",
      sha256: "750e372a1f9fc70d1c797fcd325858991b0e67d5388c88e2116bb2b05f87d7b7",
    },
    dob: {
      date: "1959-04-11T18:18:56.722Z",
      age: 65,
    },
    registered: {
      date: "2013-04-21T13:17:19.090Z",
      age: 11,
    },
    phone: "03-992-310",
    cell: "046-970-33-31",
    id: {
      name: "HETU",
      value: "NaNNA321undefined",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/43.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/43.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/43.jpg",
    },
    nat: "FI",
  },
]

// add change event trigger for slider value change
slider.addEventListener("change", (e) => {
  const { value } = e.target

  if (value < 70) {
    slider.value = 0
  } else {
    displayAppScreen()
  }
})

searchInputField.addEventListener("keyup", (e) => {
  console.log(e.target.value)

  // check if the input value is in the users full name
  const filtereContactList = contactList.filter((item) => {
    const fullName = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase()

    return fullName.includes(e.target.value.toLowerCase())
  })

  console.log(filtereContactList)

  displayContactList(filtereContactList)
})

// General function to display screen
const displayScreen = (screenName) => {
  const screens = document.getElementsByClassName("screen")

  for (screen of screens) {
    screen.style.display = "none"
  }
  const mainScreen = document.getElementById(screenName)
  mainScreen.style.display = "block"
}

// display contact count
// populate the contact list in the accordian
const displayContactList = (userList) => {
  // updat the user count
  const userNumber = userList.length
  const userCountElement = document.getElementById("userCount")

  userCountElement.innerText = userNumber

  // update the contact accordian
  const cA = document.getElementById("contactAccordian")
  cA.innerHTML = ""

  userList.map((item, index) => {
    // console.log(item);
    const accItem = `
    <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#contact-${index}"
                  aria-expanded="false" aria-controls="contact-${index}">
                  <img src="${item.picture.thumbnail}" alt="" width="50px" height="50px"
                    class="rounded-circle" />
                  <div class="ms-2">
                    <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
                    <small>${item.location.street.number} ${item.location.street.name}</small>
                  </div>
                </button>
              </h2>
              <div id="contact-${index}" class="accordion-collapse collapse" data-bs-parent="#contactAccordian">
                <div class="accordion-body d-flex justify-content-center flex-column align-items-center">


                  <img src="${item.picture.medium}" alt="" width="100px" height="100px"
                    class="rounded-circle" />

                  <div class="d-flex flex-column">
                    <div>
                      <i class="bi bi-person-circle"></i>
                      <span>${item.name.title} ${item.name.first} ${item.name.last}</span>
                    </div>
                    <div>
                    <a href="tel:${item.cell}">
                      <i class="bi bi-phone-fill"></i>
                      <span>${item.cell}</span>
                    </a>
                    </div>
                    <div>
                    <a href="mailto:${item.email}>
                      <i class="bi bi-envelope-at-fill"></i>
                      <span>${item.email}</span>
                    </a>
                    </div>
                    <div>
                    <a href="https://www.google.com/maps/search/?api=1&query=${item.location.street.number},+${item.location.street.name},+${item.location.city},+${item.location.state},+${item.location.country}">

                      <i class="bi bi-globe-americas"></i>
                      <span>${item.location.street.number} ${item.location.street.name}, ${item.location.state}</span>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `

    cA.innerHTML = cA.innerHTML + accItem
  })
}

// display App Screen
const displayAppScreen = () => {
  displayScreen("appScreen")
}

// display Contact List Screen
const displayContactListScreen = async () => {
  // display contact list screen
  displayScreen("contactListScreen")

  const spinnerElement = document.getElementById("spinner")
  const contactListElement = document.getElementById("contact-list")

  // before fetching data
  // 1. show spinner
  spinnerElement.style.display = "block"
  // 2. hide contact list
  contactListElement.style.display = "none"

  // fetch contact data
  const response = await fetch(apiURL)
  console.log(response)
  const data = await response.json()
  contactList = data.results

  // after fetching data
  // 1. hide spinner
  spinnerElement.style.display = "none"
  // 2. show contact list
  contactListElement.style.display = "block"

  // populate contact List
  displayContactList(contactList)
}

const displayLockScreen = () => {
  slider.value = 0

  displayScreen("lockScreen")
}

// Real Time Clock Update
const updatClockTime = () => {
  const clockTimesElements = document.getElementsByClassName("clockTime")

  for (item of clockTimesElements) {
    const curr_date = new Date()
    item.innerText =
      curr_date.getHours().toString().padStart(2, "0") +
      ":" +
      curr_date.getMinutes().toString().padStart(2, "0")
  }
}

updatClockTime()
