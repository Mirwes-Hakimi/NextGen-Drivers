import { motion } from "framer-motion";

export default function CallbackButton(){
    
    return (
        <motion.button 
          className="fixed bottom-6 right-6 bg-red-700 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-lime-700 transition"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1}}
          transition={{ type: "spring", stiffness: 300}}
        onClick={() => alert("callback request sent!")}

        >Request a Callback</motion.button>
    )
}