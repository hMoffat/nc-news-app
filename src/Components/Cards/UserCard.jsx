import "./UserCard.css";

export default function UserCard({ user, avatar, name }) {
  return (
    <>
      <h1>{user}</h1>
      <img src={avatar} alt={`${user}s avatar`} />

      <div className="details">
        <p>Name: {name}</p>
      </div>
    </>
  );
}
