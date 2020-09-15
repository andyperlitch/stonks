// src/users/usersService.ts
import { User } from './user'

// A post request should not contain an id.
export type UserCreationParams = Pick<User, 'email' | 'name' | 'dob'>

export class UsersService {
  public get(id: string, name?: string): User {
    return {
      id,
      email: 'jane@doe.com',
      name: name ?? 'Jane Doe',
      dob: 'Mon, 23 May 1988 07:00:00 GMT',
    }
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000).toString(), // Random
      ...userCreationParams,
    }
  }
}
