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

export type Account = {
  __typename?: 'Account';
  email: Scalars['String'];
  id: Scalars['ID'];
  nickname: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  holes?: Maybe<Array<Maybe<Hole>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CourseInputs = {
  holes: Array<HoleInputs>;
  name: Scalars['String'];
};

export type Hole = {
  __typename?: 'Hole';
  course_order: Scalars['Int'];
  id: Scalars['ID'];
  par: Scalars['Int'];
};

export type HoleInputs = {
  course_order: Scalars['Int'];
  par: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  courses?: Maybe<Array<Maybe<Course>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  course: Course;
  id: Scalars['ID'];
  participants: Array<Account>;
  strokes: Array<MatchStroke>;
};

export type MatchStroke = {
  __typename?: 'MatchStroke';
  account: Account;
  hole: Hole;
  id: Scalars['ID'];
  match: Match;
  strokes: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createLocation: Scalars['ID'];
  createMatch: Scalars['ID'];
  pushStrokes: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  nickname: Scalars['String'];
};


export type MutationCreateLocationArgs = {
  courses?: InputMaybe<Array<InputMaybe<CourseInputs>>>;
  name: Scalars['String'];
};


export type MutationCreateMatchArgs = {
  newMatch?: InputMaybe<NewMatch>;
};


export type MutationPushStrokesArgs = {
  id: Scalars['ID'];
  strokes: Scalars['Int'];
};

export type NewMatch = {
  course_id: Scalars['ID'];
  hole_ids: Array<Scalars['ID']>;
  participant_ids: Array<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  course?: Maybe<Course>;
  coursesAtLocation?: Maybe<Array<Maybe<Course>>>;
  hole?: Maybe<Hole>;
  holesAtCourse?: Maybe<Array<Maybe<Hole>>>;
  location?: Maybe<Location>;
  locations: Array<Location>;
  match?: Maybe<Match>;
  matchStrokes: Array<MatchStroke>;
  matchesForAccount?: Maybe<Array<Match>>;
};


export type QueryAccountArgs = {
  account_id: Scalars['ID'];
};


export type QueryCourseArgs = {
  course_id: Scalars['ID'];
};


export type QueryCoursesAtLocationArgs = {
  location_id: Scalars['ID'];
};


export type QueryHoleArgs = {
  hole_id: Scalars['ID'];
};


export type QueryHolesAtCourseArgs = {
  course_id: Scalars['ID'];
};


export type QueryLocationArgs = {
  location_id: Scalars['ID'];
};


export type QueryMatchArgs = {
  match_id: Scalars['ID'];
};


export type QueryMatchStrokesArgs = {
  match_id: Scalars['ID'];
};


export type QueryMatchesForAccountArgs = {
  account_id: Scalars['ID'];
};

export type GetMatchStrokesQueryVariables = Exact<{
  matchId: Scalars['ID'];
}>;


export type GetMatchStrokesQuery = { __typename?: 'Query', matchStrokes: Array<{ __typename?: 'MatchStroke', id: string, strokes: number, hole: { __typename?: 'Hole', course_order: number, par: number } }> };

export type SetStrokesMutationVariables = Exact<{
  strokesId: Scalars['ID'];
  strokes: Scalars['Int'];
}>;


export type SetStrokesMutation = { __typename?: 'Mutation', pushStrokes: string };

export type GetMyMatchesQueryVariables = Exact<{
  accountID: Scalars['ID'];
}>;


export type GetMyMatchesQuery = { __typename?: 'Query', matchesForAccount?: Array<{ __typename?: 'Match', id: string, course: { __typename?: 'Course', name: string }, participants: Array<{ __typename?: 'Account', nickname: string }> }> | null | undefined };

export type FindLocationCoursesQueryVariables = Exact<{
  locationID: Scalars['ID'];
}>;


export type FindLocationCoursesQuery = { __typename?: 'Query', location?: { __typename?: 'Location', courses?: Array<{ __typename?: 'Course', id: string, name: string } | null | undefined> | null | undefined } | null | undefined };

export type FindCourseHolesQueryVariables = Exact<{
  courseID: Scalars['ID'];
}>;


export type FindCourseHolesQuery = { __typename?: 'Query', course?: { __typename?: 'Course', holes?: Array<{ __typename?: 'Hole', id: string, course_order: number, par: number } | null | undefined> | null | undefined } | null | undefined };

export type CreateNewMatchMutationVariables = Exact<{
  newMatch?: InputMaybe<NewMatch>;
}>;


export type CreateNewMatchMutation = { __typename?: 'Mutation', createMatch: string };

export type FindLocationNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindLocationNamesQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: string, name: string }> };


