import { useUserStore } from "../store/use-store";

export default function ProfileToken() {
  const user = useUserStore((state) => state.user);

  return (
    user && (
      <div className={"absolute top-2 left-2 flex flex-row items-center"}>
        <img
          src={user.picture}
          alt={user.name}
          className={"rounded-full"}
          width={32}
          height={32}
        />
        <div className={"text-xs ml-2"}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
    )
  );
}
