import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const usersData = [
      {
        name: 'Admin',
        doc_number: 123456,
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@correo.com',
        role: "admin",
      },
      {
        name: 'Personnel',
        doc_number: 654321,
        password: bcrypt.hashSync('654321', 10),
        email: 'personnel@correo.com',
        role: 'personnel',
      },
    ];

    for (const user of usersData) {
      const userExists = await userRepository.findOneBy({
        doc_number: user.doc_number,
      });

      if (!userExists) {
        console.log('añadiendo user:', user.name);
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }

    console.log('Users creados');
  }
}
