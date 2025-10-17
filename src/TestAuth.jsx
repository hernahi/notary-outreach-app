import { validateUser, getUser } from './utils/auth';

export default function TestAuth() {
  const handleTest = () => {
    const test1 = validateUser("admin@notary.com", "1234");
    console.log("Admin test:", test1);

    const test2 = validateUser("notary@notary.com", "5678");
    console.log("Notary test:", test2);

    console.log("Current user in localStorage:", getUser());
  };

  return (
    <div className="p-4">
      <h1>Auth Test</h1>
      <button
        onClick={handleTest}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Run Auth Test
      </button>
    </div>
  );
}
