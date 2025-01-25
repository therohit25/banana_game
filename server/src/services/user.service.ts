import { IUser, IUserDocument, UserModel } from '../models/user.model';
export class UserService {
  constructor(private readonly userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  async create(userData: IUser): Promise<any> {
    const user = await this.userModel.create(userData);
    return (await user.save()) as unknown as IUserDocument;
  }

  async getUserByEmailId(
    email: string,
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    return await this.userModel.findOne({ email: email, is_active });
  }
  async getUserById(
    userId: string,
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    return await this.userModel.findOne({ _id: userId, is_active });
  }
  async getUserByEmailAndPassword(
    email: string,
    password: string,
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    return await this.userModel.findOne({ email, password, is_active });
  }
  async getUserByEmailAndPasswordAndRole(
    email: string,
    password: string,
    role: 'user' | 'admin',
    is_active: boolean = true
  ) {
    return await this.userModel.findOne({
      email,
      password,
      role,
      is_active,
    });
  }

  async getAllUsersByRole(
    role: 'user' | 'admin',
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    return (await this.userModel.find({
      role: role,
      is_active,
    })) as unknown as IUserDocument;
  }

  async updateUser(
    udpdateUserData: IUser,
    userId: string,
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    const updatedData = await this.userModel.findOneAndUpdate(
      { _id: userId, is_active },
      udpdateUserData,
      { new: true, runValidators: true }
    );
    return updatedData as unknown as IUserDocument;
  }

  async deleteUser(
    userId: string,
    is_active: boolean = true
  ): Promise<IUserDocument | null> {
    return await this.userModel.findOneAndUpdate(
      { _id: userId, is_active },
      { is_active: false },
      { new: true }
    );
  }
}

export const userService = new UserService(UserModel);
