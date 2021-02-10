import {
  Controller,
  Body,
  Get,
  Param,
  Post,
  NotFoundException,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { ServiceResponse } from '../common/serviceResponse';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() userData: any): Promise<ServiceResponse> {
    try {
      const { password } = userData;

      // hash password
      const hash = await argon2.hash(password);
      // console.log(`
      //   Password hashing!!!!
      //   Password: ${password},
      //   Hash: ${hash}
      // `);
      // make user
      const createdUser = await this.userService.create({
        ...userData,
        password: hash,
      });

      // remove password from createdUser and return the rest
      const data = (() => {
        const { password, ...data } = createdUser;
        return data;
      })();

      // send response
      return new ServiceResponse({
        isSuccess: true,
        timeStamp: Date.now(),
        messgae: 'User registered',
        data,
      });
    } catch (error) {
      console.error(error);
      return new ServiceResponse({
        isSuccess: true,
        timeStamp: Date.now(),
        messgae: 'Error occured registering user',
        data: {},
      });
    }
  }

  @Post('login')
  async login(
    @Body() userData: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ServiceResponse> {
    try {
      const { username, password } = userData;
      console.log('login: ', { username, password });
      // find the user
      const user = await this.userService.findOne({ username });
      // if not user, throw error
      if (!user) {
        console.log('No user ', { user });
        throw new NotFoundException('User not found');
      }
      // check to see if the passwords match. If they don't match, throw an error
      else if (!argon2.verify(user.password, password)) {
        console.log("Passwords don't match ", {
          verified: argon2.verify(user.password, password),
        });
        throw new BadRequestException('Invalid login credentials');
      } else {
        // make a token
        const token = await this.jwtService.signAsync({ id: user.id });

        console.log('Token time ', { token });

        // put the token in a a cookie
        response.cookie('token', token, { httpOnly: true });

        return new ServiceResponse({
          isSuccess: true,
          timeStamp: Date.now(),
          messgae: 'User logged in',
          data: {
            token,
          },
        });
      }
    } catch (error) {
      console.error(error);
      return new ServiceResponse({
        isSuccess: false,
        timeStamp: Date.now(),
        messgae: 'Login failed',
        data: {},
      });
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');

    return new ServiceResponse({
      isSuccess: true,
      timeStamp: Date.now(),
      messgae: 'User logged out',
      data: {},
    });
  }
}
