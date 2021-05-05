import { Pet } from '../models/pet.model';

export const IAdoptPetServiceProvider = 'IAdoptPetServiceProvider';
export interface IAdoptPetService {
  getAllPets(): Promise<Pet[]>;
  createPet(pet: Pet): Promise<Pet>;
}
