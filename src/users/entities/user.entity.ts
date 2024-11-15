import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The document number of the user, must be unique',
    example: 123456789,
  })
  @Column({ unique: true })
  doc_number: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  name: string;

  @ApiProperty({
    description: 'The email address of the user, must be unique',
    example: 'john.doe@example.com',
    nullable: true,
  })
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$Vv6/FXgtv0SuF2cX/IYmQeS2yzFvTSc4ATzC54oV02r0w0C2L4Yy',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    nullable: true,
  })
  @Column({ nullable: true })
  role: string;
}
