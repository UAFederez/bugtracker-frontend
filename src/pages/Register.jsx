import AnchorLink from "../components/AnchorLink";
import CTAButton from "../components/controls/CTAButton";
import TextInput from "../components/controls/TextInput";
import InputGroup from "../components/Forms/InputGroup";

export default function Register() {
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        console.log("register");
    };

    return (
        <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center">
            <div className="flex flex-row px-2 shadow-xl">
                <div className="__form__ | rounded-md overflow-hidden p-4 md:p-8 flex flex-col justify-between bg-white">
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="">
                            <h1 className="font-bold text-3xl leading-none">
                                Sign up
                            </h1>
                            <div className="text-sky-700 text-md bg-sky-50 my-4 p-4 rounded-md flex gap-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 hidden md:block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>

                                <p className="max-w-md leading-normal text-md">
                                    Upon signing up, you will be assigned by
                                    default as a bug reporter. Please request
                                    assistance from your administrator or
                                    project manager if you want to have your
                                    role changed.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                                <InputGroup>
                                    <label
                                        htmlFor="firstName"
                                        className="text-zinc-600"
                                    >
                                        First name
                                    </label>
                                    <TextInput
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="John"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        htmlFor="lastName"
                                        className="text-zinc-600"
                                    >
                                        Last name
                                    </label>
                                    <TextInput
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Doe"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        htmlFor="email"
                                        className="text-zinc-600"
                                    >
                                        E-mail address
                                    </label>
                                    <TextInput
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="johndoe@email.com"
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label
                                        htmlFor="password"
                                        className="text-zinc-600"
                                    >
                                        Password
                                    </label>
                                    <TextInput
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder=""
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-zinc-400 italic">
                            <CTAButton className="w-full" type="submit">
                                Sign up
                            </CTAButton>
                            <span>
                                Already have an account? Login{" "}
                                <AnchorLink href="/login">here.</AnchorLink>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
