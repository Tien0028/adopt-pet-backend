import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PetEntity from '../../infrastructure/entities/pet.entity';
import { Repository } from 'typeorm';
import { IAdoptPetService } from '../primary-ports/adopt-pet.service.interface.';
import { Pet } from '../models/pet.model';
import { PersonModel } from '../models/person.model';
import PersonEntity from '../../infrastructure/entities/person.entity';

@Injectable()
export class AdoptPetService implements IAdoptPetService {
  allPets: Pet[] = [];
  constructor(
    @InjectRepository(PetEntity)
    private adoptPetRepository: Repository<PetEntity>,
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  //Test Method:
  addPet(): void {
    const testPet: Pet = {
      id: 1,
      name: 'Tony',
      description: 'This guy needs a new home... He burned down his last one',
      age: '1 year',
      type: 'Hawk',
      address: 'Kongensgade 40, Esbjerg',
      isBooked: false,
    };
    this.adoptPetRepository.create(testPet);
    this.adoptPetRepository
      .save(testPet)
      .then((testPet) => {
        console.log('Pet has been found', testPet);
      })
      .catch((err) => {
        console.log('Error:', err);
      })
      .finally(() => {
        console.log('Finally called');
      });
  }

  async createPet(pet: Pet): Promise<Pet> {
    try {
      const petCreated = await this.adoptPetRepository.create({
        name: pet.name,
        description: pet.description,
        age: pet.age,
        type: pet.type,
        address: pet.address,
        isBooked: false,
      });
      await this.adoptPetRepository.save(petCreated);
      return petCreated;
    } catch (e) {
      console.log('Catch an error', e);
    }
  }

  async getAllPets(): Promise<Pet[]> {
    const pets = await this.adoptPetRepository.find();
    console.log('Pets = ', pets);
    const allPets: Pet[] = JSON.parse(JSON.stringify(pets));
    console.log('getAllPets total:', allPets.length);
    return allPets;
  }

  async getAllPersons(): Promise<PersonModel[]> {
    const persons = await this.personRepository.find();
    console.log('Persons = ', persons);
    const allPersons: PersonModel[] = JSON.parse(JSON.stringify(persons));
    console.log('getAllPets total:', allPersons.length);
    return allPersons;
  }

  async createPerson(p: PersonModel): Promise<PersonModel> {
    try {
      const personCreated = await this.personRepository.create({
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        phoneNumber: p.phoneNumber,
        pet: p.pet,
      });
      await this.personRepository.save(personCreated);
      return personCreated;
    } catch (e) {
      console.log('Catch an error', e);
    }
  }

  async getPet(petId: number): Promise<Pet> {
    console.log('id ==' + petId);
    const petDB = await this.adoptPetRepository.findOne({ id: petId });
    const pet: Pet = JSON.parse(JSON.stringify(petDB));
    return pet;
  }

  async updatePet(petFound: Pet): Promise<void> {
    const update = { isBooked: true };
    const updatedPet = await this.adoptPetRepository.update(
      petFound.id,
      update,
    );
    return undefined;
  }
}