export const GetMatchStrokesDocument = gql`
    query getMatchStrokes($matchId: ID!) {
  matchStrokes(match_id: $matchId) {
    id
    hole {
      course_order
      par
    }
    strokes
  }
}
    `;

/**
 * __useGetMatchStrokesQuery__
 *
 * To run a query within a React component, call `useGetMatchStrokesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchStrokesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchStrokesQuery({
 *   variables: {
 *      matchId: // value for 'matchId'
 *   },
 * });
 */
export function useGetMatchStrokesQuery(baseOptions: Apollo.QueryHookOptions<GetMatchStrokesQuery, GetMatchStrokesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchStrokesQuery, GetMatchStrokesQueryVariables>(GetMatchStrokesDocument, options);
      }
export function useGetMatchStrokesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchStrokesQuery, GetMatchStrokesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchStrokesQuery, GetMatchStrokesQueryVariables>(GetMatchStrokesDocument, options);
        }
export type GetMatchStrokesQueryHookResult = ReturnType<typeof useGetMatchStrokesQuery>;
export type GetMatchStrokesLazyQueryHookResult = ReturnType<typeof useGetMatchStrokesLazyQuery>;
export type GetMatchStrokesQueryResult = Apollo.QueryResult<GetMatchStrokesQuery, GetMatchStrokesQueryVariables>;
export const SetStrokesDocument = gql`
    mutation setStrokes($strokesId: ID!, $strokes: Int!) {
  pushStrokes(id: $strokesId, strokes: $strokes)
}
    `;
export type SetStrokesMutationFn = Apollo.MutationFunction<SetStrokesMutation, SetStrokesMutationVariables>;

/**
 * __useSetStrokesMutation__
 *
 * To run a mutation, you first call `useSetStrokesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStrokesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStrokesMutation, { data, loading, error }] = useSetStrokesMutation({
 *   variables: {
 *      strokesId: // value for 'strokesId'
 *      strokes: // value for 'strokes'
 *   },
 * });
 */
export function useSetStrokesMutation(baseOptions?: Apollo.MutationHookOptions<SetStrokesMutation, SetStrokesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetStrokesMutation, SetStrokesMutationVariables>(SetStrokesDocument, options);
      }
export type SetStrokesMutationHookResult = ReturnType<typeof useSetStrokesMutation>;
export type SetStrokesMutationResult = Apollo.MutationResult<SetStrokesMutation>;
export type SetStrokesMutationOptions = Apollo.BaseMutationOptions<SetStrokesMutation, SetStrokesMutationVariables>;
export const GetMyMatchesDocument = gql`
    query getMyMatches($accountID: ID!) {
  matchesForAccount(account_id: $accountID) {
    id
    course {
      name
    }
    participants {
      nickname
    }
  }
}
    `;

/**
 * __useGetMyMatchesQuery__
 *
 * To run a query within a React component, call `useGetMyMatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMatchesQuery({
 *   variables: {
 *      accountID: // value for 'accountID'
 *   },
 * });
 */
export function useGetMyMatchesQuery(baseOptions: Apollo.QueryHookOptions<GetMyMatchesQuery, GetMyMatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMatchesQuery, GetMyMatchesQueryVariables>(GetMyMatchesDocument, options);
      }
export function useGetMyMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMatchesQuery, GetMyMatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMatchesQuery, GetMyMatchesQueryVariables>(GetMyMatchesDocument, options);
        }
