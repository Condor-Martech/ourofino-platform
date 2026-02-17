import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: "Estância Hidromineral",
    description: "Muito mais que um parque, um santuário de preservação. Trilhas ecológicas, cascatas e mirantes em meio a uma área de 6 milhões de m² de Mata Atlântica preservada.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop", // Forest placeholder -> Estância
    align: "left"
  },
  {
    title: "Piscinas de Água Mineral",
    description: "Refresque-se em piscinas abastecidas constantemente com água mineral natural corrente. Uma experiência única de lazer e contato direto com a natureza para toda a família.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2940&auto=format&fit=crop", // Pool placeholder -> Piscinas
    align: "right"
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className={`flex flex-col gap-8 md:gap-16 py-16 md:py-24 ${feature.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
    >
      <motion.div 
        className="w-full md:w-1/2 aspect-video overflow-hidden rounded-2xl shadow-xl"
        initial={{ opacity: 0, x: feature.align === 'left' ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img 
          src={feature.image} 
          alt={feature.title} 
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>

      <motion.div 
        className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{feature.title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        <div className={`mt-4 flex ${feature.align === 'right' ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
          <a href="/events" className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2">
            Saiba mais 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 bg-background">
      <div className="space-y-12">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
