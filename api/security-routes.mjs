import { User } from "./db.mjs"

const routes = async (app, _options) => {
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

  app.post("/login", opts, async (request, response) => {
		const user = await User.findOne({
			where: {
				email: request.body.email,
				password: request.body.password
			}
		})

		if (user === null) {
      return response.code(400).send({
        statusCode: 400,
        error: "Bad Request",
        message: "Bad credentials",
      })
		} else {
			const token = app.jwt.sign({ id: user.get("id") })
			return response
				.setCookie("token", token, {
					sameSite: "none",
					secure: true,
				})
				.send()
		}
  })

  app.post("/logout", async (_request, response) => {
    response.clearCookie("token", { sameSite: "none", secure: true }).send()
  })

  app.get(
    "/check_login",
    { onRequest: [app.authenticate] },
    async (_request, response) => {
      response.code(200).send()
    }
  )
}

export default routes
