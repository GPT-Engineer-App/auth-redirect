import React, { useState, useEffect } from "react";
import { Box, Button, Input, VStack, Text, useToast, Container, Heading, Image } from "@chakra-ui/react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("supabase.auth.token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    const response = await fetch("https://vdnhjxmsuykhvhnvjupi.supabase.co/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkbmhqeG1zdXlraHZobnZqdXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjIyNjUsImV4cCI6MjAyNTM5ODI2NX0.byaihexABIEbRtnd1-n8R33kkt4lIwcB1xsX6P6PUA8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("supabase.auth.token", JSON.stringify(data));
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login Failed",
        description: data.error_description || "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    setIsLoggedIn(false);
    toast({
      title: "Logout Successful",
      description: "You have been successfully logged out.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent>
      <VStack spacing={4} mt="20">
        <Image src="https://images.unsplash.com/photo-1523485474951-78fcd9344f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBsb2dpbnxlbnwwfHx8fDE3MTM0NDU3NzZ8MA&ixlib=rb-4.0.3&q=80&w=1080" boxSize="150px" />
        <Heading>Welcome to Secure App</Heading>
        {!isLoggedIn ? (
          <>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
              Login
            </Button>
          </>
        ) : (
          <>
            <Text>You are logged in!</Text>
            <Button leftIcon={<FaSignOutAlt />} colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
