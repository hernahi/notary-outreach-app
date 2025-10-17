// src/components/Header.jsx
export default function Header({ title, onLogout, color = "blue" }) {
  return (
    <header className={`bg-${color}-600 text-white p-4 flex justify-between items-center shadow`}>
      <h1 className="text-lg font-semibold">{title}</h1>
      <button
        onClick={onLogout}
        className={`bg-white text-${color}-600 font-medium px-3 py-1 rounded-md hover:bg-${color}-100 transition-all`}
      >
        Logout
      </button>
    </header>
  );
}
