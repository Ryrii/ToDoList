import { User } from "./db.mjs"

const routes = async (app, _options) => {
  app.register(
    async (app) => {
      /**
       * @type {import("fastify").RouteShorthandOptions}
       */
      const opts = {
        schema: {
          body: {
            type: "object",
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
            required: ["email", "password"],
          },
        },
      }

      app.post("/", opts, async (request, response) => {
				await User.create({
					email: request.body.email,
					password: request.body.password
				})

				return response.code(201).send()
      })
    },
    { prefix: "/user" }
  )
}

export default routes
