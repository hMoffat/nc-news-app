import Search from "./Search";
import Topics from "./Topics";
import "./FilterManager.css";
import { homePage__filterArea } from "../../pages/HomePage.module.css";

export default function FilterManager({ topics, setTopics, searchesDisabled }) {
  return (
    <div className={`${homePage__filterArea} filter`}>
      <Topics topics={topics} setTopics={setTopics} />
      <Search searchesDisabled={searchesDisabled} />
    </div>
  );
}
