import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      localStorage.setItem("username", username);
      navigate("/quiz");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate("/quiz");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-black to-gray-600">
      <div className="">
        <h1 className="text-xl font-semibold text-center text-gray-50 mb-8">
          QUIZAJA
        </h1>
      </div>
      <div className="w-full max-w-sm p-8 rounded-lg bg-white shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Login
        </h1>
        <div className="py-2">
          <Input
            placeholder="Masukkan Username ..."
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
        <div className="py-2">
          <Button className=" bg-gray-800 text-white hover:bg-gray-200 hover:text-black " type="primary" block onClick={handleLogin}>
            Login
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
