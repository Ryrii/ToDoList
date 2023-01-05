const routes = async (app, _options) => {
  app.register(
    async (app) => {
      app.put(
        "/:taskId",
        { onRequest: [app.authenticate], schema: putSchema },
        async (request, response) => {
					const [task] = await request.user.getTasks({
						where: {
							id: request.params.taskId
						}
					})

					if (!task) {
						return response.code(404).send()
					}

					task.set(request.body)

					const newTask = await task.save()

					return response.code(200).send(newTask)
        }
      )

			app.delete("/:taskId", { onRequest: [app.authenticate] }, async (request, response) => {
				const [task] = await request.user.getTasks({
					where: {
						id: request.params.taskId
					}
				})

				if (!task) {
					return response.code(404).send()
				}

				await task.destroy()

				return response.code(200).send()
			})
    },
    { prefix: "/task" }
  )
}

export default routes

const properties = {
  name: { type: "string" },
  description: { type: "string" },
  dueDate: { type: "string" },
}

const putSchema = {
  body: {
    type: "object",
    properties,
  },
}
