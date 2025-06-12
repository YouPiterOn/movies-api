import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../infrastructure/database';
import { User } from './user.model';

export class Session extends Model {
  public id: string;
  public userId: string;
  public user?: User;
}

Session.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: { type: DataTypes.UUID, allowNull: false },
}, {
  sequelize,
  modelName: 'session',
});

Session.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Session, { foreignKey: 'userId' });
