import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Pet } from '../../core/models/pet.model';
import { Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import {
  IAdoptPetService,
  IAdoptPetServiceProvider,
} from '../../core/primary-ports/adopt-pet.service.interface.';
import { PersonModel } from '../../core/models/person.model';

@WebSocketGateway()
export class AdoptGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IAdoptPetServiceProvider)
    private adoptPetService: IAdoptPetService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('add-pet')
  async handleAdd(@MessageBody() data: Pet, @ConnectedSocket() client: Socket) {
    const pet: Pet = {
      id: data.id,
      name: data.name,
      description: data.description,
      age: data.age,
      type: data.type,
      address: data.address,
      isBooked: false,
    };
    try {
      const petCreated = await this.adoptPetService.createPet(pet);
      client.emit('pet-created-success', petCreated);
    } catch (e) {
      client.emit('pet-created-error', e.message);
    }
  }

  @SubscribeMessage('allPets')
  async handleAllPetsEvent(@ConnectedSocket() client: Socket): Promise<void> {
    try {
      console.log('Event registered');
      const pets = await this.adoptPetService.getAllPets();
      this.server.emit('allPets', pets);
    } catch (e) {
      client.error(e.message);
    }
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log('Client Connect', client.id);
    client.emit('allPets', await this.adoptPetService.getAllPets());
    console.log('Pets');
  }

  async handleDisconnect(client: Socket, ...args: any): Promise<any> {
    console.log('Client Disconnect', client.id);
    client.emit('allPets', await this.adoptPetService.getAllPets());
  }

  @SubscribeMessage('allPersons')
  async handleAllPersonsEvent(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const allPersons = await this.adoptPetService.getAllPersons();
      console.log(allPersons.length + ' names: ' + allPersons);
      client.emit('allPersons', allPersons);
    } catch (e) {
      client.error(e.message);
    }
  }

  @SubscribeMessage('create-person')
  async handleCreatePerson(
    @MessageBody() person: PersonModel,
    @ConnectedSocket() client: Socket,
  ) {
    const petFound = await this.adoptPetService.getPet(person.pet.id);
    await this.adoptPetService.updatePet(petFound);
    const p: PersonModel = {
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      phoneNumber: person.phoneNumber,
      pet: petFound,
    };
    try {
      const personCreated = await this.adoptPetService.createPerson(p);
      const allPersons = await this.adoptPetService.getAllPersons();
      console.log(allPersons.length + ' names: ' + allPersons);
      client.emit('allPersons', allPersons);
      //client.emit('person-created-success', personCreated);
    } catch (e) {
      client.emit('person-created-error', e.message);
    }
  }
}
