import { messages } from "../data/messages";
import { getUser } from "../utils/auth";

export default function Messages() {
  const currentUser = getUser();
  const visibleMessages =
    currentUser.role === "admin"
      ? messages
      : messages.filter((m) => m.owner === currentUser.email);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <ul className="space-y-4">
        {visibleMessages.map((m) => (
          <li
            key={m.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <strong>{m.from}:</strong> {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
