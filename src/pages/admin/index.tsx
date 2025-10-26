import { Header } from "../../components/header/header";
import { useState, type FormEvent, useEffect } from "react";
import { FiTrash } from 'react-icons/fi'
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnect";
import BetterColorPicker from "../../components/colorPicker";

interface Link {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export default function Admin() {
    const [nameInput, setNameInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textColorInput, setTextColorInput] = useState("#F1FAFE");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#000000");
    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista: Link[] = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                })
            })
            setLinks(lista);
        })
        return () => unsub();

    }, []);


    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os campos!");
            return;
        }

        const raw = urlInput.trim();
        const finalUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

        try {
            new URL(finalUrl);
        } catch {
            alert("URL inválida. Digite algo como example.com ou https://example.com");
            return;
        }


        addDoc(collection(db, "links"), {
            name: nameInput,
            url: finalUrl,
            color: textColorInput,
            bg: backgroundColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("");
            setUrlInput("");
            alert("Link cadastrado com sucesso!");
        })
        .catch((error) => {
            alert("Erro ao cadastrar o link: " + error);
        });
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef)
        .then(() => {
            alert("Link deletado com sucesso!");
        })
        .catch((error) => {
            alert("Erro ao deletar o link: " + error);
        });
    }


    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

           <form className="flex flex-col gap-2 mt-10 w-full max-w-md" onSubmit={handleRegister}>
                <label className="text-black font-bold mt-2 outline-black/50 rounded-lg p-1">
                Nome
                </label>
                <input
                    placeholder="Digite o nome do link"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 rounded-lg p-3 transition-shadow duration-150"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-black font-bold mt-2 outline-black/50 rounded-lg p-1">
                URL
                </label>
                <input
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 rounded-lg p-3 transition-shadow duration-150"
                    value={urlInput}
                    placeholder="Digite a URL do link"
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="justify-evenly items-center inline-flex w-full mt-2 mb-2">
                    <div className="flex gap-2">
                        <label className="text-black font-medium outline-gray-500/50 rounded-lg p-2">
                            Cor de fundo
                       </label>
                          <BetterColorPicker
                            initialColor={backgroundColorInput}
                            onChange={ (color) => setBackgroundColorInput(color) }
                          />
                    </div>

                    <div className="flex gap-2 ">
                        <label className="text-black font-medium outline-black/50 rounded-lg p-2">
                            Cor do texto
                       </label>
                       <BetterColorPicker
                        initialColor={textColorInput}
                        onChange={ (color) => setTextColorInput(color) }
                       />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div>
                    <label className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        Pré-visualização
                    </label>
                    <div 
                        className="w-full h-20 rounded-lg flex items-center justify-center mt-2 bg-white border border-gray-200 shadow-sm font-black"
                        style={{ backgroundColor: backgroundColorInput, color: textColorInput }}
                    >
                        {nameInput || "Nome do link"}
                    </div>
                </div>    
                )}

                <button
                    type="submit"
                    className="w-full bg-slate-900 text-white py-3.5 rounded-lg hover:bg-slate-800 transition-all font-semibold hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Cadastrar Link
                </button>

            </form>

            <h2 className="mt-10 text-xl font-extrabold text-gray-700">
                Meus Links
            </h2>       

            {links.map( (link) => (
            <article 
            key={link.id}
            className="flex items-center justify-between w-full max-w-md rounded-lg p-4 mt-4"
            style={{ backgroundColor: link.bg, color: link.color }}
            >
                <p>{link.name}</p>
                <button 
                onClick={ () => {handleDeleteLink(link.id)} }
                className="ml-4 border rounded-full px-2 py-2 text-red-500 hover:text-red-800 transition-colors">
                    <FiTrash size={18} />
                </button>
            </article>
            ))}
        </div>
    )
}