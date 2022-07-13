import { gql } from '@apollo/client';

const GET_ALL_JOBS = gql`
  query Jobs {
    items {
      area
      companyName
      createdAt
      currency
      description
      flagCode
      id
      jobType
      numberOfPositions
      relocate
      salaryFrom
      salaryTo
      skills
      title
    }
  }
`;

export { GET_ALL_JOBS };
