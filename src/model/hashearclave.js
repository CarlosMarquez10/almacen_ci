// hashPassword.js
import bcrypt from 'bcrypt';

const plainPassword = 'consorcio.2025*';

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log(`Contraseña hasheada: ${hash}`);
});
