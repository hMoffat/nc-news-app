import { app__page } from "./page.module.css";

export default function ErrorPage({ message, status }) {
  return (
    <div className={app__page}>
      {!status && !message ? <h1>404, page not found...</h1> : null}
      {status === 404 && <h1>404, page not found...</h1>}
      {message && <p>{message}</p>}
    </div>
  );
}
