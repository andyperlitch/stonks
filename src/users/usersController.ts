import { ValidateErrorJSON } from './../errors'
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
} from 'tsoa'
import { User } from './user'
import { UsersService, UserCreationParams } from './usersService'

@Route('users')
export class UsersController extends Controller {
  @Get('{userId}')
  public async getUser(
    @Path() userId: string,
    @Query() name?: string,
  ): Promise<User> {
    return new UsersService().get(userId, name)
  }

  @Response<ValidateErrorJSON>(422, 'Validation Failed')
  @SuccessResponse('201', 'Created') // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams,
  ): Promise<void> {
    this.setStatus(201) // set return status 201
    new UsersService().create(requestBody)
    return
  }
}
