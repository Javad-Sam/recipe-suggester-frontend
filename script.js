// Replace this with your actual deployed backend URL (Railway domain).
const BASE_URL = "https://<your-railway-app>.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
  // Buttons
  const btnRegister = document.getElementById("btnRegister");
  const btnLogin = document.getElementById("btnLogin");
  const btnLogout = document.getElementById("btnLogout");
  const btnGetRecipe = document.getElementById("btnGetRecipe");

  // Fields
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const ingredientsInput = document.getElementById("ingredients");
  const recipeOutput = document.getElementById("recipeOutput");

  // REGISTER
  btnRegister.addEventListener("click", async () => {
    const email = regEmail.value.trim();
    const password = regPassword.value.trim();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        credentials: "include", // <-- important to include cookies
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Registered successfully! User ID: ${data.userId}`);
      } else {
        alert(`Register error: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Register request failed:", err);
      alert("Register request failed. Check console.");
    }
  });

  // LOGIN
  btnLogin.addEventListener("click", async () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // <-- includes session cookies
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Login successful! User ID: ${data.userId}`);
      } else {
        alert(`Login error: ${data.error || "Invalid credentials"}`);
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Login request failed. Check console.");
    }
  });

  // LOGOUT
  btnLogout.addEventListener("click", async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include" // include cookies so server knows which session to destroy
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Logout successful!`);
      } else {
        alert(`Logout error: ${data.error}`);
      }
    } catch (err) {
      console.error("Logout request failed:", err);
      alert("Logout request failed. Check console.");
    }
  });

  // GET RECIPE
  btnGetRecipe.addEventListener("click", async () => {
    const ingredientsRaw = ingredientsInput.value.trim();
    if (!ingredientsRaw) {
      alert("Please enter some ingredients!");
      return;
    }

    // convert comma-separated string into an array
    const ingredientsArr = ingredientsRaw.split(",").map(s => s.trim());

    try {
      const res = await fetch(`${BASE_URL}/api/recipe`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients: ingredientsArr })
      });

      const data = await res.json();
      if (res.ok) {
        recipeOutput.textContent = data.recipe;
      } else {
        recipeOutput.textContent = `Error: ${data.error}`;
      }
    } catch (err) {
      console.error("Get recipe request failed:", err);
      recipeOutput.textContent = "Failed to get recipe. Check console.";
    }
  });
});
