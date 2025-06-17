"use client";

// import { set } from 'date-fns';
import { motion } from 'framer-motion';
// import { UserSquareIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type UserData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  // add other properties if needed
};

type UsuarioData = {
  primeiroNome?: string;
  cargo?: string;
  foto?: string;
  areaDeInteresse?: string;
  atualizadoEm?: string;
  codigoExpiracao?: string;
  codigoVerificado?: string;
  criadoEm?: string;
  dataNascimento?: string;
  email?: string;
  emailVerificado?: boolean;
  escolaridade?: string;
  funca?: string; 
  id?: string;
  instituicaoId?: string;
  nomeCompleto?: string;
  objetivoNaPlataforma?: string;
  senha?: string;
  sobrenome?: string;
  ultimoLogin?: string;
};

export default function Informações() {
  const [ user, setUser ] = useState<UserData>({});
  const [usuario, setUsuario] = useState<UsuarioData>({});

  
  const [ instituicao, setInstituicao ] = useState<string>("");

  useEffect(() => {
    const user = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/identificacao`, {
            method: 'GET',
            credentials: 'include',
            });
            
            const data = await res.json();
            setUser(data)
        } catch (err) {
            // setMessage("Erro ao carregar saudação.");
            console.error(err);
        }
    }; user();

    const e = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        setUsuario(data.usuario);
      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; e();

    const instituicao = async () => {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/instituicao/nome`, {
          method: 'GET',
          credentials: 'include',
        });
        
        const data = await res.json();
        console.log(data.nome);
        setInstituicao(data.nome);
        // setInstituicao(data.instituicao.nome);

      } catch (err) {
        // setMessage("Erro ao carregar saudação.");
        console.error(err);
      }
    }; instituicao();      
  }, []);
  
  // const [ configuracoes, setConfiguracoes ] = useState({ primeiroNome: usuario.primeiroNome, sobrenome: usuario.sobrenome, dataNascimento: usuario.dataNascimento?.split('T')[0], instituicaoId: usuario.instituicaoId, nomeCompleto: usuario.nomeCompleto, escolaridade: usuario.escolaridade, funcao: user.cargo });

  // const editarConfiguracoes = async (e) => {
  //   e.preventDefault();
  //   console.log(configuracoes);
  //   try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/configuracoes`, {
  //         method: "PATCH",
  //         credentials: "include",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(configuracoes),
  //       });
  
  //       const result = await res.json();
  //       console.log(result.message); // Matéria excluída com sucesso.
        
  //     } catch (error) {
  //       console.error("Erro ao editar a senha:");
  //     }
  // };

  return (
    <>
      <form className="mt-4 ml-10 flex flex-col gap-3 overflow-hidden">
        <div className="flex flex-col justify-between  w-[1000px]">
          <h1 className="text-[30px] font-medium">Primeiro nome</h1>
          <input
            type="text"
            defaultValue={usuario.primeiroNome}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, primeiroNome: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>
        <div className="flex flex-col justify-between  w-[1000px]">
          <h1 className="text-[30px] font-medium">Sobrenome</h1>
          <input
            type="text"
            defaultValue={usuario.sobrenome }
            // onChange={(e) => setConfiguracoes({ ...configuracoes, sobrenome: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">Data de Nascimento</h1>
          <input
            type="text"
            defaultValue={usuario?.dataNascimento?.split('T')[0] ?? ""}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, dataNascimento: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">Instituição</h1>
          <input
            type="text"
            defaultValue={instituicao}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, instituicaoId: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">
            Cargo ou Posição
          </h1>
          <input
            type="text"
            defaultValue={ user?.cargo ?? ""}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, funcao: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between w-[1000px] ">
          <h1 className="text-[30px] font-medium">
            Nível de escolaridade
          </h1>
          <input
            type="text"
            defaultValue={ usuario?.escolaridade ?? ""}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, funcao: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-[60%] text-[25px] h-[60px] outline-[#9767F8]"
          ></input>
        </div>

        <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type='submit'
        id="editar_conta"
        // onClick={editarConfiguracoes}
        className="mt-3 ml-1 w-[200px] h-[60px] rounded-[30px] text-[25px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button>
      </form>
    </>
  );
}
