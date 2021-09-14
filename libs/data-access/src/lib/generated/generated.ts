import * as Apollo from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

/** Additional inputs to create an event from a template */
export type CreateEventFromTemplateInput = {
  end: Scalars['DateTime'];
  organizerId?: Maybe<Scalars['ID']>;
  organizerLimit: Scalars['Int'];
  participantLimit: Scalars['Int'];
  start: Scalars['DateTime'];
};

/** Input needed to create a new event template */
export type CreateEventTemplateInput = {
  comment: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['Decimal'];
  icon: Scalars['String'];
  location: Scalars['String'];
  locationId: Scalars['String'];
  organizerText: Scalars['String'];
  participantMail: Scalars['String'];
  participantText: Scalars['String'];
  title: Scalars['String'];
};

/** New user input object */
export type CreateUserInput = {
  birthdate: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type EventOrganizer = {
  __typename?: 'EventOrganizer';
  createdAt: Scalars['DateTime'];
  events: Array<TumiEvent>;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  tenant: Tenant;
  tenantId: Scalars['String'];
  text: Scalars['String'];
};

export type EventRegistration = {
  __typename?: 'EventRegistration';
  createdAt: Scalars['DateTime'];
  event: TumiEvent;
  eventId: Scalars['String'];
  id: Scalars['ID'];
  type: RegistrationType;
  user: User;
  userId: Scalars['String'];
};

/** Template that holds all information for an event that is needed to run it */
export type EventTemplate = {
  __typename?: 'EventTemplate';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  duration: Scalars['Decimal'];
  eventInstances: Array<TumiEvent>;
  finances: Scalars['Json'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  location: Scalars['String'];
  locationId: Scalars['String'];
  organizerText: Scalars['String'];
  participantMail: Scalars['String'];
  participantText: Scalars['String'];
  tenant: Tenant;
  title: Scalars['String'];
};

export enum MembershipStatus {
  Alumni = 'ALUMNI',
  Full = 'FULL',
  None = 'NONE',
  Sponsor = 'SPONSOR',
  Trial = 'TRIAL'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new event from a given Template */
  createEventFromTemplate?: Maybe<TumiEvent>;
  /** Create a new event organizer */
  createEventOrganizer?: Maybe<EventOrganizer>;
  createEventTemplate?: Maybe<EventTemplate>;
  registerForEvent?: Maybe<TumiEvent>;
  /** Add a new user to the database */
  registerUser: User;
};


export type MutationCreateEventFromTemplateArgs = {
  createEventFromTemplateInput: CreateEventFromTemplateInput;
  templateId: Scalars['ID'];
};


export type MutationCreateEventOrganizerArgs = {
  newOrganizerInput: NewOrganizerInput;
};


export type MutationCreateEventTemplateArgs = {
  eventTemplateInput: CreateEventTemplateInput;
};


export type MutationRegisterForEventArgs = {
  eventId: Scalars['ID'];
  registrationType?: Maybe<RegistrationType>;
};


export type MutationRegisterUserArgs = {
  userInput?: Maybe<CreateUserInput>;
};

/** Input to create a new Event Organizer */
export type NewOrganizerInput = {
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  text: Scalars['String'];
};

export type PhotoShare = {
  __typename?: 'PhotoShare';
  createdAt: Scalars['DateTime'];
  event: TumiEvent;
  eventId: Scalars['String'];
  id: Scalars['ID'];
};

export enum PublicationState {
  Approval = 'APPROVAL',
  Draft = 'DRAFT',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  currentTenant?: Maybe<Tenant>;
  /** Returns the logged in user if found or null */
  currentUser?: Maybe<User>;
  /** Get one event by ID */
  event?: Maybe<TumiEvent>;
  /** Get one event template by ID */
  eventTemplate?: Maybe<EventTemplate>;
  /** Query event templates for the current tenant */
  eventTemplates: Array<EventTemplate>;
  /** Get a list of all events */
  events: Array<TumiEvent>;
  /** Retrieve a list of all event organizers */
  organizers: Array<EventOrganizer>;
  tenants: Array<Tenant>;
  userById?: Maybe<User>;
};


export type QueryEventArgs = {
  eventId: Scalars['ID'];
};


export type QueryEventTemplateArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export enum RegistrationType {
  Organizer = 'ORGANIZER',
  Participant = 'PARTICIPANT'
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum SubmissionItemType {
  Date = 'DATE',
  File = 'FILE',
  Number = 'NUMBER',
  Rating = 'RATING',
  Text = 'TEXT'
}

export enum SubmissionTime {
  After = 'AFTER',
  Before = 'BEFORE',
  During = 'DURING',
  Registration = 'REGISTRATION'
}

/** One Tenant of the app, most likely an ESN section */
export type Tenant = {
  __typename?: 'Tenant';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  shortName: Scalars['String'];
};

/** Actual instande of an TumiEventbased on a template */
export type TumiEvent = {
  __typename?: 'TumiEvent';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  end: Scalars['DateTime'];
  eventOrganizerId: Scalars['String'];
  eventTemplate: EventTemplate;
  eventTemplateId: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  location: Scalars['String'];
  locationId: Scalars['String'];
  organizer: EventOrganizer;
  organizerLimit: Scalars['Int'];
  /** Indicates whether the current user can register to this event as Organizer */
  organizerRegistrationPossible?: Maybe<Scalars['Boolean']>;
  organizerSignup: Array<MembershipStatus>;
  organizerText: Scalars['String'];
  /** Number of users registered as organizer to this event */
  organizersRegistered?: Maybe<Scalars['Int']>;
  participantLimit: Scalars['Int'];
  participantMail: Scalars['String'];
  /** Indicates whether the current user can register to this event as participant */
  participantRegistrationPossible?: Maybe<Scalars['Boolean']>;
  participantSignup: Array<MembershipStatus>;
  participantText: Scalars['String'];
  /** Number of users registered as participant to this event */
  participantsRegistered?: Maybe<Scalars['Int']>;
  photoShare?: Maybe<PhotoShare>;
  publicationState: PublicationState;
  registrations: Array<EventRegistration>;
  start: Scalars['DateTime'];
  title: Scalars['String'];
};

/** One User of the app */
export type User = {
  __typename?: 'User';
  /** Id from auth0 for this user */
  authId: Scalars['String'];
  birthdate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  currentTenant?: Maybe<UsersOfTenants>;
  firstName: Scalars['String'];
  /** Concatenated name of the user */
  fullName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type UsersOfTenants = {
  __typename?: 'UsersOfTenants';
  createdAt: Scalars['DateTime'];
  role: Role;
  status: MembershipStatus;
  tenant: Tenant;
  tenantId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', id: string }> };

export type UserRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserRolesQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', fullName: string, currentTenant?: Maybe<{ __typename?: 'UsersOfTenants', role: Role, status: MembershipStatus }> }> };

export type CreateEventTemplateMutationVariables = Exact<{
  input: CreateEventTemplateInput;
}>;


export type CreateEventTemplateMutation = { __typename?: 'Mutation', createEventTemplate?: Maybe<{ __typename?: 'EventTemplate', id: string, createdAt: any }> };

export type CreateEventFromTemplateMutationVariables = Exact<{
  templateId: Scalars['ID'];
  eventData: CreateEventFromTemplateInput;
}>;


export type CreateEventFromTemplateMutation = { __typename?: 'Mutation', createEventFromTemplate?: Maybe<{ __typename?: 'TumiEvent', id: string }> };

export type GetEventTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventTemplatesQuery = { __typename?: 'Query', eventTemplates: Array<{ __typename?: 'EventTemplate', id: string, title: string, icon: string }> };

export type GetEventTemplateQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetEventTemplateQuery = { __typename?: 'Query', eventTemplate?: Maybe<{ __typename?: 'EventTemplate', id: string, title: string, icon: string, duration: any }> };

export type GetOrganizerOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizerOptionsQuery = { __typename?: 'Query', organizers: Array<{ __typename?: 'EventOrganizer', id: string, name: string }> };

export type LoadEventQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LoadEventQuery = { __typename?: 'Query', event?: Maybe<{ __typename?: 'TumiEvent', id: string, title: string, icon: string, start: any, end: any, description: string, organizerText: string, organizerSignup: Array<MembershipStatus>, participantSignup: Array<MembershipStatus>, organizerRegistrationPossible?: Maybe<boolean>, organizer: { __typename?: 'EventOrganizer', link?: Maybe<string>, text: string } }> };

export type RegisterForEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  type?: Maybe<RegistrationType>;
}>;


export type RegisterForEventMutation = { __typename?: 'Mutation', registerForEvent?: Maybe<{ __typename?: 'TumiEvent', id: string, organizerRegistrationPossible?: Maybe<boolean>, participantRegistrationPossible?: Maybe<boolean>, organizersRegistered?: Maybe<number>, participantsRegistered?: Maybe<number> }> };

export type EventListQueryVariables = Exact<{ [key: string]: never; }>;


export type EventListQuery = { __typename?: 'Query', events: Array<{ __typename?: 'TumiEvent', id: string, title: string, icon: string, start: any }> };

export type RegisterUserMutationVariables = Exact<{
  userInput?: Maybe<CreateUserInput>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string } };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', id: string, fullName: string, birthdate: any, firstName: string }> };

export type CreateOrganizerMutationVariables = Exact<{
  input: NewOrganizerInput;
}>;


export type CreateOrganizerMutation = { __typename?: 'Mutation', createEventOrganizer?: Maybe<{ __typename?: 'EventOrganizer', id: string }> };

export type GetOrganizersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizersQuery = { __typename?: 'Query', organizers: Array<{ __typename?: 'EventOrganizer', id: string, name: string, text: string }> };

export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  currentUser {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCurrentUserGQL extends Apollo.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables> {
    document = GetCurrentUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserRolesDocument = gql`
    query userRoles {
  currentUser {
    fullName
    currentTenant {
      role
      status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserRolesGQL extends Apollo.Query<UserRolesQuery, UserRolesQueryVariables> {
    document = UserRolesDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEventTemplateDocument = gql`
    mutation createEventTemplate($input: CreateEventTemplateInput!) {
  createEventTemplate(eventTemplateInput: $input) {
    id
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEventTemplateGQL extends Apollo.Mutation<CreateEventTemplateMutation, CreateEventTemplateMutationVariables> {
    document = CreateEventTemplateDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEventFromTemplateDocument = gql`
    mutation createEventFromTemplate($templateId: ID!, $eventData: CreateEventFromTemplateInput!) {
  createEventFromTemplate(
    templateId: $templateId
    createEventFromTemplateInput: $eventData
  ) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEventFromTemplateGQL extends Apollo.Mutation<CreateEventFromTemplateMutation, CreateEventFromTemplateMutationVariables> {
    document = CreateEventFromTemplateDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEventTemplatesDocument = gql`
    query getEventTemplates {
  eventTemplates {
    id
    title
    icon
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventTemplatesGQL extends Apollo.Query<GetEventTemplatesQuery, GetEventTemplatesQueryVariables> {
    document = GetEventTemplatesDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEventTemplateDocument = gql`
    query getEventTemplate($id: ID!) {
  eventTemplate(id: $id) {
    id
    title
    icon
    duration
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventTemplateGQL extends Apollo.Query<GetEventTemplateQuery, GetEventTemplateQueryVariables> {
    document = GetEventTemplateDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOrganizerOptionsDocument = gql`
    query getOrganizerOptions {
  organizers {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrganizerOptionsGQL extends Apollo.Query<GetOrganizerOptionsQuery, GetOrganizerOptionsQueryVariables> {
    document = GetOrganizerOptionsDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoadEventDocument = gql`
    query loadEvent($id: ID!) {
  event(eventId: $id) {
    id
    title
    icon
    start
    end
    description
    organizerText
    organizer {
      link
      text
    }
    organizerSignup
    participantSignup
    organizerRegistrationPossible
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoadEventGQL extends Apollo.Query<LoadEventQuery, LoadEventQueryVariables> {
    document = LoadEventDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterForEventDocument = gql`
    mutation registerForEvent($eventId: ID!, $type: RegistrationType) {
  registerForEvent(eventId: $eventId, registrationType: $type) {
    id
    organizerRegistrationPossible
    participantRegistrationPossible
    organizersRegistered
    participantsRegistered
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterForEventGQL extends Apollo.Mutation<RegisterForEventMutation, RegisterForEventMutationVariables> {
    document = RegisterForEventDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EventListDocument = gql`
    query eventList {
  events {
    id
    title
    icon
    start
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EventListGQL extends Apollo.Query<EventListQuery, EventListQueryVariables> {
    document = EventListDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterUserDocument = gql`
    mutation RegisterUser($userInput: CreateUserInput) {
  registerUser(userInput: $userInput) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserProfileDocument = gql`
    query userProfile {
  currentUser {
    id
    fullName
    birthdate
    firstName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserProfileGQL extends Apollo.Query<UserProfileQuery, UserProfileQueryVariables> {
    document = UserProfileDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOrganizerDocument = gql`
    mutation createOrganizer($input: NewOrganizerInput!) {
  createEventOrganizer(newOrganizerInput: $input) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrganizerGQL extends Apollo.Mutation<CreateOrganizerMutation, CreateOrganizerMutationVariables> {
    document = CreateOrganizerDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOrganizersDocument = gql`
    query getOrganizers {
  organizers {
    id
    name
    text
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrganizersGQL extends Apollo.Query<GetOrganizersQuery, GetOrganizersQueryVariables> {
    document = GetOrganizersDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
