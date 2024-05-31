import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-bold">Home</h1>
        <h2>
          Welcome
          {user && <span className="text-blue-300"> {user.email}</span>}
          {!user && <span className="text-blue-300"> Anonymous</span>}, you have
          the role of
          {user && <span className="text-blue-300"> {user.role}</span>}
          {!user && <span className="text-blue-300"> Guest</span>}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/login"
            className="rounded border p-2 hover:bg-slate-100 hover:text-black transition-colors">
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded border p-2 hover:bg-slate-100 hover:text-black transition-colors">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}
