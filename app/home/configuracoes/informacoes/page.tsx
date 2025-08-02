"use client";

// import { set } from 'date-fns';
import { motion } from 'framer-motion';
// import { UserSquareIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ComboboxDemoSettings, ComboboxDemoSettings2 } from '../../components/dropdown';

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
  const [ escola, setEscola ] = useState("");
  const [usuario, setUsuario] = useState<UsuarioData>({});
  const [ loading, setLoading ] = useState(true);
  
  let escolaridade = "";
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
            setLoading(false);
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
        escolaridade = ((data.usuario.escolaridade).toLowerCase()).replace(/^\w/, (c: string) => c.toUpperCase());
        setEscola(escolaridade);
        setUsuario(data.usuario);
        setLoading(false);
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
        setLoading(false);
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

  if (loading) return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full" />
    </div>
  );
  
  return (
    <>
      <form className="  flex flex-col gap-4 overflow-hidden ">
        <div className="flex flex-col justify-between lg:w-[50%]  max-w-[550px]">
          <h1 className="text-[20px] font-medium">Primeiro nome</h1>
          <input
            type="text"
            defaultValue={usuario.primeiroNome}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, primeiroNome: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[20px] h-[58px] outline-[#9767F8]"
          ></input>
        </div>
        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px]">
          <h1 className="text-[20px] font-medium">Sobrenome</h1>
          <input
            type="text"
            defaultValue={usuario.sobrenome }
            // onChange={(e) => setConfiguracoes({ ...configuracoes, sobrenome: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[20px] h-[58px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px] ">
          <h1 className="text-[20px] font-medium">Data de Nascimento</h1>
          <input
            type="text"
            defaultValue={(usuario?.dataNascimento?.split('T')[0])?.replaceAll( "-", "/" ) ?? ""}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, dataNascimento: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[20px] h-[58px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px] ">
          <h1 className="text-[20px] font-medium">Instituição</h1>
          <input
            type="text"
            defaultValue={instituicao}
            // onChange={(e) => setConfiguracoes({ ...configuracoes, instituicaoId: e.target.value })}
            className=" rounded-[20px] border-[2px] border-[#0d0f224e] pl-2 w-full max-w-[400px] text-[20px] h-[58px] outline-[#9767F8]"
          ></input>
        </div>

        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px] ">
          <h1 className="text-[20px] font-medium">
            Cargo ou Posição 
          </h1>
          <ComboboxDemoSettings value={user?.cargo ?? ""} onChange={() => {}} />
        </div>

        <div className="flex flex-col justify-between lg:w-[50%] max-w-[550px] ">
          <h1 className="text-[20px] font-medium">
            Nível de escolaridade {escola}
          </h1>
          <ComboboxDemoSettings2 value={escola ?? ""} onChange={() => {}} />
        </div>

        <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type='submit'
        id="editar_conta"
        // onClick={editarConfiguracoes}
        className="mt-2 mb-1 ml-1 w-[200px] h-[58px] rounded-[30px] text-[18px] font-medium border border-[#1E2351]"
        >
          Salvar
        </motion.button>
      </form>
    </>
  );
}
