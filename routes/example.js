const router = require("express").Router();
class ExampleRoutes {
    getRoutes() {
        router.get("/", async (req, res) => {
            res.status(200).send({code: 200, msg: "Hello World"});
        });
        return router;
    }
}

module.exports = ExampleRoutes;