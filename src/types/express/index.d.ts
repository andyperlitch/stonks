declare namespace Express {
  // tslint:disable-next-line:no-empty-interface
  interface AuthInfo {}
  // tslint:disable-next-line:no-empty-interface
  interface User {
    id: string
    email: string
    username: string
    googleId: string
    thumbnail: string
  }

  interface Request {
    authInfo?: AuthInfo
    user?: User
  }
}
