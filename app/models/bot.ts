import { model, Schema } from 'mongoose'

interface Interaction {
  name: string
  count: number
}

interface Guild {
  name: string
  icon: string
  memberCount: number
  id: string
}

interface Bot {
  date: string
  interaction: Interaction[]
  guilds: Guild[]
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
  interaction: [interactionSchema],
  guilds: [guildSchema],
})

const Bot = model<Bot>('Bot', botSchema)

export default Bot
