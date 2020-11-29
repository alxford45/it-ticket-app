import axios from "axios";

/* 
If serve static dev -> host = localhost:3000
If concurrent dev   -> host = localhost:5000
If production       -> host = 'https://lsu-it-support-demo.herokuapp.com/'
*/
// const PORT = process.env.PORT || 5000;
// const HOST = process.env.HOST || `localhost:${PORT}`

/* Heroku env vars not working :( */
const LAZY = 'https://lsu-it-support-demo.herokuapp.com/api/'
export default axios.create({
  // baseURL: `http://${HOST}/api/`,
  baseURL: LAZY
});
