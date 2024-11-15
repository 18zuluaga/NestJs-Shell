import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly myService: UsersService) {}

  @WebSocketServer()
  server: Server;

  // Guardamos un intervalo para emitir datos continuamente
  private static intervalId: NodeJS.Timeout;

  handleConnection(client: Socket) {
    console.log('Client connected', client.id);

    // Iniciar el envío de información continua si no se está enviando ya
    if (!WebsocketGateway.intervalId) {
      WebsocketGateway.intervalId = setInterval(() => {
        this.emitConstantData();
      }, 2000); // Cada 2 segundos, ajusta el tiempo según lo necesites
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected', client.id);
    // Si no quedan más clientes conectados, detener el intervalo
    if (this.server.engine.clientsCount === 0) {
      clearInterval(WebsocketGateway.intervalId);
      WebsocketGateway.intervalId = null;
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any) {
    const users = await this.myService.findAll();
    // Emite la lista de usuarios a todos los clientes conectados
    this.server.emit('messageServers', users);
  }

  private async emitConstantData() {
    const users = await this.myService.findAll(); // Obtén los usuarios si eso es lo que quieres enviar
    this.server.emit('messageServers', users); // Envia la lista de usuarios a todos los clientes
  }
}
