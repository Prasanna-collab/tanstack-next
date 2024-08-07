import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../utils/http.js";

export default function NewEventsSection() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    //staleTime:5000 , //stale time used to refetch the cached data
    // to be showed only after 5 seconds. default value is 0.
    //gcTime:30000, //garbageCollection time. how long the data will be kept in cache. default value is 5 minutes.
    //refetchInterval:5000, //when to refetch the data. default value is 0. (when page is loaded, focused and when user interacts with the page)
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message={error.info?.message||"Failed to fetch data."} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
