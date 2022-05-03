import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@carpool/api/prisma';
import bcrypt from 'bcryptjs';
import { UserInput } from '@carpool/api/authentication/entities';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      // const isValidPassword = bcrypt.compareSync(password, user.password);
      const isValidPassword = user.password === password;

      if (isValidPassword) {
        return user;
      }
    }
  }

  async register(user: UserInput): Promise<User | null> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    return this.prisma.user.create({
      data: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: hashedPassword,
        university: user.university,
        studentNumber: user.studentNumber,
      },
    });
  }
}