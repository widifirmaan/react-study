import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

interface MediaItem {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  image: string;
}

interface ApiResponse {
  results: any[];
}

type Source = "movie" | "tv";
type Sorting = "popular" | "upcoming" | "top_rated" | "list";

interface GetMediaParams {
  source: Source;
  sorting: Sorting;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
  endpoints: (builder) => ({
    getMedia: builder.query<MediaItem[], GetMediaParams>({
      query: ({ source, sorting }) => {
        if (!apiKey) {
          throw new Error("TMDB API Key not found.");
        }
        return `${source}/${sorting}?api_key=${apiKey}&language=en-US&page=1`;
      },
      transformResponse: (response: ApiResponse) =>
        response.results.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          overview: item.overview,
          vote_average: item.vote_average,
          image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        })),
    }),
  }),
});

export const { useGetMediaQuery } = apiSlice;