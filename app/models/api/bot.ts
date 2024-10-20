import mongoose, { Connection, Schema } from 'mongoose'

interface Interaction {
  name: string
  count: number
}

interface Guild {
  name: string
  icon?: string
  memberCount: number
  id: string
}

interface Bot {
  date: string
  newDate: Date
  interactions: Interaction[]
  guilds: Guild[]
  users: number
}

const interactionSchema = new Schema<Interaction>({
  name: String,
  count: Number,
})

const guildSchema = new Schema<Guild>({
  name: String,
  icon: String,
  memberCount: Number,
  id: String,
})

const botSchema = new Schema<Bot>({
  date: String,
  newDate: Date,
  interactions: [interactionSchema],
  guilds: [guildSchema],
  users: Number,
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const Bot = dbConnection.model<Bot>('bot', botSchema)

export default Bot
