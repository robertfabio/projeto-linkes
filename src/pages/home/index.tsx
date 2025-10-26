import { useEffect, useState } from 'react'
import { Social } from '../../assets/social'
import Background from './background'
import Switch from '../../components/switch'
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Alert } from '../../components/alert'
import { db } from '../../services/firebaseConnect'
import { Link } from "react-router-dom";
import { 
   getDocs,
   collection,
   orderBy,
   query,
   doc,
   getDoc
} from 'firebase/firestore'


interface LinkesProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinkesProps {
    Linkedin: string;
    Instagram: string;
    Github: string;
}

export default function Home() {
    const [links, setLinks] = useState<LinkesProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinkesProps>()
    const [bgRotate, setBgRotate] = useState(false)

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkesProps[];
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
        }
        loadLinks();
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "linkes");
            getDoc(docRef)
            .then((snapshot) => {
                const data = snapshot.data();
                if (data !== undefined && data !== null) {
                    setSocialLinks({
                        Linkedin: data.linkedin,
                        Instagram: data.instagram,
                        Github: data.github,
                    })
                }
            })
        }
        loadSocialLinks();
    }, [])

    return (
        <div className="relative min-h-screen flex flex-col w-full py-4 items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <Background
                    spinRotation={-1.5}
                    spinSpeed={5.0}
                    color1="#505759"
                    color2="#111111"
                    color3="#111111"
                    contrast={1.0}
                    lighting={0.5}
                    spinAmount={0.3}
                    isRotate={bgRotate}
                    mouseInteraction={false}
                />
            </div>
                    <Link to="/admin" className="mt-20">
                        <h1
                            className="heading-font text-center select-none text-4xl md:text-7xl lg:text-7xl font-extrabold leading-tight transition-transform duration-200 hover:scale-85"
                            aria-label="Fábio Roberto"
                        >
                            <span className="text-white title-glow">
                                Fábio Roberto
                            </span>
                        </h1>
                    </Link>
                        <div className="flex items-center gap-4 mt-5">
                            <span className="text-white text-lg font-medium opacity-90">Confira os meus links! ↓</span>

                        </div>

            <main className="flex flex-col w-10/12 max-w-md text-center mt-10 gap-4">
                {links.map((link) => (
                    <section
                        key={link.id}
                        className="backdrop-blur-sm rounded-xl p-0 transition-transform duration-200 transform hover:scale-105 hover:shadow-2xl shadow-md cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                        style={{ backgroundColor: link.bg, color: link.color }}
                    >
                        <a
                            className="flex items-center justify-center w-full h-full py-6 md:py-8 px-4 gap-2 flex-col"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                        >
                            <p className="text-base md:text-lg font-black truncate">
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.Linkedin}>
                        <FaLinkedinIn size={32} color='#FFFFFF' className='hover:scale-110 transition-transform duration-200' />
                    </Social>
                    <Social url={socialLinks?.Instagram}>
                        <FaInstagram size={32} color='#FFFFFF' className='hover:scale-110 transition-transform duration-200' />
                    </Social>
                    <Social url={socialLinks?.Github}>
                        <FaGithub size={32} color='#FFFFFF' className='hover:scale-110 transition-transform duration-200' />
                    </Social>
                </footer>
                )}
                    <div className="flex items-center justify-center gap-3 mt-2">
                        <button className="text-sm text-violet-700 hover:underline" aria-label="Alerta" title="Alerta">
                            <Alert 
                              message="Siga o insta do CA! @cacc.ufersa" 
                              href='https://www.instagram.com/cacc.ufersa/'
                              target='_blank'
                              autoClose={false} 
                              duration={5000}
                            />
                        </button>

                        <div className="flex justify-center items-center">
                                <Switch checked={bgRotate} onChange={setBgRotate} label={bgRotate ? 'Rotação: ON' : 'Rotação: OFF'} title="Ativa/Desativa rotação do background" />
                        </div>
                    </div>
                    
            </main>
        </div>
    )
}