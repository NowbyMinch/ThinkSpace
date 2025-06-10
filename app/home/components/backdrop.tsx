"use client";
import { motion } from "framer-motion";

export const Backdrop  = () => {
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="w-full h-full bg-[rgba(0,0,0,0.3)] fixed z-[110]" />
    );
};

export const Backdrop2  = () => {
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="w-full h-full bg-[rgba(0,0,0,0.3)] fixed z-[110]" />
    );
};

type Backdrop3Props = {
    onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Backdrop3 = ({ onClick }: Backdrop3Props) => {
    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" onClick={onClick} />
    );
};