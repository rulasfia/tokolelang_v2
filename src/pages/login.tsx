import Button from "@components/atoms/Button";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const onGithubSignIn = async () => {
    signIn("github", {
      callbackUrl: "http://localhost:3412/terbuka",
    });
  };

  return (
    <main className="min-h-screen bg-amber-50 w-full flex flex-col justify-center items-center gap-y-6">
      <h2 className="text-3xl font-bold text-gray-700">Log in to Tokolelang</h2>

      <Button type="button" onPress={onGithubSignIn}>
        Continue with Github
      </Button>
    </main>
  );
};

export default LoginPage;
