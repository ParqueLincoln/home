const API = "http://localhost:3000/usuarios"; // Asegúrate de tener json-server activo

// Iniciar sesión
async function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("loginMessage");

  try {
    const res = await fetch(`${API}?usuario=${user}`);
    const data = await res.json();

    if (data.length === 0) {
      msg.textContent = "Usuario no encontrado.";
      return;
    }

    const account = data[0];
    if (account.clave !== pass) {
      msg.textContent = "Contraseña incorrecta.";
      return;
    }

    msg.textContent = "Bienvenido!";
    localStorage.setItem("usuario", JSON.stringify(account));
    window.location.href = "index.html";
  } catch (err) {
    msg.textContent = "Error al conectar con el servidor.";
  }
}

// Crear nueva cuenta
async function register() {
  const usuario = document.getElementById("newUsername").value;
  const email = document.getElementById("newEmail").value;
  const clave = document.getElementById("newPassword").value;
  const msg = document.getElementById("registerMessage");

  const res = await fetch(`${API}?usuario=${usuario}`);
  const users = await res.json();

  if (users.length > 0) {
    msg.textContent = "El usuario ya existe.";
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ usuario, correo: email, clave })
  });

  msg.textContent = "Cuenta creada. Ya puedes iniciar sesión.";
}

// Recuperar contraseña
async function recoverPassword() {
  const correo = document.getElementById("resetEmail").value;
  const msg = document.getElementById("resetMessage");

  const res = await fetch(`${API}?correo=${correo}`);
  const usuarios = await res.json();

  if (usuarios.length === 0) {
    msg.textContent = "Correo no registrado.";
    return;
  }

  msg.textContent = "Se ha enviado un enlace (simulado) a tu correo.";
}
