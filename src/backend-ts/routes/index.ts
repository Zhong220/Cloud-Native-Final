import { default as authRouter } from "./auth/controller.ts";
import { default as groupsRouter } from "./groups/controller.ts";
import { default as channelRouter } from "./channel/controller.ts";
import { Router } from "express";

type Route = {
  routeAddress: string;
  routeProp: Router;
};

// Integration of routers
const routes: Route[] = [
  { routeAddress: "/auth", routeProp: authRouter },
  { routeAddress: "/groups", routeProp: groupsRouter },
  { routeAddress: "/channel", routeProp: channelRouter },
];

export default routes;
