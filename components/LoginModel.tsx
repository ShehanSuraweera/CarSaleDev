import React, { useContext, useState } from "react";
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
import { loginUser } from "@/lib/api";
import { UserContext } from "@/app/UserContext";
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

  const userContext = useContext(UserContext);

  const handleLogin = async () => {
    // if (onLogin) {
    //   onLogin(username, password); // Trigger parent-provided login handler
    // }
    try {
      const user = await loginUser(username, password);
      alert("Login Successfull");

      userContext?.setUser(user);
      // Optionally store user in localStorage to persist the session
      localStorage.setItem("user", JSON.stringify(user));

      onClose(); // Close the modal after login
    } catch (error) {
      console.log(error);
    }
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
            <Button color="danger" variant="flat" onPress={onClose}>
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
