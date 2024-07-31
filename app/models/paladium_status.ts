import { model, Schema } from 'mongoose'

interface PaladiumStatusData {
  date: string
  data: {
    java: {
      global: {
        status: string
        players: number
      }
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
}

const paladiumStatusSchema = new Schema<PaladiumStatusData>({
  date: {
    type: String,
    required: true,
  },
  data: {
    java: {
      global: {
        status: {
          type: String,
          required: true,
        },
        players: {
          type: Number,
          required: true,
        },
      },
      factions: {
        Soleratl: {
          type: String,
          required: true,
        },
        Muzdan: {
          type: String,
          required: true,
        },
        Manashino: {
          type: String,
          required: true,
        },
        Event: {
          type: String,
          required: true,
        },
        Luccento: {
          type: String,
          required: true,
        },
        Imbali: {
          type: String,
          required: true,
        },
        Keltis: {
          type: String,
          required: true,
        },
        Neolith: {
          type: String,
          required: true,
        },
        Untaa: {
          type: String,
          required: true,
        },
      },
    },
    launcher: {
      status: {
        type: String,
        required: true,
      },
    },
  },
})

const PaladiumStatus = model<PaladiumStatusData>('MapStatus', paladiumStatusSchema)

export default PaladiumStatus
