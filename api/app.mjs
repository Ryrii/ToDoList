import fastify from "fastify"
import fastifyPlugin from "fastify-plugin"
import userRoutes from "./user-routes.mjs"
import securityRoutes from "./security-routes.mjs"
import listRoutes from "./list-routes.mjs"
import taskRoutes from "./task-routes.mjs"
import fastifyJWT from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import cors from "@fastify/cors"
import { db, User } from "./db.mjs"

const app = fastify({
  logger: true,
})

app.register(cors, { origin: "http://localhost:3000", credentials: true })

app.register(
  fastifyPlugin(async (app) => {
    app.register(fastifyJWT, {
      secret: "supersecret",
      cookie: {
        cookieName: "token",
      },
    })

    app.decorate("authenticate", async (request, response) => {
      try {
        await request.jwtVerify()
				const user = await User.findByPk(request.user.id)
				request.user = user
      } catch (err) {
        response.send(err)
      }
    })
  })
)

app.register(fastifyCookie, {
  secret: "supersecret",
})

app.register(userRoutes)
app.register(securityRoutes)
app.register(listRoutes)
app.register(taskRoutes)

const start = async () => {
  try {
		await db.sync()
    await app.listen({ port: 5000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
