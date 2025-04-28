document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from submitting

  let role = document.getElementById("role").value;
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!role) {
    alert("Please select a user type.");
    return;
  }

  if (email === "" || password === "") {
    alert("Please fill in both fields.");
    return;
  }

  let baseURL = "http://localhost:7000";
  let loginRoute = "";

  if (role === "tourist") loginRoute = `${baseURL}/api/users/login`;
  else if (role === "guide") loginRoute = `${baseURL}/api/guides/login`;
  else if (role === "admin") loginRoute = `${baseURL}/api/admin/login`;

  try {
    const response = await fetch(loginRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // Save token and user ID to localStorage
      localStorage.setItem("token", result.token);

       // Store userId for booking and emails
      if (role === "tourist" && result.user?._id) {
        localStorage.setItem("userId", result.user._id);
      } else if (role === "guide" && result.guide?._id) {
        localStorage.setItem("userId", result.guide._id);
      }
      
      // Redirect based on user type
      if (role === "tourist") {
        window.location.href = `${baseURL}/TOURIST_1/SEARCH_1_3/after_login.html`;
      } else if (role === "guide") {
        window.location.href = `${baseURL}/GUIDE_2/AFTER-LOGIN_2_3/after_login.html`;
      } else if (role === "admin") {
        window.location.href = `${baseURL}/ADMIN_3/AFTER_LOGIN_3_1/dashboard.html`;
      }
    } else {
      alert(result.message || "Login failed. Please check your credentials.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("An error occurred during login.");
  }
});
