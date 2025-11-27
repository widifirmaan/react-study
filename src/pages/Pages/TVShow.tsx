import PageMeta from "../../components/common/PageMeta";
import ListMovie from "../../components/list/ListMovie";

export default function TVShow() {
    let sorting: "top_rated" | "list" | "popular" = "popular";

  if (location.pathname === "/tv/new") {
    sorting = "list";
  } else if (location.pathname === "/tv/hits") {
    sorting = "top_rated";
  }
  return (
    <>
      <PageMeta
        title="TVShow - TMDB" />
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-12">
          <ListMovie source="tv" sorting={sorting}/>
        </div>
      </div>
    </>
  );
}
