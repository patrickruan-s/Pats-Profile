import useFadeIn from '../hooks/useFadeIn'

function FadeSection({ children, delay = 0 }) {
  const { ref, visible } = useFadeIn()
  return (
    <section
      ref={ref}
      className={`fade-in${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  )
}

export default function AboutSection() {
  return (
    <article className="prose max-w-none space-y-8 text-gray-700">
      <FadeSection delay={0}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Introduction</h2>
        <p className="leading-relaxed">
          Hi, I&apos;m Patrick! Welcome to my personal profile. I&apos;m a creative and curious individual
          passionate about technology, art, and music. Feel free to explore my work using the tabs above.
        </p>
      </FadeSection>

      <FadeSection delay={100}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Experience</h2>
        <p className="leading-relaxed">
          I graduated from the University of Illinois at Urbana-Champaign in 2020 with a degree in Statistics and a minor in Computer Science—ultimately setting the foundation for my career in software engineering. Since then, I've worked as a Full Stack Developer at PowerSchool and as a Backend Engineer at PayPal, gaining experience across the tech stack in both education and fintech domains.
At PowerSchool, I was a key contributor to Faculty Suite, a Ruby on Rails-based web application built for higher education. I helped develop and deliver large-scale features end-to-end, including third-party integrations and infrastructure improvements. I also participated in sprint planning within an Agile framework, wrote clean, maintainable code, and maintained a strong unit testing suite using RSpec.
At PayPal, I was part of the Pay with Venmo team within the Braintree organization. Our team handled all web transactions involving Venmo as a payment method. My work involved building merchant-facing features, troubleshooting complex transaction issues, and ensuring smooth end-to-end integrations with large merchants. I also conducted research on merchant behavior and transaction patterns, presenting insights to cross-functional teams to guide product decisions and improve overall platform performance.
I'm especially proficient in Ruby on Rails and JavaScript, with hands-on experience using tools and technologies like React, RSpec, Redis, and PostgreSQL. I've worked extensively within microservices architectures, building scalable backend services and integrating APIs in distributed systems. I also have experience deploying and maintaining services using AWS infrastructure. I take pride not only in writing robust, scalable code, but also in my communication skills and ability to collaborate effectively with teammates, stakeholders, and clients alike.
        </p>
      </FadeSection>

      <FadeSection delay={200}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Hobbies</h2>
        <p className="leading-relaxed">
          In my free time I enjoy creating digital art, composing and producing music, coding personal
          projects, and exploring new ideas. I love learning new skills and applying them in creative ways.
        </p>
      </FadeSection>

      <FadeSection delay={300}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Passions</h2>
        <p className="leading-relaxed">
          I&apos;m passionate about self-expression through art and music, open-source software, and
          building communities around shared creative interests. I believe technology should empower
          people to create and connect.
        </p>
      </FadeSection>
    </article>
  )
}
