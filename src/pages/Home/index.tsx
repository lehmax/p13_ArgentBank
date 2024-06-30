import { Hero } from '../../components/Hero'

import iconChat from '../../assets/icon-chat.png'
import iconMoney from '../../assets/icon-money.png'
import iconSecurity from '../../assets/icon-security.png'

interface Feature {
  icon: string
  title: string
  text: string
}

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

const FeatureItem = ({ icon, title, text }: Feature) => {
  return (
    <div className="feature-item">
      <img src={icon} alt="" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}

const Home = () => {
  return (
    <main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </section>
    </main>
  )
}

export default Home
