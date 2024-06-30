import iconChat from '../../assets/icon-chat.png'
import iconMoney from '../../assets/icon-money.png'
import iconSecurity from '../../assets/icon-security.png'

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  )
}

const Hero = () => {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  )
}

const Features = () => {
  const features: Feature[] = [
    {
      icon: iconChat,
      title: 'You are our #1 priority',
      text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: iconMoney,
      title: 'More savings means higher rates',
      text: 'The more you save with us, the higher your interest rate will be!',
    },
    {
      icon: iconSecurity,
      title: 'Security you can trust',
      text: 'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ]

  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </section>
  )
}

const FeatureItem = ({ icon, title, text }: FeatureItemProps) => {
  return (
    <div className="feature-item">
      <img src={icon} alt="" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}

interface Feature {
  icon: string
  title: string
  text: string
}

interface FeatureItemProps extends Feature {}

export default Home
