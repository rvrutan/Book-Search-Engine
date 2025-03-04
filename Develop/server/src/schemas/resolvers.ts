import User, { UserDocument } from '../models/User.js';
import { AuthenticationError } from '../services/auth.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any): Promise<UserDocument | null> => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('Not logged in');
    },
    getUser: async (_parent: any, { username }: { username: string }): Promise<UserDocument | null> => {
      return User.findOne({ username }).populate('savedBooks');
    },
  },
  Mutation: {
    login: async (_parent: any, { email, password }: { email: string, password: string }): Promise<{ token: string, user: UserDocument } | null> => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_parent: any, { username, email, password }: { username: string, email: string, password: string }): Promise<{ token: string, user: UserDocument } | null> => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_parent: any, { bookData }: { bookData: any }, context: any): Promise<UserDocument | null> => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        ).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: any): Promise<UserDocument | null> => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

export default resolvers;