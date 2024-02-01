export const errorHandler = (error: Error) => {
  const message = error?.message ?? "Something went wrong, please try again later.";
  console.warn("⛔️", { message, error });
  throw error;
};
