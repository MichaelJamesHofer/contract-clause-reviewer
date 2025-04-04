import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    
    return !result?.error;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  const requireAuth = (callback: () => void) => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }
    
    callback();
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    requireAuth,
  };
} 