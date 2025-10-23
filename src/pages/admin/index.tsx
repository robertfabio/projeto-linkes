import { Header } from "../../components/header/header";
import { useState, type FormEvent } from "react";
import { FiTrash } from 'react-icons/fi'

export default function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#F1FAFE");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#A9DEF9");

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        alert("teste")
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

           <form className="flex flex-col gap-2 mt-10 w-full max-w-md" onSubmit={handleRegister}>
                <label className="text-black font-light mt-2 outline-black/50 rounded-lg p-1">
                Nome
                </label>
                <input
                    placeholder="Digite o nome do link"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 rounded-lg p-3 transition-shadow duration-150"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-black font-light mt-2 outline-black/50 rounded-lg p-1">
                URL
                </label>
                <input
                    placeholder="Digite a url"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 rounded-lg p-3 transition-shadow duration-150"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-black font-mono mt-2 mb-2 outline-gray-500/50 rounded-lg p-3">
                            Cor de fundo
                       </label>
                       <input 
                       type="color" 
                       className="w-12 h-12 p-0 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-100"
                       value={backgroundColorInput}
                       onChange={ (e) => setBackgroundColorInput(e.target.value) } />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-black font-mono mt-2 mb-2 outline-black/50 rounded-lg p-3">
                            Cor do texto
                       </label>
                       <input 
                       type="color" 
                       className="w-12 h-12 p-0 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-200"
                       value={textColorInput}
                       onChange={ (e) => setTextColorInput(e.target.value) } />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div>
                    <label className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        Pré-visualização
                    </label>
                    <div 
                        className="w-full h-20 rounded-lg flex items-center justify-center mt-2 bg-white border border-gray-200 shadow-sm font-light"
                        style={{ backgroundColor: backgroundColorInput, color: textColorInput }}
                    >
                        {nameInput || "Nome do link"}
                    </div>
                </div>    
                )}

                <button
                    type="submit"
                    className="w-full bg-slate-900 text-white py-3.5 rounded-lg hover:bg-slate-800 transition-all font-semibold hover:shadow-xl active:scale-[0.99] mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Cadastrar Link
                </button>

            </form>

            <h2 className="mt-10 text-xl font-light text-gray-700">
                Meus Links
            </h2>       

            <article 
            className="flex items-center justify-between w-full max-w-md rounded-lg p-4 mt-4"
            style={{ backgroundColor: backgroundColorInput, color: textColorInput }}
            >
                <p>Canal do youtube</p>
                <button className="ml-4 text-red-600 hover:text-red-800 transition-colors">
                    <FiTrash size={18} />
                </button>
            </article>
        </div>
    )
}