export type ApiResponseError = {
  type: 'API_ERROR' | 'INVALID_REQUEST_ERROR' | 'AUTHORIZATION_ERROR'
  message: string
}
