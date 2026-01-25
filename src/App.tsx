
import Beams from './Beams';
import { motion } from 'motion/react';
import Shuffle from './Shuffle';
import MagicBento from './MagicBento';
import LogoLoop from './LogoLoop';
import { SiReact, SiTypescript, SiTailwindcss, SiPython, SiLangchain, SiAmazonwebservices, SiRedis, SiSupabase, SiDocker, SiMysql, SiUbuntu, SiGithub, SiLinkedin, SiX, SiInstagram } from 'react-icons/si';
import ClickSpark from './ClickSpark'; // re-trigger
import ShinyText from './ShinyText';
import { TimelineDemo } from './TimelineDemo';
import { DitherShader } from "@/components/ui/dither-shader";
import asdImg from './assets/asd.png';
import Threads from './Threads';
import { ContactForm } from './components/ContactForm'; // Explicit import to resolve resolution issue
import GlassSurface from './components/GlassSurface';

import ScrollIndicator from './ScrollIndicator';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiAmazonwebservices />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <SiRedis />, title: "Redis", href: "https://redis.io" },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiLangchain />, title: "LangChain", href: "https://langchain.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
  { node: <SiMysql />, title: "MySQL", href: "https://mysql.com" },
  { node: <SiUbuntu />, title: "Ubuntu", href: "https://ubuntu.com" }
];

function App() {

  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="relative w-full min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <Beams
              beamWidth={2}
              beamHeight={30}
              beamNumber={20}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>

          {/* Content Layer */}
          <div className="px-4 md:px-28 absolute inset-0 z-10 flex flex-col md:flex-row items-center justify-center md:justify-between pointer-events-none gap-6 md:gap-0 h-svh overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="pointer-events-auto flex flex-col items-center md:items-start gap-6 text-center md:text-left pt-12 md:pt-0 w-full max-w-full"
            >
              {/* Mobile: Stacked Text */}
              <div className="flex flex-col items-center gap-2 md:hidden">
                <Shuffle
                  text="TERRY"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover
                  respectReducedMotion={true}
                  loop={false}
                  loopDelay={0}
                  className="text-4xl text-white whitespace-nowrap"
                  style={{ fontFamily: '"Press Start 2P", cursive', fontWeight: 400, letterSpacing: 'normal' }}
                />
                <Shuffle
                  text="ONG"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover
                  respectReducedMotion={true}
                  loop={false}
                  loopDelay={0}
                  className="text-4xl text-white whitespace-nowrap"
                  style={{ fontFamily: '"Press Start 2P", cursive', fontWeight: 400, letterSpacing: 'normal' }}
                />
              </div>

              {/* Desktop: Single Line */}
              {/* Desktop: Single Line - Wrapped in div to ensure hiding works if Shuffle overrides display */}
              <div className="hidden md:block">
                <Shuffle
                  text="Terry Ong"
                  shuffleDirection="right"
                  duration={0.35}
                  animationMode="evenodd"
                  shuffleTimes={1}
                  ease="power3.out"
                  stagger={0.03}
                  threshold={0.1}
                  triggerOnce={true}
                  triggerOnHover
                  respectReducedMotion={true}
                  loop={false}
                  loopDelay={0}
                  className="text-6xl text-white whitespace-nowrap"
                  style={{ fontFamily: '"Press Start 2P", cursive', fontWeight: 400, letterSpacing: 'normal' }}
                />
              </div>

              <ShinyText
                text="Full Stack AI Application Developer"
                speed={2}
                delay={0}
                color="#b5b5b5"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={false}
                className="text-xs md:text-xl font-medium tracking-wide ml-2 whitespace-normal max-w-[90%] leading-relaxed"
              />

              <div className="ml-2">
                <a href="/resume.pdf" download="Terry_Ong_Resume.pdf" className="inline-block group">
                  <GlassSurface
                    width={180}
                    height={50}
                    borderRadius={25}
                    borderWidth={0.5}
                    brightness={50}
                    opacity={0.8}
                    mixBlendMode="overlay"
                    className="transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  >
                    <span className="text-white font-medium text-sm tracking-wide">Download Resume</span>
                  </GlassSurface>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              className="flex flex-col items-center pointer-events-auto"
            >
              <div className="relative overflow-hidden rounded-b-full">
                <DitherShader
                  src={asdImg}
                  gridSize={2}
                  ditherMode="bayer"
                  colorMode="grayscale"
                  invert={false}
                  animated={false}
                  animationSpeed={0.02}
                  primaryColor="#000000"
                  secondaryColor="#f5f5f5"
                  threshold={0.5}
                  className="h-56 w-[280px] sm:h-96 sm:w-[400px]"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none hidden md:block"
          >
            <ScrollIndicator />
          </motion.div>
        </div>

        {/* Bento Grid Section */}
        <div className="pt-24 font-medium text-center text-3xl" style={{ fontFamily: '"Press Start 2P", cursive' }}>About Me</div>
        <div className="relative w-full pt-12 pb-20 bg-black flex justify-center items-center z-20">
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="255, 255, 255"
            disableAnimations={false}
          />
        </div>

        <div className="pb-20">
          <LogoLoop
            logos={techLogos}
            speed={100}
            direction="left"
            logoHeight={60}
            gap={60}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000ff"
            ariaLabel="Technology partners"
          />
        </div>

        {/* Timeline Section */}
        <div className="relative w-full bg-black">
          <TimelineDemo />
        </div>

        {/* Threads Section */}
        <div style={{ width: '100%', height: '650px', position: 'relative' }} className="flex flex-col md:flex-row items-center justify-center md:justify-around px-4 md:px-20 overflow-hidden md:h-[650px] h-auto py-12 md:py-0 gap-8 md:gap-0">
          <div className="absolute inset-0 z-0">
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction
            />
          </div>

          <div className="z-10 flex flex-col items-center md:items-start gap-4 md:gap-6 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter" style={{ fontFamily: '"Press Start 2P", cursive' }}>
              Let's Connect
            </h2>
            <div className="flex gap-4 md:gap-6">
              <a href="https://github.com/terryong31" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <SiGithub className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a href="https://linkedin.com/in/ongkokdonq" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#0077b5] transition-colors">
                <SiLinkedin className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a href="https://instagram.com/terryong30" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#E1306C] transition-colors">
                <SiInstagram className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            </div>
          </div>

          <div className="z-10 w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </div>
    </ClickSpark>
  )
}

export default App
