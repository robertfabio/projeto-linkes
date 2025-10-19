import { Social } from '../../assets/social'
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { Alert } from '../../assets/social/components/alert'
import { LinkesLogo } from '../../assets/LinkesLogo'

export default function Home() {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-extralight text-shadow-white mt-20">Fábio Roberto</h1>
            <span className="text-shadow-black text-lg mt-4">Confira os meus links! ↓</span>

            <main className="flex flex-col w-10/12 max-w-md text-center mt-10 gap-4">
                <section className="bg-black/5 backdrop-blur-sm rounded-lg p-3 hover:scale-101 hover:bg-white/20 transition-all hover:outline-2 hover:outline-violet-100 cursor-pointer">
                    <a>
                        <p className="text-base md:text-lg">
                            Link 1
                        </p>
                    </a>
                </section>

                <footer className="flex justify-center gap-3 my-4">
                    <Social url="https://linkedin.com/in/fábioroberto">
                        <FaLinkedinIn size={24} color='#0077b5' />
                    </Social>
                    <Social url="https://linkedin.com/in/fábioroberto">
                        <FaYoutube size={24} color='#0077b5' />
                    </Social>
                    <Social url="https://linkedin.com/in/fábioroberto">
                        <FaGithub size={24} color='#0077b5' />
                    </Social>
                </footer>
                    <button className="mt-2 text-sm text-violet-700 hover:underline">
                        <Alert 
                        message="Siga o insta do CA! @cacc.ufersa" 
                        href='https://www.instagram.com/cacc.ufersa/'
                        target='_blank'
                        autoClose={false} 
                        duration={5000}
                        />
                    </button>
                    
            <LinkesLogo className="w-12 h-12" />
            </main>

        </div>
    )
}