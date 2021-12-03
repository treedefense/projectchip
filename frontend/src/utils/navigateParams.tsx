import { useNavigate, createSearchParams } from "react-router-dom";

export type NavigateSearchFunction = (path: string, search: Record<string, string>) => void;

// useNavigateSearch allows navigating to a new page with search params from an object.
// For example: useNavigateSearch('page', {a: 'yes', b: 'no'});
// Would navigate to the page: /page?a=yes&b=no
export function useNavigateSearch() : NavigateSearchFunction {
  const navigate = useNavigate();
  return (path: string, search: Record<string, string>) => {
    navigate(path + '?' + createSearchParams(search));
  }
}
