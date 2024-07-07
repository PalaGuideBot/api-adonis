import { model, Schema } from 'mongoose'

interface PaladiumStatusData {
  server: {
    status: string
    players: number
    factions: {
      Soleratl: string
      Muzdan: string
      Manashino: string
      Event: string
      Luccento: string
      Imbali: string
      Keltis: string
      Neolith: string
      Untaa: string
    }
  }
  launcher: {
    status: string
  }
}

const paladiumStatusSchema = new Schema<PaladiumStatusData>({
  server: {
    status: String,
    players: Number,
    factions: {
      Soleratl: String,
      Muzdan: String,
      Manashino: String,
      Event: String,
      Luccento: String,
      Imbali: String,
      Keltis: String,
      Neolith: String,
      Untaa: String,
    },
  },
  launcher: {
    status: String,
  },
})

const PaladiumStatus = model<PaladiumStatusData>('MapStatus', paladiumStatusSchema)

export default PaladiumStatus
