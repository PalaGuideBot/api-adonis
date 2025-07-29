import mongoose, { Connection, Schema } from 'mongoose'

interface PaladiumStatusData {
  date: string
  newDate: Date
  data: {
    java: {
      global: {
        status: string
        players: number
      }
      factions: {
        Aeloria: string
        Egopolis: string
        Runegard: string
        Kilmordra: string
        Xanoth: string
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
  newDate: {
    type: Date,
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
        Aeloria: {
          type: String,
          required: true,
        },
        Egopolis: {
          type: String,
          required: true,
        },
        Runegard: {
          type: String,
          required: true,
        },
        Kilmordra: {
          type: String,
          required: true,
        },
        Xanoth: {
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

const dbConnection: Connection = mongoose.connection.useDb('paladium')
const PaladiumStatus = dbConnection.model<PaladiumStatusData>('status', paladiumStatusSchema)

export default PaladiumStatus
