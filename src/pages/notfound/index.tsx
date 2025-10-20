import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css'; // 1. Importa os estilos

function NotFound() {
  // 2. Hook para navegação programática (para o botão "Voltar")
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); // Navega para a entrada anterior no histórico
  };

  return (
    <div className={styles.container}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>

      <h1 className={styles.title}>Oops! 404</h1>
      <p className={styles.text}>
        A página que você está procurando não foi encontrada. Verifique o URL ou
        tente navegar de novo.
      </p>

      <div className={styles.buttonGroup}>
        <button
          onClick={handleVoltar}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Voltar
        </button>
        <Link to="/" className={styles.button}>
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default NotFound;