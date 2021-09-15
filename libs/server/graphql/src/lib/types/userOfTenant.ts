import { objectType } from 'nexus';
import { UsersOfTenants } from 'nexus-prisma';

export const userOfTenantType = objectType({
  name: UsersOfTenants.$name,
  description: UsersOfTenants.$description,
  definition(t) {
    t.field(UsersOfTenants.createdAt);
    t.field(UsersOfTenants.user);
    t.field(UsersOfTenants.userId);
    t.field(UsersOfTenants.tenant);
    t.field(UsersOfTenants.tenantId);
    t.field(UsersOfTenants.role);
    t.field(UsersOfTenants.status);
  },
});