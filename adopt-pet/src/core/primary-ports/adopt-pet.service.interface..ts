import { Pet } from '../models/pet.model';
import { PersonModel } from '../models/person.model';

export const IAdoptPetServiceProvider = 'IAdoptPetServiceProvider';
export interface IAdoptPetService {
  getAllPets(): Promise<Pet[]>;
  createPet(pet: Pet): Promise<Pet>;
  createPerson(p: PersonModel): Promise<PersonModel>;
  getPet(petId: number): Promise<Pet>;
  getAllPersons(): Promise<PersonModel[]>;
  updatePet(petFound: Pet): Promise<void>;
}
