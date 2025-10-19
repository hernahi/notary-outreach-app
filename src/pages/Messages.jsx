import React from "react";
import messages from "../data/messages.json";

export default function Messages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <ul className="space-y-4">
        {messages.map((m) => (
          <li key={m.id} className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold">{m.sender}</h3>
            <p className="text-gray-700">{m.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
