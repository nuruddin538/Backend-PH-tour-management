export const getTransactionId = () => {
  return `tran_${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};
