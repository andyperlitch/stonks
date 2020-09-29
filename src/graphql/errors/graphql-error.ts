export class GraphQLError extends Error {
  constructor(public code: string, message?: string) {
    super(message || code)
  }
}
