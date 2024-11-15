import { Module } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([User]),UsersModule],
  providers: [WebsocketGateway, UsersService],
})
export class GatewayModule {}