import { userCard, userCard__img } from "./UserCard.module.css";

export default function UserCard({ user, avatar, name }) {
  return (
    <div className={userCard}>
      <h1>{user}</h1>
      <img src={avatar} alt={`${user}s avatar`} className={userCard__img} />

      <div className="details">
        <p>Name: {name}</p>
      </div>
    </div>
  );
}
