import Button from "@components/atoms/Button";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const onGithubSignIn = async () => {
    signIn("github", {
      callbackUrl: "http://localhost:3412/lelang-terbuka",
    });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-6 bg-amber-50">
      <h2 className="text-3xl font-bold text-gray-700">Log in to Tokolelang</h2>

      <Button type="button" onPress={onGithubSignIn}>
        Continue with Github
      </Button>
    </main>
  );
};

export default LoginPage;
