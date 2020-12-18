export const auth = () => {
  try {
    const result = localStorage.getItem("userProfile");
    console.log("Result", result);
    return result;
  } catch (error) {
    console.log("errror", error);
  }
};
