// // Se genera número de ticket por operación, en este caso, cuando el usuario de registra con exito y cuando se hace el checkout de la compra.

// export const generateTicket = (user) => {
//   // Validamos que el usuario tenga los campos necesarios
//   if (!user || !user.name || !user.lastName) {
//     throw new Error("User name and last name are required for ticket generation.");
//   }

//   const initials = `${user.name.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;

//   const date = new Date();
//   const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;

//   const operationNumber = Math.floor(Math.random() * 9000) + 1000;

//   const ticket = `${initials}${formattedDate}${operationNumber}`;

//   return ticket;
// };

// src/utils/ticket.util.js
export const generateTicket = (user) => {
  if (!user.name || !user.lastName) {
    throw new Error("User name and last name are required for ticket generation.");
  }

  // Lógica de generación de ticket
  const ticket = {
    userName: user.name,
    userLastName: user.lastName,
    ticketCode: `TICKET-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  };

  return ticket;
};

