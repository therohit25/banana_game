import { ClickCountModel, IClickCountDocument } from '../models/click-count';

export class ClickCountService {
  constructor(private readonly clickCountModel: typeof ClickCountModel) {
    this.clickCountModel = clickCountModel;
  }

  async createClickCount(userId: string): Promise<IClickCountDocument> {
    return (await this.clickCountModel.create({
      user: userId,
    })) as unknown as IClickCountDocument;
  }

  async getCountByUser(userId: string): Promise<IClickCountDocument> {
    return (await this.clickCountModel
      .findOne({
        user: userId,
      })
      .populate('user')
      .sort({ timestamp: -1 })
      .limit(1)) as unknown as IClickCountDocument;
  }

  async getPlayersWithCount(): Promise<any> {
    return (await this.clickCountModel
      .find()
      .populate('user')
      .sort({ timestamp: -1 })
      .select(['user', 'count', '_id'])) as unknown as any;
  }

  async updateUserCount(
    count: number,
    userId: string
  ): Promise<IClickCountDocument> {
    const updatedData = await this.clickCountModel.findOneAndUpdate(
      { user: userId },
      { count },
      { new: true, runValidators: true }
    );
    return updatedData as unknown as IClickCountDocument;
  }
  async deleteClickCount(userId: string): Promise<boolean> {
    const isDeleted = await this.clickCountModel.findOneAndDelete({
      user: userId,
    });
    return !!isDeleted;
  }
}

export const clickCountService = new ClickCountService(ClickCountModel);
