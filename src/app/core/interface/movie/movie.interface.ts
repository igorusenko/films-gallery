export interface IMoviesResponse {
  page?: number;
  results: Array<IMovie> | undefined;
  total_pages?: number;
  total_results?: number;
}

export interface IMovie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<number>;
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  showElse?: boolean;
  homepage?: string;
  production_companies?: Array<ICompany>;
  genres?: Array<IGen>
}

export interface IMoviesSearchFilter {
  query: string;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  page?: number;
  region?: string;
  year?: string;
}

export interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IGen {
  id: number;
  name: string;
}
