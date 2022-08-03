import Button from "@components/atoms/Button";
import TextField from "@components/atoms/input/TextField";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  const onGithubSignIn = async () => {
    signIn("github", {
      callbackUrl: "http://localhost:3412/lelang-terbuka",
    });
  };

  const onEmailSignIn = async () => {
    signIn("email", {
      email,
      callbackUrl: "http://localhost:3412/lelang-terbuka",
    });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-6 bg-amber-50">
      <h2 className="text-3xl font-bold text-gray-700">Log in to Tokolelang</h2>

      <form
        className="flex flex-col items-center justify-center gap-y-4"
        onSubmit={onEmailSignIn}
      >
        <TextField
          disabled
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button isDisabled type="submit">
          Continue with Email
        </Button>
      </form>

      {/*  */}
      <span className="text-sm font-semibold">OR</span>
      <Button type="button" onPress={onGithubSignIn}>
        Continue with Github
      </Button>
    </main>
  );
};

export default LoginPage;
