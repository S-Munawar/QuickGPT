import React from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = React.useState<"login" | "register">("login");
  const { axios, setToken, navigate } = useAppContext();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Absolute backend URL
    const url =
      state === "login"
        ? "http://localhost:3000/api/user/login"
        : "http://localhost:3000/api/user/register";

    // Send only relevant fields
    const payload =
      state === "login"
        ? { email: formData.email, password: formData.password }
        : formData;

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Adjust route as needed
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">
        {state === "login" ? "Login" : "Sign up"}
      </h1>
      <p className="text-gray-500 text-sm mt-2">
        Please {state === "login" ? "login" : "sign up"} to continue
      </p>

      {state === "register" && (
        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-none outline-none ring-0 w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-none outline-none ring-0 w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-none outline-none ring-0 w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {state === "login" && (
        <div className="mt-4 text-left text-indigo-500">
          <button type="reset" className="text-sm">
            Forget password?
          </button>
        </div>
      )}

      <button
        type="submit"
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        {state === "login" ? "Login" : "Sign up"}
      </button>

      <p
        onClick={() =>
          setState((prev) => (prev === "login" ? "register" : "login"))
        }
        className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
      >
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span className="text-indigo-500 hover:underline">Click here</span>
      </p>
    </form>
  );
};

export default Login;
