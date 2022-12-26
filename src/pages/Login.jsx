import AnchorLink from "../components/AnchorLink";
import CTAButton from "../components/controls/CTAButton";
import TextInput from "../components/controls/TextInput";
import InputGroup from "../components/Forms/InputGroup";

export default function Login() {
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        console.log("login");
    };

    return (
        <div className="w-screen h-screen bg-zinc-900 flex items-center justify-center">
            <div className="flex flex-row rounded-md overflow-hidden shadow-xl">
                <div className="__form__ | p-8 flex flex-col justify-between bg-white ">
                    <form onSubmit={handleLoginSubmit}>
                        <div>
                            <h1 className="font-bold text-3xl leading-none">
                                Welcome Back!
                            </h1>

                            <div className="flex flex-col gap-4 my-8">
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
                                    <TextInput
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="johndoe@gmail.com"
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-zinc-400 italic">
                            <CTAButton className="w-full" type="submit">
                                Login
                            </CTAButton>
                            <span>
                                Don't have an account yet? Register{" "}
                                <AnchorLink href="/register">here.</AnchorLink>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
