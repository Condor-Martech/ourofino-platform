import { motion } from 'framer-motion';

export default function ProductShowcase() {
  return (
    <section id="products" className="w-full bg-slate-50 dark:bg-slate-900 py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                Hidratação <span className="text-blue-500">Essencial</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Nossa água mineral natural é captada diretamente da fonte em Bateias, Campo Largo. 
                Disponível em versões com e sem gás, e na linha exclusiva Gourmet, garantindo pureza e equilíbrio para o seu dia a dia.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['pH Equilibrado', 'Baixo Teor de Sódio', 'Linha Gourmet e Premium'].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-center gap-3 text-lg font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                  >
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>

              <button className="bg-foreground text-background px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity">
                Ver Todos os Produtos
              </button>
            </motion.div>
          </div>

          {/* Product Image */}
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center relative">
            {/* Background Blob */}
            <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-200/50 dark:bg-blue-900/30 rounded-full blur-3xl z-0" />
            
            <motion.div
              className="relative z-10"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1602143407151-011141959309?q=80&w=2788&auto=format&fit=crop" // Bottle placeholder
                alt="Garrafa Ouro Fino Premium" 
                className="max-h-[500px] w-auto drop-shadow-2xl rounded-xl object-cover"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
