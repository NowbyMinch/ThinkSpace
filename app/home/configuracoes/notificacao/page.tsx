export default function Notificação() {
  return (
    <>
      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Comentários</h1>
            <h2 className="text-[25px]">
              Notificações para comentários em suas postagens e respostas para
              seus comentários.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Comentários</h2>
            </div>

            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Respostas</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Lembretes</h1>
            <h2 className="text-[25px]">
              Notificações para lembrar de atividades e estudos da semana.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Atividades</h2>
            </div>

            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Estudos</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">Postagens</h1>
            <h2 className="text-[25px]">
              Notificações para novas postagens em salas de estudos seguidas e
              postagens destaque.
            </h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Postagens</h2>
            </div>

            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Destaques</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-10 mt-4 w-[95%] border-b border-[rgba(0,0,0,0.33)] pb-4">
        <div className="relative flex items-center w-[820px] gap-2">
          <div className="min-w-[602px] max-w-[602px]">
            <h1 className="font-medium text-[35px]">
              Mais atividades sobre você
            </h1>
            <h2 className="text-[25px]">Notificações de novos seguidores.</h2>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <label
                id="switch"
                className=" w-[70px] h-[34px] rounded-full cursor-pointer relative flex items-center"
              >
                <input
                  id="opcao"
                  type="checkbox"
                  className="absolute appearance-none"
                />
                <div
                  id="slider"
                  className="bg-white ml-[5px] z-10 mr-[5px] w-[25px] h-[25px] rounded-full"
                ></div>
                <div
                  id="switch_color"
                  className="bg-[#D9D9D9] w-full h-full rounded-full absolute "
                ></div>
              </label>
              <h2 className="text-[26px] font-medium">Seguidores</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
