import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidateLoginDtoMiddleware, ValidateUser } from './auth.middleware';
import { UserService } from 'src/user/user.service';
import { ErrorModule } from 'src/error/error.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10s'}
    }),
    ErrorModule, 
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      ValidateLoginDtoMiddleware,
      ValidateUser
    ).forRoutes({ 
        path: 'auth/*', 
        method: RequestMethod.ALL 
    })
  }
}
