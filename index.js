import fetch from "node-fetch"
// module.exports = () => {
//   // ...
// };
const url = "https://www.google.com";
fetch(url)
  .then((response) => console.log(response.status))
  .catch((error) => console.log(error));

