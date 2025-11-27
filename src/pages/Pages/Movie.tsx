import PageMeta from "../../components/common/PageMeta";
import ListMovie from "../../components/list/ListMovie";

export default function Movie() {
  let sorting: "top_rated" | "upcoming" | "popular" = "popular";

  if (location.pathname === "/movie/new") {
    sorting = "upcoming";
  } else if (location.pathname === "/movie/hits") {
    sorting = "top_rated";
  }

  return (
    <>
      <PageMeta
        title="Movie - TMDB"/>
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-12">
          <ListMovie source="movie" sorting={sorting}/>
        </div>
      </div>
    </>
  );
}