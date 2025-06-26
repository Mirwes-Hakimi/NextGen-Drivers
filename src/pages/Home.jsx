import { motion } from "framer-motion";
import CallbackButton from "../components/CallbackButton";

export default function Home(){

    return (
        <div className="text-center p-6">
         <motion.h1
         className="text-4xl font-bold text-lime-600"
         initial={{ y:-100, opacity: 0  }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.6 }}
         >Welcome to A & B Driving School</motion.h1>
         <p>Learn safe driving from the best instructors. Choose your package now.</p>
         <a
         href="https://www.dmv.ca.gov/" 
         target="_blank"
         rel="noopener noreferrer"
         className="mt-6 inline-block bg-lime-600 text-white px-6 py-2 rounded-xl hover:bg-lime-700 transition"
         >Visit DMV site</a>
         <CallbackButton />
        
        </div>
    )
}