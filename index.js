const express = require("express");
const cors = require("cors");
const http = require("http");
// uncomment jwt related for authorization
// const jwt = require("express-jwt");
const validateToken = require("./middleware/validate-token");

const { pathToRegexp } = require("path-to-regexp");
const moment = require("moment-timezone");
moment.tz.setDefault("America/Bogota"); // SET DEFAULT TIMEZONE TO TARGET COUNTRY

require("dotenv").config(); // LOAD CONFIG FROM .env FILE

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const URL = process.env.URL || "localhost";
const PORT = process.env.PORT || 3000;
const PROTOCOL = process.env.IS_SECURE ? "https" : "http";
process.env.PROTOCOL = PROTOCOL;
const SECRET = { secret: process.env.SECRET || "toor" };

const noJwtPaths = [
    pathToRegexp("/v1"),
    pathToRegexp("/v1/users/register"), 
	pathToRegexp("/v1/users/login"), 
	pathToRegexp("/v1/users/login/social")
];

//app.use(jwt(SECRET).unless({path: noJwtPaths}));
//app.use(validateToken);

/*
    Create routes ex:


    const UserRoutes = require("./routes/user-routes");
    const userRoutes = new UserRoutes();

    app.use('/v1/users', userRoutes.getRoutes());
*/

const ExampleRoutes = require("./routes/example");
const exampleRoutes = new ExampleRoutes();
app.use("/v1", exampleRoutes.getRoutes());

server.listen(PORT, () => console.log(`server running in ${PROTOCOL}://${URL}:${PORT}`))