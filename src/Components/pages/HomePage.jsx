import ArticleManager from "../Managers/ArticleManager";
import FilterManager from "../Managers/FilterManager/FilterManager";

export default function HomePage() {
  return (
    <>
      <h1>Home Page Component Placeholder</h1>
      <FilterManager />
      <ArticleManager />
    </>
  );
}
