const express = require("express");
const path = require("path");
const mongoose= require("mongoose");
const UserRoutes = require("../modules/users/routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4002;
    this.usersPath = "/users";

    this.middleware();

    this.routes();


    this.connectionDb();
  }

  async connectionDb() {
    await mongoose.connect(process.env.MONGO_URI);
  }
  middleware() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(express.json());
  }

  routes() {
    ///Todas las rutas de la api
    this.app.use(this.usersPath, UserRoutes);
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
