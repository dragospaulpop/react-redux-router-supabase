import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <div className="bg-glacier-950 flex h-screen flex-col items-center justify-center text-zinc-100">
        <Outlet />
      </div>
    </>
  );
}
