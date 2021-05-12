import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PetEntity from './pet.entity';

@Entity()
export class PersonEntity {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public firstName: string;
  @Column()
  public lastName: string;
  @Column()
  public email: string;
  @Column()
  public phoneNumber: number;
  @OneToOne(() => PetEntity)
  @JoinColumn()
  public pet: PetEntity;
}

export default PersonEntity;
