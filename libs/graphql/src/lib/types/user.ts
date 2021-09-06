import { nonNull, objectType, queryField, idArg } from "nexus";
import { User } from "nexus-prisma";

export const userType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.createdAt);
  },
});

export const getById = queryField("userById", {
  type: userType,
  args: {
    id: nonNull(idArg({description:'ID of the user'}))
  },
  resolve: (parent, { id }, ctx) => {
    return ctx.prisma.user.findOne({
      where: { id },
    });
  },
});
