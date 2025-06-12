import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database';

export class User extends Model {
  public id: number;
  public email: string;
  public name: string;
  public passwordHash: string;
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'user',
});