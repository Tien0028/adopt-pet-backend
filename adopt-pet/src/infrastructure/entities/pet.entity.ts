import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import PersonEntity from './person.entity';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public age: string;

  @Column()
  public type: string;

  @Column()
  public address: string;

  @Column()
  public isBooked: boolean;

  @OneToOne(() => PersonEntity, (person: PersonEntity) => person.pet)
  public person: PersonEntity;
}

export default PetEntity;
