import apiClient from "@/lib/api-client";
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/containts";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/stores";
import { createAuthSlice } from "@/stores/slices/auth-slice";
const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const validateSignup = () => {
    if (!signupEmail.length) {
      toast.error("Email is required");
      return false;
    }
    if (!signupPassword.length) {
      toast.error("Password is required");
      return false;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error("ConfirmPassword is not same as Password");
      return false;
    }
    return true;
  };
  const validatelogIn = () => {
    if (!loginEmail.length) {
      toast.error("Email is required");
      return false;
    }
    if (!loginPassword.length) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (validatelogIn()) {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        {
          email: loginEmail,
          password: loginPassword,
        },
        { withCredentials: true }
      );
      setUserInfo(response.data.user);
      if (response.data.user.profileSetup) {
        navigate("/chat");
      }
      //  else {
      //   navigate("/profile");
      // }
    }
  };
  const handleSignup = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(
        SIGNUP_ROUTE,
        {
          email: signupEmail,
          password: signupPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center border-black">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex justify-center flex-col items-center">
            <div className="flex items-center justify-center">
              <h1 className=" text-5xl font-bold md:text-6xl">Hello</h1>
              <img src={Victory} className="h-[100px]" />
            </div>
            <p className="font-medium text-center">Fill the required details</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col mt-5 gap-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  value={loginEmail}
                  className="rounded-full p-6"
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                  }}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={loginPassword}
                  className="rounded-full p-6"
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col  gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  value={signupEmail}
                  className="rounded-full p-6"
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                  }}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={signupPassword}
                  className="rounded-full p-6"
                  onChange={(e) => {
                    setSignupPassword(e.target.value);
                  }}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  value={signupConfirmPassword}
                  className="rounded-full p-6"
                  onChange={(e) => {
                    setSignupConfirmPassword(e.target.value);
                  }}
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img
            className="h-[700px]"
            alt="background-login-page"
            src={Background}
          />
        </div>
      </div>
    </div>
  );
};
export default Auth;
