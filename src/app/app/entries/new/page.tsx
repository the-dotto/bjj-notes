import { Form } from "./components/Form";

export default async function Page() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">New Entry</h1>
      </div>

      <Form />
    </>
  );
}
