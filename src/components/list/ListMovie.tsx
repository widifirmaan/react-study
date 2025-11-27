import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface MediaItem {
  id: number; // Unique identifier for each product
  title: string; // Product name
  overview: string; // Movie overview
  vote_average: number; // Rating of the movie
  image: string; // URL or path to the product image
}

interface ListMovieProps {
  source: 'movie' | 'tv';
  sorting: 'popular' | 'upcoming' | 'top_rated' | 'list';

}

export default function ListMovie({ source, sorting }: ListMovieProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setMedia([]);

    const fetchMedia = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      
      if (!apiKey) {
        console.error("TMDB API Key not found.");
        setLoading(true);
        return;
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${source}/${sorting}?api_key=${apiKey}&language=en-US&page=1`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedMedia = data.results.map((item: any) => ({
          id: item.id,
          title: item.title || item.name,
          overview: item.overview,
          vote_average: item.vote_average,
          image: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        }));
        setMedia(formattedMedia);
      } catch (error) {
        console.error(`Failed to fetch ${source}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [source, sorting]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 ">
            List {source === 'movie' ? 'Movie' : 'TV Show'}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800    dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Refresh
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100  border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs  w-1/3"
              >
                Judul
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs "
              >
                Overview
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs "
              >
                Rating
              </TableCell>
            </TableRow>
          </TableHeader>
          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <TableRow>
                <TableCell className="py-4 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              media.map((item) => (
                <TableRow key={item.id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[75px] w-[50px] flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image} className="object-cover w-full h-full" alt={item.title}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm ">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm  max-w-xs truncate">
                    {item.overview}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm ">
                    {item.vote_average.toFixed(1)} / 10
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
