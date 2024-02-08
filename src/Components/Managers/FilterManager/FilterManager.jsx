import Search from "./Search";
import Topics from "./Topics";

export default function FilterManager({ topics, setTopics }) {
  return (
    <div className="filter">
      <h2>FilterManager Component Placeholder</h2>
      <Topics topics={topics} setTopics={setTopics} />
      <Search />
    </div>
  );
}
