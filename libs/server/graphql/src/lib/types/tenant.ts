import { Tenant } from 'nexus-prisma';
import {
  extendType,
  idArg,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
  queryField,
} from 'nexus';

export const tenantType = objectType({
  name: Tenant.$name,
  description: Tenant.$description,
  definition(t) {
    t.field(Tenant.id);
    t.field(Tenant.name);
    t.field(Tenant.createdAt);
    t.field(Tenant.shortName);
    t.field(Tenant.imprintPage);
    t.field(Tenant.privacyPolicyPage);
    t.field(Tenant.aboutPage);
    t.field(Tenant.faqPage);
  },
});

export const updateTenantInputType = inputObjectType({
  name: 'updateTenantInput',
  definition(t) {
    t.field(Tenant.imprintPage);
    t.field(Tenant.privacyPolicyPage);
    t.field(Tenant.aboutPage);
    t.field(Tenant.faqPage);
  },
});

export const tenantQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('tenants', {
      type: tenantType,
      resolve: (root, args, ctx) => {
        return ctx.prisma.tenant.findMany();
      },
    });
  },
});

export const currentTenantQuery = queryField('currentTenant', {
  type: tenantType,
  resolve: (source, args, context) => context.tenant,
});

export const updateTenantMutation = mutationField('updateTenant', {
  type: tenantType,
  args: { data: nonNull(updateTenantInputType), id: nonNull(idArg()) },
  resolve: (source, { data, id }, context) =>
    context.prisma.tenant.update({ where: { id }, data }),
});
