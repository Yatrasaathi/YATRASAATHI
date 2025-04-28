// Sample data for blog posts
const blogPosts = [
    {
        title: "Exploring the Hidden Gems of India",
        image: "images/hidden-gems.jpg",
        excerpt: "Discover lesser-known destinations that offer unique experiences away from the usual tourist trails."
    },
    {
        title: "Sustainable Travel: Tips for Eco-Conscious Tourists",
        image: "images/sustainable-travel.jpg",
        excerpt: "Learn how to minimize your environmental impact while exploring new places."
    }
];

// Sample data for sustainability items
const sustainabilityItems = [
    {
        title: "Eco-Friendly Practices",
        description: "We encourage the use of public transportation, support local businesses, and promote low-impact travel experiences."
    },
    {
        title: "Community Engagement",
        description: "Collaborating with local communities to ensure tourism benefits everyone involved."
    },
    {
        title: "Conservation Efforts",
        description: "Partnering with environmental organizations to protect natural habitats and wildlife."
    }
];

// Function to render blog posts
function renderBlogPosts() {
    const blogContainer = document.querySelector('.blog-posts');
    blogPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      `;
        blogContainer.appendChild(postDiv);
    });
}

// Function to render sustainability items
function renderSustainabilityItems() {
    const sustainabilityContainer = document.querySelector('.sustainability-content');
    sustainabilityItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('sustainability-item');
        itemDiv.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
        sustainabilityContainer.appendChild(itemDiv);
    });
}

// Run these functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    renderBlogPosts();
    renderSustainabilityItems();
});
