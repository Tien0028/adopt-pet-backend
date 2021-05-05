import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public description: string;
}

export default PetEntity;
