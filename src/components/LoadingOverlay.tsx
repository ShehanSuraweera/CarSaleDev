import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Bars } from "react-loader-spinner";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full bg-black/15 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col items-center justify-center w-full h-[500px] "
      >
        <div className="flex flex-col items-center justify-end p-6 space-y-5 shadow-md rounded-2xl bg-slate-100">
          <Bars color="#FDC221" height={50} width={50} />
          <p className="text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingOverlay;
