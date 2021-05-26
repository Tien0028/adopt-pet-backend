import { Module } from '@nestjs/common';
import { AdoptGateway } from './gateway/adopt.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import PetEntity from '../infrastructure/entities/pet.entity';
import { IAdoptPetServiceProvider } from '../core/primary-ports/adopt-pet.service.interface.';
import { AdoptPetService } from '../core/services/adopt-pet.service';
import PersonEntity from '../infrastructure/entities/person.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, PersonEntity])],
  providers: [
    AdoptGateway,
    {
      provide: IAdoptPetServiceProvider,
      useClass: AdoptPetService,
    },
  ],
})
export class AdoptPetModule {}
