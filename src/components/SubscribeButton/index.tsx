import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    // if the user is not logged in, he will be redirected to GitHub
    if (!session) {
      signIn('github');
      return;
    }
    
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;
        
      
    } catch {

    }
  }

  return (
    <button 
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}