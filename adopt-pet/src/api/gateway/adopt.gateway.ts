import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Pet } from '../../core/models/pet.model';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import {
  IAdoptPetService,
  IAdoptPetServiceProvider,
} from '../../core/primary-ports/adopt-pet.service.interface.';

@WebSocketGateway()
export class AdoptGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IAdoptPetServiceProvider)
    private adoptPetService: IAdoptPetService,
  ) {}

  @SubscribeMessage('add-pet')
  async handleAdd(@MessageBody() data: Pet, @ConnectedSocket() client: Socket) {
    const pet: Pet = {
      id: data.id,
      name: data.name,
      description: data.description,
    };
    try {
      const petCreated = await this.adoptPetService.createPet(pet);
      client.emit('pet-created-success', petCreated);
    } catch (e) {
      client.emit('pet-created-error', e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('allPets', await this.adoptPetService.getAllPets());
  }

  async handleDisconnect(client: Socket, ...args: any): Promise<any> {
    console.log('Client Disconnect', client.id);
    client.emit('allPets', await this.adoptPetService.getAllPets());
  }
}
