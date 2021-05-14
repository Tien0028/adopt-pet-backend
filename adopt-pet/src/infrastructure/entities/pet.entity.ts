import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default PetEntity;
