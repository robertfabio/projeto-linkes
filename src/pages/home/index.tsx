import { useEffect, useState } from 'react'
import { Social } from '../../assets/social'
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
        <div className="flex flex-col w-full py-4 items-center justify-center">
           <Link to="/admin">
            <h1 className="md:text-4xl text-3xl font-extralight text-shadow-white mt-20">
            Fábio Roberto</h1>
            </Link>
            <span className="text-shadow-black text-lg mt-4">Confira os meus links! ↓</span>

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
                            <p className="text-base md:text-lg font-semibold truncate">
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLinks?.Linkedin}>
                        <FaLinkedinIn size={32} color='#0077b5' />
                    </Social>
                    <Social url={socialLinks?.Instagram}>
                        <FaInstagram size={32} color='#0077b5' />
                    </Social>
                    <Social url={socialLinks?.Github}>
                        <FaGithub size={32} color='#0077b5' />
                    </Social>
                </footer>
                )}
                    <button className="mt-2 text-sm text-violet-700 hover:underline">
                        <Alert 
                        message="Siga o insta do CA! @cacc.ufersa" 
                        href='https://www.instagram.com/cacc.ufersa/'
                        target='_blank'
                        autoClose={false} 
                        duration={5000}
                        />
                    </button>
            </main>
        </div>
    )
}