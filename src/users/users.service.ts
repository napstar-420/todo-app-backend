import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { isMongoId } from 'class-validator';
import { OAuthService } from 'src/oauth/oauth.service';
import { UpdatedUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly oAuthService: OAuthService,
  ) {}

  private readonly getUserInfoUrl =
    'https://www.googleapis.com/oauth2/v3/userinfo';

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).select('email avatar');
  }

  async create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async update(id: string, updatedUser: UpdatedUserDto) {
    if (!isMongoId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    return this.userModel.findOneAndUpdate({ id }, updatedUser).exec();
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    if (!isMongoId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    return this.userModel.findOneAndUpdate({ id }, { refreshToken }).exec();
  }
}
