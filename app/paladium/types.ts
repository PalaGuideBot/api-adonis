export type ApiResponseError = {
  type: 'API_ERROR' | 'INVALID_REQUEST_ERROR' | 'AUTHORIZATION_ERROR'
  message: string
}

export type ClickerBuilding = {
  name: string
  label: string
  base_production: number
  base_price: number
}
