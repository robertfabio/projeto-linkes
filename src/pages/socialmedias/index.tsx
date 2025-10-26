import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header/header";
import { db } from "../../services/firebaseConnect";
import {
    setDoc,
    doc,
    getDoc,
} from "firebase/firestore";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

export default function SocialMedias() {
    const [linkedinInput, setLinkedinInput] = useState("");
    const [instagramInput, setInstagramInput] = useState("");
    const [githubInput, setGithubInput] = useState("");

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "linkes");
            getDoc(docRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as { instagram: string; linkedin: string; github: string };
                    setInstagramInput(data.instagram);
                    setLinkedinInput(data.linkedin);
                    setGithubInput(data.github);
                }
            });
        }
        loadLinks();
    }, []);

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        
        setDoc(doc(db, "social", "linkes"), {
            instagram: instagramInput,
            linkedin: linkedinInput,
            github: githubInput
        })
        .then(() => {
            alert("Redes sociais salvas com sucesso!");
            setInstagramInput("");
            setLinkedinInput("");
            setGithubInput("");
        })
        .catch((error) => {
            alert("Erro ao salvar redes sociais: " + error);
        });
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-shadow-black font-black mt-12 mb-4">Social Medias</h1>

            <form className="flex flex-col w-full max-w-md">

                <label className="text-black font-thin text-medium text-2xl mt-2 outline-black/50 rounded-lg p-1">
                <LinkedinIcon className="inline-flex mb-1"/> Linkedin
                </label>
        
                <input
                    type="url"
                    value={linkedinInput}
                    placeholder="Digite a url da rede social"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 rounded-lg p-3 transition-shadow duration-150"
                    onChange={(e) => setLinkedinInput(e.target.value)}
                />
                <label className="text-black font-thin text-2xl mt-2 outline-black/50 rounded-lg p-1">
                <InstagramIcon className="inline-flex mb-1" /> Instagram
                </label>
                <input
                    type="url"
                    value={instagramInput}
                    placeholder="Digite a url da rede social"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 rounded-lg p-3 transition-shadow duration-150"
                    onChange={(e) => setInstagramInput(e.target.value)}
                />
                <label className="text-black font-thin text-2xl mt-2  outline-black/50 rounded-lg p-1">
                <GithubIcon className="inline-flex mb-1" /> Github 
                </label>
                <input
                    type="url"
                    value={githubInput}
                    placeholder="Digite a url da rede social"
                    className="bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-100 rounded-lg p-3 transition-shadow duration-150"
                    onChange={(e) => setGithubInput(e.target.value)}
                />

                <button
                    type="submit"
                    onClick={handleRegister}
                    className="bg-gray-800 hover:bg-slate-700 text-white font-extrabold mt-4 px-6 py-3 rounded-lg shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                    Salvar
                </button>
            </form>
        </div>
    )
}