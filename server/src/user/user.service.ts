import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { GoogleAuthType, Result, ResultWithData } from 'src/types'
import { fail, success } from 'src/common/constant'
import { Page } from './page.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepo: Repository<Page>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }

  async queryPage(id: string): Promise<ResultWithData<Page>> {
    try {
      if (!id) {
        throw new Error('query id should not be null')
      }

      const page = await this.pageRepo.findOne({ where: { id: Number(id) } })
      return {
        code: success,
        msg: 'ok',
        data: page
      }
    } catch (error) {
      return {
        code: fail,
        msg: error.toString() || 'create user error',
        data: null
      }
    }
  }

  async register(params: User): Promise<Result> {
    try {
      if (!params.password || !params.username) {
        throw new Error('password or username should not be null')
      }

      await this.userRepo.save({
        ...params
      })

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      return { code: fail, msg: error.toString() || 'create user error' }
    }
  }

  async savePage(params: Page): Promise<Result> {
    try {
      if (!params.pageText) {
        throw new Error('pageText should not be null')
      }

      const page = await this.pageRepo.findOne({ where: { id: Number(params.id) } })
      if (page) {
        await this.pageRepo.update({ id: Number(params.id) }, params)
      } else {
        delete params.id
        await this.pageRepo.save({
          ...params
        })
      }

      return {
        code: success,
        msg: 'ok',
      }
    } catch (error) {
      return { code: fail, msg: error.toString() || 'create page error' }
    }
  }

  async login(params: User): Promise<Result> {
    try {
      const user = await this.userRepo.findOne({ where: { username: params.username } })
      if (user && user.password === params.password) {
        return {
          code: success,
          msg: 'ok',
        }
      } else {
        throw new Error('The account or password is incorrect')
      }

    } catch (error) {
      return { code: fail, msg: error.toString() || 'login error' }
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.findUserById(id)
    this.userRepo.delete(id)
  }

  async updateUser(id: number, user: User): Promise<void> {
    await this.findUserById(id)
    delete user.id
    this.userRepo.update(id, user)
  }

  async findUser(id: number): Promise<User[]> {
    return this.findUserById(id)
  }

  async findOneByName(userName: string): Promise<User[]> {
    return this.findUserByUserName(userName)
  }

  async findOneByEmail(email: string): Promise<User[]> {
    return this.findUserByUserName(email)
  }

  async handlerGoogleAuth(
    userInfo: GoogleAuthType,
  ): Promise<ResultWithData<User>> {
    try {
      const { email } = userInfo
      const users = await this.findUserByUserName(email)
      if (users.length === 0) {
        const saveUserRes = await this.saveGoogleUser(userInfo)
        return {
          code: success,
          msg: 'Sign in successfully with google,saved',
          data: saveUserRes,
        }
      }

      return {
        code: success,
        msg: 'Sign in successfully with google,saved before',
        data: null,
      }
    } catch (error) {
      return {
        code: fail,
        msg: error.sqlMessage || 'handlerGoogleAuth error',
        data: null,
      }
    }
  }

  private async findUserById(id: number): Promise<User[]> {
    const users = (await this.userRepo.find({
      where: {
        id,
      },
    })) as User[]

    if (!users.length) {
      throw new HttpException(`指定 id=${id} 的用户不存在`, 404)
    }

    return users
  }

  private async findUserByUserName(username: string): Promise<User[]> {
    const users = await this.userRepo.find({
      where: {
        username,
      },
    })

    if (!users.length) {
      throw new HttpException(`指定 username=${username} 的用户不存在`, 404)
    }
    return users
  }

  private async saveGoogleUser(userInfo: GoogleAuthType): Promise<User> {
    const { email } = userInfo

    const user = new User()
    user.username = email
    user.password = null

    return await this.userRepo.save(user)
  }
}
