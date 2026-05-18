exports.generatePassword = length => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pw = '';
  for (let i = 0; i < length; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
  return pw;
};