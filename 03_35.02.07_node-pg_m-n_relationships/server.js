/** Server startup for BizTime. */
const app = require("./app");
const PORT_NUMBER = 3000;

app.listen(PORT_NUMBER, () => {
    console.log(`Listening on ${PORT_NUMBER}`);
});