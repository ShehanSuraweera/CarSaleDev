import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
  useDisclosure,
} from "@heroui/react";
import { LockIcon, MailIcon } from "./icons";
import { loginUser } from "@/src/lib/api";
import { UserContext } from "@/src/UserContext";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean; // Control modal visibility
  onClose: () => void; // Handle closing the modal
  onLogin?: (email: string, password: string) => void; // Callback for login
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, ready, setUser } = useContext(UserContext) || {};
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loggingUser = await loginUser(username, password);

      if (setUser) {
        localStorage.setItem("user", JSON.stringify(loggingUser));
        setUser(loggingUser);
        console.log("Setted User in login"); // Update the context with user data
      }

      // Persist user session
      console.log("User after login:", loggingUser);

      alert("Login Successful");
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ready) {
      console.log("User from context:", user); // Log only when ready
    }
  }, [ready, user]);

  const handleCloseButton = () => {
    onClose();
    router.push("/");
  };

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <ModalBody>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              endContent={
                <MailIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
              }
              label="Username"
              placeholder="Enter your username"
              variant="bordered"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <LockIcon className="flex-shrink-0 text-2xl pointer-events-none text-default-400" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
            />
            <div className="flex justify-between px-1 py-2">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={handleCloseButton}>
              Close
            </Button>
            <Button color="primary" onPress={handleLogin}>
              Sign in
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
