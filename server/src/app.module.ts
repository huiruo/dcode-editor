import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getDirFilenames } from './common/utils/getDirFilenames'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './user/auth.guard'
import { dbConfig } from '../config/db'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [...getDirFilenames({ environment: process.env.NODE_ENV })],
    }),
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
