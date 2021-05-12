import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column({ unique: true })
  public description: string;

  @Column({ nullable: false, type: 'float', default: 0.0 })
  public age: number;

  @Column('text', { nullable: true })
  public type: string;

  @Column('text', { nullable: true })
  public address: string;
}

export default PetEntity;
