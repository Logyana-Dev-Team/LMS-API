const express = require("express");
const authRoute = require("./Auth.routes");
const userRoute = require("./User.routes");
const leadsRoute = require("./Leads.routes");
const courseRoute = require("./Course.routes");
const moduleRoute = require("./Module.routes");
const chapterRoute = require("./Chapter.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/leads",
    route: leadsRoute,
  },
  {
    path: "/course",
    route: courseRoute,
  },
  {
    path: "/module",
    route: moduleRoute,
  },
  {
    path: "/chapter",
    route: chapterRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
