export const registerPage = (root, onSubmit) => {
  root.innerHTML = `
      <div id="toContent" class="registerContainer">
        <div class="registerContainer2">
          <h1>Register</h1>
          <form id="registerForm">
            <label tabindex="0">Name</label>
            <input type="text" placeholder="Name" name="name" tabindex="0" required />
            <label tabindex="0">Email</label>
            <input type="email" placeholder="Email" name="email" tabindex="0" required />
            <label tabindex="0">Password</label>
            <input type="password" placeholder="Password" name="password" tabindex="0" required />
            <button type="submit">Register</button>
          </form>
          <p>Sudah punya akun? <a href="#/login">Login</a></p>
        </div>
      </div>
  `;
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  header.style.display = "none";
  footer.style.display = "none";

  root.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    onSubmit(formData);
  });
};
