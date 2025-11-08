"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorModal from "@/components/ui/ErrorModal";
import { Eye, EyeOff } from "lucide-react";
// import { useState } from 'react';

export default function EsqueceuSenha() {
  const params = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(Number(params.get("step")) || 1);
  useEffect(() => {
    router.push(`?step=${step}`);
  }, [step, router]);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [form, setForm] = useState({ email: "" });
  const [form2, setForm2] = useState({ email: "", code: "" });
  const [completeForm, setCompleteForm] = useState({
    email: "",
    code: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [code, setCode] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const step = Number(urlParams.get("step")) || 1;
      setStep(step);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;

    if (!Number.isInteger(value)) {
      e.preventDefault();
    }

    if (!/^[0-9]?$/.test(value)) {
      value = "";
    }

    e.target.value = value;

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const values = inputRefs.current.map((input) =>
      input?.value ? Number(input.value) : 0
    );
    setCode(values);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha/enviar-codigo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    if (data.message === "Código de redefinição enviado para o e-mail.") {
      setStep(2);
    } else {
      setMessage(data.message);
    }

    //console.log(data);
  };

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();

    const codeString = code.join("");
    const formSubmit = { email: form.email, code: codeString };
    setForm2(formSubmit);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha/verificar-codigo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formSubmit),
      }
    );

    const data = await res.json();
    if (data.message !== "Código válido. Você pode redefinir sua senha.") {
      setMessage(data.message);
    } else if (
      data.message === "Código válido. Você pode redefinir sua senha."
    ) {
      setStep(3);
    }
    //console.log(data);
  };

  const reenviar = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha/reenviar-codigo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    //console.log(form);
    const data = await res.json();
    if (data.message !== "Código de redefinição enviado para o e-mail.") {
      setMessage(data.message);
    }

    //console.log(data);
  };

  const handleSubmit3 = async (e: React.FormEvent) => {
    e.preventDefault();
    const CompleteForm = {
      email: form2.email,
      code: form2.code,
      novaSenha: completeForm.novaSenha,
      confirmarSenha: completeForm.confirmarSenha,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/esqueceu-senha/redefinir`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(CompleteForm),
      }
    );

    const data = await res.json();
    if (data.message === "Senha redefinida com sucesso.") {
      router.push("/login");
    } else {
      setMessage(data.message);
    }
    //console.log(data);
  };

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      <div className="w-[100%] h-[100vh] flex justify-center bg-[#A87CFF] ">
        <div className="w-[1730px] h-full max-w-[90%] flex justify-center items-center ">
          <AnimatePresence>
            <div className="flex flex-col w-full items-center h-[900px] max-h-[90%] bg-white overflow-y-auto rounded-[35px] relative ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-[100%] flex flex-col  h-full items-center overflow-y-auto "
              >
                <div className="h-fit flex flex-col items-center gap-4 max-w-[90%] my-auto py-4 ">
                  <div className="max-w-[90%] flex justify-center items-center ">
                    <div className="flex items-center flex-col w-[90%] ">
                      <h1 className="text-[30px] font-bold text-[#EB7262] text-center">
                        Esqueceu a senha?
                      </h1>
                      <h2 className="text-gray-700 text-[18px] text-center ">
                        {step === 1
                          ? "Insira o seu email e enviaremos um código de verificação para você voltar a acessar a sua conta."
                          : step === 2
                            ? "Um e-mail de confirmação foi enviado. Digite o código de verificação para redefinir sua senha com segurança."
                            : step === 3
                              ? "Crie uma nova senha com pelo menos 8 caracteres, incluindo letras, números e símbolos."
                              : ""}
                      </h2>
                      {/* <div className="w-[90%] max-w-[600px] ">
                                        </div> */}
                    </div>
                  </div>

                  {step === 1 && (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-8 w-full max-w-[500px] "
                    >
                      <div className="flex flex-col gap-4 justify-center items-center">
                        <input
                          type="email"
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                          }}
                          required
                          placeholder="Digite seu email"
                          className="p-3 text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]"
                        />
                      </div>

                      <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="button"
                            onClick={() => router.back()}
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Voltar
                          </motion.button>
                        </div>

                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="submit"
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Enviar código
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* <div className="flex justify-center items-center gap-10 ">
                                            <div className="flex flex-col gap-10 max-w-[90%] ">
                                                <motion.button whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2, ease: "easeInOut" }} 
                                                type='button'
                                                onClick={() => router.back()}
                                                className='bg-[#804EE5] w-[200px] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Voltar</motion.button>
                                            </div>

                                            <div className="flex flex-col gap-10 max-w-[90%] ">
                                                <motion.button
                                                whileTap={{ scale: 0.99 }}
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                type='submit'
                                                className='bg-[#804EE5] w-[200px] py-[8px] text-white text-[18px] rounded-[25px] shadow-md'>Enviar código</motion.button>
                                            </div>
                                        </div> */}

                      <div className="flex justify-center items-center mt-[-15px] ">
                        <div className="h-[1px] w-full bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                        <span className="px-4 flex justify-center items-center text-[18px]">
                          Ou
                        </span>
                        <div className="h-[1px] w-full bg-[rgba(0,0,0,0.50)] flex justify-center items-center"></div>
                      </div>

                      <h2 className="text-[18px] w-full text-center flex gap-1 justify-center items-center mt-[-15px]">
                        Volte ao
                        <a href="/login" className="text-[#3881AF]">
                          Login
                        </a>
                      </h2>
                    </motion.form>
                  )}

                  {step === 2 && (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onSubmit={handleSubmit2}
                      className="flex flex-col justify-center items-center gap-14 w-full "
                    >
                      <div className="fourthbox flex flex-col gap-4 h-[300px] max-h-[90%] ">
                        <div className="flex flex-col items-center gap-4 w-full h-full">
                          <h2 className="text-gray-700 text-[18px]">
                            Digite o código de verificação enviado para seu email:
                          </h2>
                          <div className="flex gap-1 max-w-[765px]  ">
                            {[...Array(5)].map((_, i) => (
                              <input
                                key={i}
                                ref={(el) => {
                                  inputRefs.current[i] = el!;
                                }}
                                type="text"
                                inputMode="numeric"
                                required
                                maxLength={1}
                                onPaste={(
                                  e: React.ClipboardEvent<HTMLInputElement>
                                ) => {
                                  e.preventDefault(); // prevent default paste

                                  const pastedText = e.clipboardData
                                    .getData("text")
                                    .replace(/\D/g, ""); // only digits
                                  if (!pastedText) return;

                                  const newCode = [...code]; // copy existing code
                                  for (
                                    let j = 0;
                                    j < pastedText.length && j < 6;
                                    j++
                                  ) {
                                    if (i + j < 5) {
                                      newCode[i + j] = pastedText[j]
                                        ? Number(pastedText[j])
                                        : 0; // fill with pasted digits as numbers, 0 if pasting less
                                      if (inputRefs.current[i + j]) {
                                        inputRefs.current[i + j]!.value =
                                          String(newCode[i + j]); // update input element
                                      }
                                    }
                                  }

                                  setCode(newCode);

                                  // focus next empty input if exists
                                  const nextIndex = newCode.findIndex(
                                    (c) => c === 0
                                  );
                                  if (
                                    nextIndex !== -1 &&
                                    inputRefs.current[nextIndex]
                                  ) {
                                    inputRefs.current[nextIndex]!.focus();
                                  }
                                }}
                                onChange={(e) => {
                                  handleChange(i, e);
                                }}
                                onKeyDown={(e) => {
                                  handleKeyDown(i, e);
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                  }
                                }}
                                className="codigo w-full h-[200px] rounded-[10px] text-center text-[70px] transition-all ease-in-out duration-300 focus:bg-[#9767f834] font-semibold bg-[#d9d9d9c5] outline-[rgba(151,103,248,0.6)]"
                              />
                            ))}
                          </div>
                          <button
                            onClick={reenviar}
                            type="button"
                            className=" text-[#3881AF] w-fit text-[18px]  cursor-pointer"
                          >
                            Reenviar Código
                          </button>
                        </div>
                      </div>

                      <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Voltar
                          </motion.button>
                        </div>

                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="submit"
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Enviar código
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.form>
                  )}

                  {step === 3 && (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onSubmit={handleSubmit3}
                      className="flex flex-col gap-8 w-full max-w-[500px] justify-center items-center "
                    >
                      <div className="w-full flex flex-col gap-4 ">
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Digite sua senha"
                            onChange={(e) => {
                              setCompleteForm({
                                ...completeForm,
                                novaSenha: e.target.value,
                              });
                            }}
                            className="p-3 text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]"
                          />

                          <motion.button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </motion.button>
                        </div>
                        <div className="relative">
                          <input
                            type={showPassword2 ? "text" : "password"}
                            required
                            placeholder="Confirme sua senha"
                            onChange={(e) => {
                              setCompleteForm({
                                ...completeForm,
                                confirmarSenha: e.target.value,
                              });
                            }}
                            className="p-3 text-[20px] h-[58px] w-full rounded-[25px] outline-[rgba(151,103,248,0.6)] border-2 border-[rgba(10,8,9,0.6)]"
                          />

                          <motion.button
                            type="button"
                            onClick={() => setShowPassword2((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword2 ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </motion.button>
                        </div>

                        {/* <div className={`h-[96px] overflow-hidden w-fit transition-all duration-300 ease-in-out min-w-10 min-h-2 `}>
                                                modelo
                                                <h2 className={`text-[20px] h-[32px] text-[#068D3A] flex items-center gap-2`}><Check /> A senha deve conter no mínimo 8 caracteres</h2>
                                                <h2 className={`text-[20px] h-[32px] text-[#F92A46] flex items-center gap-2`}><X />A senha deve conter pelo menos um número</h2>
                                                <h2 className={`text-[20px] h-[32px] text-[#F92A46] flex items-center gap-2`}><X />A senha deve conter pelo menos um símbolo</h2>
                                            </div> */}
                      </div>

                      <motion.div className=" flex justify-center items-center gap-[7%] relative w-[550px] max-w-[90%] mx-auto ">
                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Voltar
                          </motion.button>
                        </div>

                        <div className="flex flex-col w-[200px] gap-10 max-w-[95%] ">
                          <motion.button
                            whileTap={{ scale: 0.99 }}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            type="submit"
                            className="bg-[#804EE5] py-[8px] text-white text-[18px] rounded-[25px] shadow-md"
                          >
                            Confirmar senha
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.form>
                  )}
                </div>

                {/* <div className="max-w-[90%] bg-red-500  h-full justify-center flex flex-col items-center gap-10 ">
                            </div> */}

                {/* <div className="max-w-[90%] bg-blue-500 flex flex-col mt-10 items-center gap-4 max-h-[90%] ">
                            </div> */}
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
