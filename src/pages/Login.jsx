import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../components/Forms/InputGroup";

export default function Login() {
    const emailInput = useRef();
    const passwordInput = useRef();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput.current.value,
                    password: passwordInput.current.value,
                }),
                credentials: "include",
            }
        );
        if (response.status !== 200) {
            setErrorMessage(
                "Could not log you in. Please check your email or password"
            );
        } else {
            navigate("/");
        }
    };

    return (
        <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center">
            <div className="flex flex-row rounded-md overflow-hidden shadow-xl">
                <div className="__form__ | p-8 flex flex-col justify-between bg-white max-w-md">
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <h1 className="font-bold text-3xl leading-none">
                                Welcome Back!
                            </h1>
                            {errorMessage && (
                                <div className="flex flex-row rounded-md bg-rose-50 text-rose-700 p-4 gap-4 my-8 mb-4">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div>{errorMessage}</div>
                                </div>
                            )}

                            <div className="flex flex-col gap-4 my-8">
                                <InputGroup>
                                    <label
                                        htmlFor="email"
                                        className="text-zinc-600"
                                    >
                                        E-mail address
                                    </label>
                                    <input
                                        className="text-input-light-bg"
                                        type="email"
                                        name="email"
                                        id="email"
                                        ref={emailInput}
                                        required
                                        placeholder="johndoe@gmail.com"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        htmlFor="password"
                                        className="text-zinc-600"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="text-input-light-bg"
                                        type="password"
                                        name="password"
                                        id="password"
                                        ref={passwordInput}
                                        required
                                        placeholder="johndoe@gmail.com"
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-zinc-400 italic">
                            <button
                                className="w-full btn-primary"
                                type="submit"
                            >
                                Login
                            </button>
                            <span>
                                Don't have an account yet? Register{" "}
                                <Link to="/register" className="link">
                                    here.
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
