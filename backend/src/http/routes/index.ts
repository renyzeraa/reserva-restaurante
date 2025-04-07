import { app } from "@/app"
import { userRoutes } from "./usuario.routes"
import { mesaRoutes } from "./mesa.routes"
import { reservaRoutes } from "./reserva.routes"

export async function allRoutes() {
  await app.register(userRoutes)
  await app.register(mesaRoutes)
  await app.register(reservaRoutes)
}