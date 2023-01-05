import { Sequelize, DataTypes } from "sequelize"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const db = new Sequelize({
	dialect: "sqlite",
	storage: path.join(fileURLToPath(new URL(".", import.meta.url)), "data.sqlite")
})

export const User = db.define("User", {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

export const Task = db.define("Task", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: DataTypes.STRING,
	dueDate: DataTypes.DATE,
	done: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
})

export const List = db.define("List", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

List.hasMany(Task, {
	onDelete: "CASCADE",
})

User.hasMany(Task, {
	onDelete: "CASCADE",
})

User.hasMany(List, {
	onDelete: "CASCADE",
})
