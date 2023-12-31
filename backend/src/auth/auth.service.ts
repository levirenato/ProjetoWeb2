import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  async login(authDto: AuthDto) {
    const user = await this.prismaService.usuario.findUnique({
      where: { email: authDto.email },
    });
    if (!user) {
      throw new NotFoundException('Usuario Não encontrado');
    }
    const userAuth = await bcrypt.compare(authDto.senha, user.senha);

    if (!userAuth) {
      throw new UnauthorizedException('Email ou Senha Incorreta!');
    }
    const payload = {
      id: user.id_usuario,
      nome: user.nome,
      sobrenome: user.sobrenome,
      nivel: user.nivel_usuario,
      imagem: user.user_img
    };
    return payload;
  }
}
// import {
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from 'src/prisma/prisma.service';
// import * as bcrypt from 'bcrypt';
// import { AuthDto } from './dto/auth.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private prismaService: PrismaService,
//     private jwtService: JwtService,
//   ) {}
//   async login(authDto: AuthDto) {
//     const user = await this.prismaService.usuario.findUnique({
//       where: { email: authDto.email },
//     });
//     if (!user) {
//       throw new NotFoundException('Usuario Não encontrado');
//     }
//     const userAuth = await bcrypt.compare(authDto.senha, user.senha);

//     if (!userAuth) {
//       throw new UnauthorizedException('Email ou Senha Incorreta!');
//     }
//     const payload = {
//       sub: user.id_usuario,
//       nome: user.nome,
//       sobrenome: user.sobrenome,
//       nivel: user.nivel_usuario,
//       imagem: user.user_img
//     };
//     return payload ;
//   }
// }
