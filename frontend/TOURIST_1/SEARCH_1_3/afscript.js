// Sample data for places
const places = [
  {
    name: "Bhubaneswar",
    description: 'The capital city of Odisha, Bhubaneswar is renowned for its ancient temples, earning it the nickname "Temple City." It serves as a hub for education and IT in eastern India.',
    image: [
      {
        URL: 'https://as2.ftcdn.net/v2/jpg/03/07/36/71/1000_F_307367172_NVUQnGUVvMXmBxKrCJwTPd8 gXn5yIcxV.jpg',
        alt: "Lingaraj Temple",
    },
    {
        URL: 'https://as1.ftcdn.net/v2/jpg/00/52/84/14/1000_F_52841479_YdxG4UCjhfSLQfp5ieeMX2T4WxH ZHxNg.jpg',
        alt: "Dhauli Stupa",
    },
    {
        URL: 'https://odishatour.in/wp-content/uploads/2022/12/Nandankanan-Zoological-Park- bhubaneswar-odisha.jpg?v=1670397397',
        alt: "Nandankanan Zoological Park",
    },
    {
        URL: 'https://odishatour.in/wp-content/uploads/2022/12/Bhubaneswar-musuem.jpg',
        alt: "Odisha State Museum",
    }
    ],
    tag: ["bhubaneswar", "bbsr"]
  },
  {
    name: "Puri",
    description: 'A coastal city on the Bay of Bengal, Puri is famed for the 12th-century Jagannath Temple, making it a pivotal Hindu pilgrimage site.',
    image: [
      {
        URL: 'https://as2.ftcdn.net/v2/jpg/08/25/23/11/1000_F_825231187_H6tkrtS2ri2t7AKmOOnEAIC9skR NJvP7.jpg',
        alt: "Jagannath Temple",
    },
    {
        URL: 'https://as2.ftcdn.net/v2/jpg/05/45/40/15/1000_F_545401584_r4Fs1INFeiCzvz3Mi4Tk7cCqQNZp1dQn.jpg',
        alt: "Konark Sun Temple",
    },
    {
        URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCs_oGg2ujKMolxrmuR_QmnZffmPaa1Jc9A&s',
        alt: "Golden Beach",
    },
    {
        URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6vEMhc-O12grxkdn10pkm9A4q-adbEo6kQ&s',
        alt: "Wonder World Water Park",
    }
    ],
    tag: ["puri"]
  },
  {
    name: "Cuttack",
    description: 'Known as the "Millennium City" and the "Silver City," Cuttack is one of Odisha’s oldest cities, celebrated for its exquisite silver filigree work.',
    image: [
      {
        URL: 'https://s7ap1.scene7.com/is/image/incredibleindia/cuttack-chandi-temple-cuttack-odisha-chandi-temple1-attr-hero?qlt=82&ts=1726663557866',
        alt: "Cuttack Chandi Temple",
    },
    {
        URL: 'https://s7ap1.scene7.com/is/image/incredibleindia/odisha-state-maritime-museum-cuttack-odisha-3-attr-hero?qlt=82&ts=1726663545071',
        alt: "Odisha State Maritime Museum",
    },
    {
        URL: 'https://eastindiantraveller.com/wp-content/uploads/2020/08/as5.jpeg',
        alt: "Dhabaleswar Temple",
    },
    {
        URL: 'https://odishatour.in/wp-content/uploads/2024/10/Peacock-Valley-cuttack.jpg?v=1730134244',
        alt: "Peacock Valley",
    }
    ],
    tag: ["cuttack", "ctc"]
  }
];

// In this example, we'll simply use the 'places' array as our categories.
const categories = places;

/**
 * Display items in the root element.
 * @param {Array} items - Array of place objects.
 */
const displayItem = (items) => {
  document.getElementById('root').innerHTML = items.map((item) => {
    const { name, description, image, tag } = item;
    // Use the first image for display.
    const imgHTML = `<img src="${image[0].URL}" alt="${image[0].alt}" />`;
    return (
      `<div class='box'>
          <div class='img-box'>
              ${imgHTML}
          </div>
          <div class='bottom'>
              <h2>${name}</h2>
              <p>${description}</p>
              <p>Tags: ${tag.join(", ")}</p>
              <button>Search</button>
          </div>
      </div>`
    );
  }).join('');
};

/**
 * Function to search and redirect if one match is found.
 */
function searchPlaces() {
  const searchData = document.getElementById('searchBar').value.toLowerCase().trim();
  const filteredData = categories.filter((item) => {
    const tags = item.tag.join(" ").toLowerCase();
    return item.name.toLowerCase().includes(searchData) || tags.includes(searchData);
  });
  
  // If exactly one match is found and searchData is not empty, redirect.
  if (filteredData.length === 1 && searchData !== "") {
    // Redirect to a page named as the lowercase version of the place name.
    window.location.href = filteredData[0].name.toLowerCase() + ".html";
  } else {
    // Otherwise, display the filtered results.
    displayItem(filteredData);
  }
}

// Event listeners: keyup on search bar and click on search button.
document.getElementById('searchBar').addEventListener('keyup', searchPlaces);
document.getElementById('searchBtn').addEventListener('click', searchPlaces);

// Initially display all places.
displayItem(categories);
