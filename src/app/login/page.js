import LoginPage from "@/components/login/LoginPage";

export const metadata = {
  title: "Login - Tech Blog",
  description:
    "Access your Tech Blog account to manage your posts, view analytics, and connect with other bloggers. Secure and easy login to keep you connected.",
  alternates: {
    canonical: "https://www.techblog.me/login",
  },
  openGraph: {
    title: "Login - Tech Blog",
    description:
      "Access your Tech Blog account to manage your posts, view analytics, and connect with other bloggers. Secure and easy login to keep you connected.",
    url: "https://www.techblog.me/login",
    site_name: "Tech Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Tech Blog",
    description:
      "Access your Tech Blog account to manage your posts, view analytics, and connect with other bloggers. Secure and easy login to keep you connected.",
  },
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
