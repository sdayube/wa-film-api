import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  movie_banner: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @CreateDateColumn()
  created_at: Date;
}
