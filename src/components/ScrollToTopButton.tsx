"use client";

import { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@heroui/button";

const ScrollToTopButton = () => {
  const { y } = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(y > 300);
  }, [y]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onPress={scrollToTop}
      className={`fixed bottom-10 right-10 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUpIcon className="w-6 h-6" />
    </Button>
  );
};

export default ScrollToTopButton;
