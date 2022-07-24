module.exports = app => {
    const instruments = require("../controllers/instrument.controller");
    const router = require("express").Router();

    router.post("/", instruments.create)
    router.get("/", instruments.findAll)
    app.use("/api/instruments", router)
}