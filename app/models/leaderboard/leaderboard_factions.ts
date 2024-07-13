import mongoose, { Schema, Document, Model } from 'mongoose'

// Interface pour les données de faction
interface FactionData {
  name: string
  value: number
  emblemUrl: string
}

// Interface pour la faction avec la date
interface Faction extends Document {
  date: string
  data: FactionData[]
}

// Sous-schéma pour FactionData
const factionDataSchema = new Schema<FactionData>({
  name: { type: String },
  value: { type: Number, required: true },
  emblemUrl: { type: String },
})

// Schéma principal pour la faction
const factionSchema = new Schema<Faction>({
  date: { type: String, required: true },
  data: { type: [factionDataSchema], required: true },
})

// Modèle Mongoose pour LeaderboardFactions
const LeaderboardFactions: Model<Faction> = mongoose.model<Faction>(
  'LeaderboardFactions',
  factionSchema
)

export default LeaderboardFactions
