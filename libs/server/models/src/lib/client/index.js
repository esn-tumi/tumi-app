
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  warnEnvConflicts,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  findSync
} = require('./runtime')

const path = require('path')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.0.2
 * Query Engine version: 2452cc6313d52b8b9a96999ac0e974d0aedf88db
 */
Prisma.prismaVersion = {
  client: "3.0.2",
  engine: "2452cc6313d52b8b9a96999ac0e974d0aedf88db"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'


// folder where the generated client is found
const dirname = findSync(process.cwd(), [
  '"libs\\server\\models\\src\\lib\\client"',
  '"server\\models\\src\\lib\\client"',
], ['d'], ['d'], 1)[0] || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.TenantScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  name: 'name',
  shortName: 'shortName'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  authId: 'authId',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  birthdate: 'birthdate'
});

exports.Prisma.UsersOfTenantsScalarFieldEnum = makeEnum({
  createdAt: 'createdAt',
  userId: 'userId',
  tenantId: 'tenantId',
  role: 'role',
  status: 'status'
});

exports.Prisma.EventOrganizerScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  tenantId: 'tenantId',
  name: 'name',
  text: 'text',
  link: 'link'
});

exports.Prisma.EventTemplateScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  title: 'title',
  icon: 'icon',
  description: 'description',
  comment: 'comment',
  location: 'location',
  locationId: 'locationId',
  duration: 'duration',
  participantText: 'participantText',
  participantMail: 'participantMail',
  organizerText: 'organizerText',
  finances: 'finances',
  tenantId: 'tenantId'
});

exports.Prisma.TumiEventScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  title: 'title',
  icon: 'icon',
  start: 'start',
  end: 'end',
  description: 'description',
  location: 'location',
  locationId: 'locationId',
  participantText: 'participantText',
  participantMail: 'participantMail',
  organizerText: 'organizerText',
  participantLimit: 'participantLimit',
  organizerLimit: 'organizerLimit',
  publicationState: 'publicationState',
  participantSignup: 'participantSignup',
  organizerSignup: 'organizerSignup',
  eventOrganizerId: 'eventOrganizerId',
  creatorId: 'creatorId',
  eventTemplateId: 'eventTemplateId'
});

exports.Prisma.CostItemScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  eventId: 'eventId',
  name: 'name',
  ammount: 'ammount'
});

exports.Prisma.ReceiptScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  costItemId: 'costItemId',
  covered: 'covered',
  amount: 'amount',
  date: 'date',
  amountCovered: 'amountCovered'
});

exports.Prisma.PhotoShareScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  eventId: 'eventId'
});

exports.Prisma.EventRegistrationScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  type: 'type',
  userId: 'userId',
  eventId: 'eventId'
});

exports.Prisma.EventSubmissionItemScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  eventId: 'eventId',
  required: 'required',
  submissionTime: 'submissionTime'
});

exports.Prisma.EventSubmissionScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  userId: 'userId',
  submissionItemId: 'submissionItemId'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.JsonNullValueInput = makeEnum({
  JsonNull: 'JsonNull'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
  AnyNull: 'AnyNull'
});
exports.Role = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

exports.MembershipStatus = makeEnum({
  NONE: 'NONE',
  TRIAL: 'TRIAL',
  FULL: 'FULL',
  SPONSOR: 'SPONSOR',
  ALUMNI: 'ALUMNI'
});

exports.PublicationState = makeEnum({
  DRAFT: 'DRAFT',
  APPROVAL: 'APPROVAL',
  PUBLIC: 'PUBLIC'
});

exports.RegistrationType = makeEnum({
  ORGANIZER: 'ORGANIZER',
  PARTICIPANT: 'PARTICIPANT'
});

exports.SubmissionTime = makeEnum({
  REGISTRATION: 'REGISTRATION',
  BEFORE: 'BEFORE',
  DURING: 'DURING',
  AFTER: 'AFTER'
});

exports.Prisma.ModelName = makeEnum({
  Tenant: 'Tenant',
  User: 'User',
  UsersOfTenants: 'UsersOfTenants',
  EventOrganizer: 'EventOrganizer',
  EventTemplate: 'EventTemplate',
  TumiEvent: 'TumiEvent',
  CostItem: 'CostItem',
  Receipt: 'Receipt',
  PhotoShare: 'PhotoShare',
  EventRegistration: 'EventRegistration',
  EventSubmissionItem: 'EventSubmissionItem',
  EventSubmission: 'EventSubmission'
});


/**
 * DMMF
 */

// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */

const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\hedde\\code\\tumi-app\\libs\\server\\models\\src\\lib\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\..\\..\\..\\..\\.env",
    "schemaEnvPath": "..\\..\\..\\..\\..\\..\\.env"
  },
  "relativePath": "..\\..\\prisma",
  "clientVersion": "3.0.2",
  "engineVersion": "2452cc6313d52b8b9a96999ac0e974d0aedf88db",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql"
}
config.document = dmmf
config.dirname = dirname

/**
 * Only for env conflict warning
 * loading of env variable occurs in getPrismaClient
 */
const envPaths = {
  rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
  schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
}
warnEnvConflicts(envPaths)

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

/**
 * Build tool annotations
 * In order to make `ncc` and `@vercel/nft` happy.
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'query_engine-windows.dll.node');
path.join(process.cwd(), './libs\server\models\src\lib\client\query_engine-windows.dll.node')
/**
 * Annotation for `@vercel/nft`
 * The process.cwd() annotation is only needed for https://github.com/vercel/vercel/tree/master/packages/now-next
**/
path.join(__dirname, 'schema.prisma');
path.join(process.cwd(), './libs\server\models\src\lib\client\schema.prisma');