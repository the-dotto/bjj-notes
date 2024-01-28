import { ButtonLogout } from "./components/ButtonLogout";

export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Log Out</h1>

        <p>
          Are you sure you want to log out? You will be required to log in once
          again to use the app.
        </p>
      </div>

      <ButtonLogout />
    </>
  );
}
