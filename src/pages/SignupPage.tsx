import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { signup, AuthStatus } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const status = useAppSelector((state) => state.auth.status);
  const error = useAppSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordcheck, setPasswordcheck] = useState<string>("");

  const [validation, setValidation] = useState<string[]>([]);

  const [formDirty, setFormDirty] = useState<boolean>(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormDirty(true);

    switch (field) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordcheck":
        setPasswordcheck(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (status === AuthStatus.succeeded) {
      navigate("/login");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (!formDirty) {
      return;
    }

    const errors = [];

    if (email === "" || password === "" || passwordcheck === "") {
      errors.push("Please fill out all fields");
    }

    if (password !== passwordcheck) {
      errors.push("Passwords do not match");
    }

    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false
    ) {
      errors.push("Please enter a valid email address");
    }

    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/.test(
        password,
      ) === false
    ) {
      errors.push(
        "Please enter a valid password (minimum 16 characters: lowercase, uppercase, digits and special character '@$!%*?&')",
      );
    }

    setValidation(errors);
  }, [email, password, passwordcheck, formDirty]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold">Sign up</h1>
      <form
        className="border-glacier-800 flex w-full flex-col gap-1 rounded border p-8 md:w-96"
        onSubmit={handleSubmit}>
        <fieldset className="relative flex w-full flex-col items-center justify-start gap-1 p-2 py-6">
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="input-field text-glacier-800 bg-glacier-100 border-glacier-200 peer w-full rounded border p-2 font-bold"
          />
          <label
            htmlFor="email"
            className="text-glacier-200 absolute left-2 top-0 font-bold opacity-100 transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:opacity-0 peer-focus:top-0 peer-focus:opacity-100">
            Email
          </label>
          <p className="text-glacier-300 absolute bottom-0 left-2 w-full text-left text-sm opacity-100 transition-all peer-placeholder-shown:bottom-2 peer-placeholder-shown:opacity-0 peer-focus:bottom-0 peer-focus:opacity-100">
            This is your official
            <span className="text-glacier-200 mx-1">rau.ro</span>
            email address.
          </p>
        </fieldset>
        <fieldset className="relative flex w-full flex-col items-center justify-start gap-1 p-2 py-6">
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
            className="input-field text-glacier-800 bg-glacier-100 border-glacier-200 peer w-full rounded border p-2 font-bold"
          />
          <label
            htmlFor="password"
            className="text-glacier-200 absolute left-2 top-0 font-bold opacity-100 transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:opacity-0 peer-focus:top-0 peer-focus:opacity-100">
            Password
          </label>
          <p className="text-glacier-300 absolute bottom-0 left-2 w-full text-left text-sm opacity-100 transition-all peer-placeholder-shown:bottom-2 peer-placeholder-shown:opacity-0 peer-focus:bottom-0 peer-focus:opacity-100">
            Choose a<span className="text-glacier-300 mx-1">strong</span>
            password.
          </p>
        </fieldset>
        <fieldset className="relative flex w-full flex-col items-center justify-start gap-1 p-2 py-6">
          <input
            placeholder="Confirm your password"
            type="password"
            name="passwordcheck"
            id="passwordcheck"
            value={passwordcheck}
            onChange={(e) => handleFieldChange("passwordcheck", e.target.value)}
            className="input-field text-glacier-800 bg-glacier-100 border-glacier-200 peer w-full rounded border p-2 font-bold"
          />
          <label
            htmlFor="passwordcheck"
            className="text-glacier-200 absolute left-2 top-0 font-bold opacity-100 transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:opacity-0 peer-focus:top-0 peer-focus:opacity-100">
            Confirm Password
          </label>
          <p className="text-glacier-300 absolute bottom-0 left-2 w-full text-left text-sm opacity-100 transition-all peer-placeholder-shown:bottom-2 peer-placeholder-shown:opacity-0 peer-focus:bottom-0 peer-focus:opacity-100">
            Repeat your password.
          </p>
        </fieldset>
        <button
          type="submit"
          disabled={
            formDirty === false ||
            validation.length > 0 ||
            status === AuthStatus.loading
          }
          className="bg-glacier-600 text-glacier-200 mx-2 my-6 rounded px-4 py-2 font-bold disabled:opacity-50">
          Sign up
        </button>

        {validation.length > 0 && (
          <ul className="list-disc p-6 text-sm text-red-500">
            {validation.map((error, index) => (
              <li className="my-2 px-2" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </form>
      {error && (
        <div className="mt-4 rounded border p-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {status === AuthStatus.loading && (
        <div className="mt-4 flex items-center p-2 text-sm text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-ml-1 mr-3 h-5 w-5 animate-spin text-green-500"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      )}
    </>
  );
}
