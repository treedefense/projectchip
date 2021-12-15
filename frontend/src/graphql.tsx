import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Hole = {
  __typename?: 'Hole';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  number: Scalars['Int'];
  par: Scalars['Int'];
};

export type HoleInputs = {
  name?: InputMaybe<Scalars['String']>;
  number: Scalars['Int'];
  par: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  holes: Array<Hole>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLocation: Location;
};


export type MutationCreateLocationArgs = {
  holes?: InputMaybe<Array<InputMaybe<HoleInputs>>>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  location?: Maybe<Location>;
  locations: Array<Location>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};

export type FindLocationHolesQueryVariables = Exact<{
  locationID: Scalars['ID'];
}>;


export type FindLocationHolesQuery = { __typename?: 'Query', location?: { __typename?: 'Location', holes: Array<{ __typename?: 'Hole', number: number, name?: string | null | undefined }> } | null | undefined };

export type FindLocationNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindLocationNamesQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', name: string }> };


export const FindLocationHolesDocument = gql`
    query findLocationHoles($locationID: ID!) {
  location(id: $locationID) {
    holes {
      number
      name
    }
  }
}
    `;

/**
 * __useFindLocationHolesQuery__
 *
 * To run a query within a React component, call `useFindLocationHolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLocationHolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLocationHolesQuery({
 *   variables: {
 *      locationID: // value for 'locationID'
 *   },
 * });
 */
export function useFindLocationHolesQuery(baseOptions: Apollo.QueryHookOptions<FindLocationHolesQuery, FindLocationHolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLocationHolesQuery, FindLocationHolesQueryVariables>(FindLocationHolesDocument, options);
      }
export function useFindLocationHolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLocationHolesQuery, FindLocationHolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLocationHolesQuery, FindLocationHolesQueryVariables>(FindLocationHolesDocument, options);
        }
export type FindLocationHolesQueryHookResult = ReturnType<typeof useFindLocationHolesQuery>;
export type FindLocationHolesLazyQueryHookResult = ReturnType<typeof useFindLocationHolesLazyQuery>;
export type FindLocationHolesQueryResult = Apollo.QueryResult<FindLocationHolesQuery, FindLocationHolesQueryVariables>;
export const FindLocationNamesDocument = gql`
    query findLocationNames {
  locations {
    name
  }
}
    `;

/**
 * __useFindLocationNamesQuery__
 *
 * To run a query within a React component, call `useFindLocationNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLocationNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLocationNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindLocationNamesQuery(baseOptions?: Apollo.QueryHookOptions<FindLocationNamesQuery, FindLocationNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLocationNamesQuery, FindLocationNamesQueryVariables>(FindLocationNamesDocument, options);
      }
export function useFindLocationNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLocationNamesQuery, FindLocationNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLocationNamesQuery, FindLocationNamesQueryVariables>(FindLocationNamesDocument, options);
        }
export type FindLocationNamesQueryHookResult = ReturnType<typeof useFindLocationNamesQuery>;
export type FindLocationNamesLazyQueryHookResult = ReturnType<typeof useFindLocationNamesLazyQuery>;
export type FindLocationNamesQueryResult = Apollo.QueryResult<FindLocationNamesQuery, FindLocationNamesQueryVariables>;