import Image from "next/image";

export default function UserTag({ userId }) {
  return (
    <div className="flex items-center mb-0 text-gray-500 text-sm align-center gap-1">
      <Image
        src={"/user-avatar.png"}
        width={16}
        height={16}
        alt="user-avatar"
      />
      <span className="flex items-center justify-center h-full pt-0.5">
        user{userId}
      </span>
    </div>
  );
}
