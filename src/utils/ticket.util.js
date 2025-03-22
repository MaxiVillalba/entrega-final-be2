export function generateTicket(user) {
  if (
    !user || 
    typeof user.userName !== "string" || 
    typeof user.userLastName !== "string" || 
    !user.userName.trim() || 
    !user.userLastName.trim()
  ) {
    throw new Error("Valid user name and last name are required for ticket generation.");
  }

  // Generar iniciales del usuario
  const initials = `${user.userName.charAt(0)}${user.userLastName.charAt(0)}`.toUpperCase();

  // Obtener fecha en formato MMYY (Mes/Año)
  const now = new Date();
  const datePart = `${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getFullYear()).slice(-2)}`;

  // Generar 4 dígitos aleatorios
  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  // Construir el código del ticket
  const ticketCode = `${initials}${datePart}-${randomDigits}`;

  return {
    userName: user.userName,
    userLastName: user.userLastName,
    ticketCode,
  };
}
