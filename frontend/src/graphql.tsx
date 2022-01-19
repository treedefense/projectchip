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

export type FindLocationCoursesQueryVariables = Exact<{
  locationID: Scalars['ID'];
}>;


export type FindLocationCoursesQuery = { __typename?: 'Query', location?: { __typename?: 'Location', courses?: Array<{ __typename?: 'Course', id: string, name: string } | null | undefined> | null | undefined } | null | undefined };

export type FindCourseHolesQueryVariables = Exact<{
  courseID: Scalars['ID'];
}>;


export type FindCourseHolesQuery = { __typename?: 'Query', course?: { __typename?: 'Course', holes?: Array<{ __typename?: 'Hole', id: string, course_order: number, par: number } | null | undefined> | null | undefined } | null | undefined };

export type FindLocationNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindLocationNamesQuery = { __typename?: 'Query', locations: Array<{ __typename?: 'Location', id: string, name: string }> };


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