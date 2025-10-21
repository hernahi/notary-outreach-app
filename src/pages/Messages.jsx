import React from "react";
import CountUp from "react-countup";
import messages from "../data/messages.json";
import { getUser } from "../utils/auth";

export default function Messages() {
  const currentUser = getUser();
  const visibleMessages =
    currentUser.role === "admin"
      ? messages
      : messages.filter((m) => m.owner === currentUser.email);

  const totalMessages = visibleMessages.length;
  const unreadMessages = visibleMessages.filter((m) => !m.read).length;
  const readMessages = totalMessages - unreadMessages;

  return (
    <div className="p-8 space-y-8">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Messages</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            <CountUp end={totalMessages} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Unread</h3>
          <p className="text-3xl font-bold text-red-600 mt-1">
            <CountUp end={unreadMessages} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Read</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">
            <CountUp end={readMessages} duration={1.5} />
          </p>
        </div>
      </div>

      {/* List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Messages</h2>
        <ul className="space-y-4">
          {visibleMessages.map((m) => (
            <li
              key={m.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <span>
                  <strong>{m.from}:</strong> {m.content}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    m.read
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {m.read ? "Read" : "Unread"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
