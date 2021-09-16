import { useSession, signIn } from 'next-auth/client'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

//lugares que podemos usar as variaveis de ambiente secretas/que precisamos de segurança, dentro do next
    //1 - getServerSideProps (SSR)
    //2 - getStatic Props (SSG)
    //3 - API routes

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()

  async function handleSubscribe() {
    //se não estiver logado -> redireciona para signIn com github
    if (!session) {
      signIn('github')
      return
    }

    // se estiver logado -> criação da checkout session
    try {
      const response = await api.post('/subscribe')

      const {sessionId} = response.data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({sessionId})
    } catch(err) {
      alert(err.message)
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
