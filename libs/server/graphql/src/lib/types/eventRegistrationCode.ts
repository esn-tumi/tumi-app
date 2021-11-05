import {
  arg,
  booleanArg,
  idArg,
  list,
  mutationField,
  nonNull,
  objectType,
  queryField,
} from 'nexus';
import { EventRegistrationCode } from 'nexus-prisma';
import { CacheScope } from 'apollo-server-types';
import { RegistrationMode, Role } from '@tumi/server-models';
import { ApolloError } from 'apollo-server-express';
import { RegistrationService, ValidationService } from '@tumi/server/services';
import { Json } from 'nexus-prisma/scalars';
import { eventRegistrationType } from './eventRegistration';

export const eventRegistrationCodeType = objectType({
  name: EventRegistrationCode.$name,
  definition(t) {
    t.field(EventRegistrationCode.id);
    t.field(EventRegistrationCode.createdAt);
    t.field(EventRegistrationCode.createdById);
    t.field(EventRegistrationCode.registrationToRemoveId);
    t.field(EventRegistrationCode.registrationCreatedId);
    t.field({
      ...EventRegistrationCode.targetEvent,
      resolve: (source, args, context, info) => {
        info.cacheControl.setCacheHint({
          maxAge: 60,
          scope: CacheScope.Public,
        });
        return context.prisma.tumiEvent.findUnique({
          where: { id: source.eventId },
        });
      },
    });
    t.field(EventRegistrationCode.isPublic);
    t.field(EventRegistrationCode.eventId);
    t.field(EventRegistrationCode.status);
    t.field({
      name: 'registrationToRemove',
      type: eventRegistrationType,
      resolve: (source, args, context, info) => {
        info.cacheControl.setCacheHint({
          maxAge: 10,
          scope: CacheScope.Public,
        });
        return context.prisma.eventRegistration.findUnique({
          where: { id: source.registrationToRemoveId },
        });
      },
    });
    t.field({
      name: 'registrationCreated',
      type: eventRegistrationType,
      resolve: (source, args, context, info) => {
        info.cacheControl.setCacheHint({
          maxAge: 10,
          scope: CacheScope.Public,
        });
        if (!source.registrationCreatedId) return null;
        return context.prisma.eventRegistration.findUnique({
          where: { id: source.registrationCreatedId },
        });
      },
    });
  },
});

export const getListQuery = queryField('eventRegistrationCodes', {
  type: nonNull(list(nonNull(eventRegistrationCodeType))),
  args: { includePrivate: booleanArg({ default: false }) },
  resolve: (source, { includePrivate }, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: 10, scope: CacheScope.Public });
    return context.prisma.eventRegistrationCode.findMany({
      where: {
        ...(includePrivate ? {} : { isPublic: true }),
      },
    });
  },
});

export const getOneQuery = queryField('eventRegistrationCode', {
  type: eventRegistrationCodeType,
  args: { id: nonNull(idArg()) },
  resolve: (source, { id }, context, info) => {
    info.cacheControl.setCacheHint({ maxAge: 10, scope: CacheScope.Public });
    return context.prisma.eventRegistrationCode.findUnique({ where: { id } });
  },
});

export const createRegistrationCodeMutation = mutationField(
  'createRegistrationCode',
  {
    type: nonNull(eventRegistrationCodeType),
    args: {
      registrationId: idArg(),
      eventId: nonNull(idArg()),
      isPublic: booleanArg({ default: false }),
    },
    resolve: async (source, { registrationId, eventId, isPublic }, context) => {
      const { role } = context.assignment;
      let registrationCode;
      if (!registrationId && role !== Role.ADMIN) {
        throw new ApolloError(
          'Only Admins can generate registration codes for new registrations!'
        );
      } else if (registrationId) {
        const registration = await context.prisma.eventRegistration.findUnique({
          where: { id: registrationId },
        });
        if (!registration) {
          new ApolloError(
            'Registration could not be found for id ' + registrationId
          );
        }
        registrationCode = await context.prisma.eventRegistrationCode.create({
          data: {
            registrationToRemoveId: registrationId,
            isPublic,
            targetEvent: { connect: { id: eventId } },
            createdById: context.user.id,
          },
        });
      } else {
        registrationCode = await context.prisma.eventRegistrationCode.create({
          data: {
            isPublic,
            targetEvent: { connect: { id: eventId } },
            createdById: context.user.id,
          },
        });
      }
      return registrationCode;
    },
  }
);

export const useRegistrationCodeMutation = mutationField(
  'useRegistrationCode',
  {
    type: nonNull(eventRegistrationCodeType),
    args: { id: nonNull(idArg()), price: arg({ type: Json }) },
    resolve: async (source, { id, price }, context) => {
      const registrationCode =
        await context.prisma.eventRegistrationCode.findUnique({
          where: { id },
          include: { targetEvent: true },
        });
      if (!registrationCode) {
        throw new ApolloError(
          'Registration code could not be found for: ' + id
        );
      }
      if (
        registrationCode.targetEvent.registrationMode ===
        RegistrationMode.STRIPE
      ) {
        const priceAllowed = await ValidationService.priceAllowed(
          price,
          registrationCode.targetEvent,
          context
        );
        if (!priceAllowed) {
          throw new ApolloError('Price received is not valid in this context');
        }
      }
      const baseUrl = process.env.DEV
        ? 'http://localhost:4200/profile'
        : 'https://tumi.esn.world/profile';
      return RegistrationService.registerWithCode(
        context,
        id,
        context.user.id,
        price,
        `${baseUrl}?cancel=true&code=${id}`,
        `${baseUrl}?success=true&code=${id}`
      );
    },
  }
);