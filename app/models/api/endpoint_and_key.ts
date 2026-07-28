import mongoose, { type Connection, Schema } from 'mongoose'

interface Endpoint {
  endpoint: string
  count: number
  time: number[]
}

interface Key {
  key: string
  count: number
  ip: string[]
}

interface EndpointAndKey {
  date: string
  newDate: Date
  endpoints: Endpoint[]
  keys: Key[]
}

const endpointSchema = new Schema<Endpoint>({
  endpoint: String,
  count: Number,
  time: [Number],
})

const keySchema = new Schema<Key>({
  key: String,
  count: Number,
  ip: [String],
})

const endpointAndKeySchema = new Schema<EndpointAndKey>({
  date: String,
  newDate: Date,
  endpoints: [endpointSchema],
  keys: [keySchema],
})

const dbConnection: Connection = mongoose.connection.useDb('api')
const EndpointAndKey = dbConnection.model<EndpointAndKey>('stats', endpointAndKeySchema)

export default EndpointAndKey
