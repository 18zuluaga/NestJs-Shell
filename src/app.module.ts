import { UsersModule }        from './users/users.module';
import { Module }             from '@nestjs/common';
import { ConfigModule }       from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabaseModule } from './database.module';
import { GatewayModule } from './websockets/websocket.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GatewayModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