export type GetMyMatchesQueryHookResult = ReturnType<typeof useGetMyMatchesQuery>;
export type GetMyMatchesLazyQueryHookResult = ReturnType<typeof useGetMyMatchesLazyQuery>;
export type GetMyMatchesQueryResult = Apollo.QueryResult<GetMyMatchesQuery, GetMyMatchesQueryVariables>;
export const FindLocationCoursesDocument = gql`
    query findLocationCourses($locationID: ID!) {
  location(location_id: $locationID) {
    courses {
      id
      name
    }
  }
}
    `;

/**
 * __useFindLocationCoursesQuery__
 *
 * To run a query within a React component, call `useFindLocationCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLocationCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLocationCoursesQuery({
 *   variables: {
 *      locationID: // value for 'locationID'
 *   },
 * });
 */
export function useFindLocationCoursesQuery(baseOptions: Apollo.QueryHookOptions<FindLocationCoursesQuery, FindLocationCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLocationCoursesQuery, FindLocationCoursesQueryVariables>(FindLocationCoursesDocument, options);
      }
export function useFindLocationCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLocationCoursesQuery, FindLocationCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLocationCoursesQuery, FindLocationCoursesQueryVariables>(FindLocationCoursesDocument, options);
        }
export type FindLocationCoursesQueryHookResult = ReturnType<typeof useFindLocationCoursesQuery>;
export type FindLocationCoursesLazyQueryHookResult = ReturnType<typeof useFindLocationCoursesLazyQuery>;
export type FindLocationCoursesQueryResult = Apollo.QueryResult<FindLocationCoursesQuery, FindLocationCoursesQueryVariables>;
export const FindCourseHolesDocument = gql`
    query findCourseHoles($courseID: ID!) {
  course(course_id: $courseID) {
    holes {
      id
      course_order
      par
    }
  }
}
    `;

/**
 * __useFindCourseHolesQuery__
 *
 * To run a query within a React component, call `useFindCourseHolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCourseHolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCourseHolesQuery({
 *   variables: {
 *      courseID: // value for 'courseID'
 *   },
 * });
 */
export function useFindCourseHolesQuery(baseOptions: Apollo.QueryHookOptions<FindCourseHolesQuery, FindCourseHolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCourseHolesQuery, FindCourseHolesQueryVariables>(FindCourseHolesDocument, options);
      }
export function useFindCourseHolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCourseHolesQuery, FindCourseHolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCourseHolesQuery, FindCourseHolesQueryVariables>(FindCourseHolesDocument, options);
        }
export type FindCourseHolesQueryHookResult = ReturnType<typeof useFindCourseHolesQuery>;
export type FindCourseHolesLazyQueryHookResult = ReturnType<typeof useFindCourseHolesLazyQuery>;
export type FindCourseHolesQueryResult = Apollo.QueryResult<FindCourseHolesQuery, FindCourseHolesQueryVariables>;
export const CreateNewMatchDocument = gql`
    mutation createNewMatch($newMatch: NewMatch) {
  createMatch(newMatch: $newMatch)
}
    `;
export type CreateNewMatchMutationFn = Apollo.MutationFunction<CreateNewMatchMutation, CreateNewMatchMutationVariables>;

/**
 * __useCreateNewMatchMutation__
 *
 * To run a mutation, you first call `useCreateNewMatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewMatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewMatchMutation, { data, loading, error }] = useCreateNewMatchMutation({
 *   variables: {
 *      newMatch: // value for 'newMatch'
 *   },
 * });
 */
export function useCreateNewMatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewMatchMutation, CreateNewMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewMatchMutation, CreateNewMatchMutationVariables>(CreateNewMatchDocument, options);
      }
export type CreateNewMatchMutationHookResult = ReturnType<typeof useCreateNewMatchMutation>;
export type CreateNewMatchMutationResult = Apollo.MutationResult<CreateNewMatchMutation>;
export type CreateNewMatchMutationOptions = Apollo.BaseMutationOptions<CreateNewMatchMutation, CreateNewMatchMutationVariables>;
export const FindLocationNamesDocument = gql`
    query findLocationNames {
  locations {
    id
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