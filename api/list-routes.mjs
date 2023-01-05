import { List, Task } from "./db.mjs"

const routes = async (app, _options) => {
  app.register(
    async (app) => {
      app.get(
        "/",
        { onRequest: [app.authenticate] },
        async (request, response) => {
          const lists = await request.user.getLists({ include: Task })

          return response.code(200).send(lists)
        }
      )

      app.get(
        "/:listId",
        { onRequest: [app.authenticate] },
        async (request, response) => {
          const [list] = await request.user.getLists({
            where: {
              id: request.params.listId,
            },
            include: Task,
          })

          if (!list) {
            return response.code(404).send()
          }

          return response.code(200).send(list)
        }
      )

      app.post(
        "/",
        { onRequest: [app.authenticate], schema },
        async (request, response) => {
          const list = await List.create({
            name: request.body.name,
            UserId: request.user.id,
          })

          return response.code(201).send(list)
        }
      )

      app.put(
        "/:listId",
        { onRequest: [app.authenticate] },
        async (request, response) => {
          const [list] = await request.user.getLists({
            where: {
              id: request.params.listId,
            },
            include: Task,
          })

          if (!list) {
            return response.code(404).send()
          }

          list.set(request.body)

          const newList = await list.save()

          return response.code(200).send(newList)
        }
      )

      app.post(
        "/:listId/task",
        { onRequest: [app.authenticate] },
        async (request, response) => {
          const [list] = await request.user.getLists({
            where: {
              id: request.params.listId,
            },
          })

          if (!list) {
            return response.code(404).send()
          }

          const task = await Task.create({
            ...request.body,
            done: false,
            ListId: list.get("id"),
            UserId: request.user.get("id"),
          })

          return response.code(201).send(task)
        }
      )

      app.delete(
        "/:listId",
        { onRequest: [app.authenticate] },
        async (request, response) => {
          const [list] = await request.user.getLists({
            where: {
              id: request.params.listId,
            },
          })

          if (!list) {
            return response.code(404).send()
          }

          console.log(list)
          await list.destroy()

          return response.code(200).send()
        }
      )
    },
    { prefix: "/list" }
  )
}

export default routes

const schema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
    },
    required: ["name"],
  },
}
