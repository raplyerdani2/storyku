export const loginPage = (root, onSubmit) => {
  root.innerHTML = `
      <div id="toContent" class="loginContainer">
        <div class="loginContainer2">
          <h1>Login</h1>
          <form id="loginForm">
            <label tabindex="0">Email</label>
            <input type="email" placeholder="Email" name="email" required />
            <label tabindex="0">Pasword</label>
            <input type="password" placeholder="Password" name="password" required />
            <button type="submit">Login</button>
          </form>
          <p>Belum punya akun? <a href="#/register">Register</a></p>
        </div>
      </div>
  `;
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "none";
  footer.style.display = "none";

  root.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    onSubmit(formData);
  });
};
