import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'The document number of the user, must be unique',
    example: 123456789,
  })
  @IsNumber({}, {message: 'the document number must be a number'})
  doc_number: number

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
    nullable: true,
  })
  @IsString({message: 'the name must be a string'})
  name: string

  @ApiProperty({
    description: 'The email address of the user, must be unique',
    example: 'john.doe@example.com',
    nullable: true,
  })
  @IsEmail({},{message: 'the email must be a string'})
  email: string

  @ApiProperty({
    description: 'The hashed password of the user',
    example: 'password123',
    nullable: true,
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @IsString({message: 'the password must be a string'})
  password: string

  @ApiProperty({
    description: 'The role of the user',
    example: 'admin',
    nullable: true,
  })
  @IsString({message: 'the role must be a string'})
  role: string
}
