"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const PORT = process.env.PORT;
index_1.app.listen(PORT, () => {
    console.log("Server Started Successfully!!!");
});
//# sourceMappingURL=server.js.map