"use client"

import { useState, useEffect, useRef } from "react"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  FileText,
  Award,
  Code,
  Users,
  ChevronRight,
  ExternalLink,
  Newspaper,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [activeSection, setActiveSection] = useState("about")
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  // Gradient animation for buttons
  const gradientTransition = {
    backgroundSize: isHovered ? "200% 200%" : "100% 100%",
    transition: { duration: 0.5 },
  }

  // Add this after the existing animations
  const gradientAnimation = {
    backgroundSize: "200% 200%",
    backgroundPosition: "left center",
    transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = ["about", "education", "projects", "awards", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">Jaagat Prashar</div>
          <nav className="hidden md:flex gap-8">
            {["about", "education", "projects", "awards", "contact"].map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium transition-colors relative ${activeSection === section ? "text-primary" : "hover:text-primary"}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeSection"
                  />
                )}
              </Link>
            ))}
          </nav>
          <Button
            size="sm"
            className="gap-2 bg-gradient-to-r from-startup-blue to-startup-purple hover:shadow-lg transition-all duration-300"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1pstMw1sHoLcL5daZWLSvCGBDDEeUlJ0p/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="h-4 w-4" /> Resume
            </a>
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-16">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ opacity, scale }}
        >
          <motion.div className="flex-1 space-y-6" variants={fadeIn}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Hi, I'm{" "}
              <span className="animate-gradient-text bg-clip-text text-transparent bg-gradient-to-r from-startup-blue via-startup-purple to-startup-cyan">
                Jaagat Prashar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Stanford CS & Math Student passionate about AI/ML, Robotics, and Software Engineering
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Stanford, California</span>
            </div>
            <div className="flex gap-4 pt-2">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform hover:border-startup-blue hover:text-startup-blue"
              >
                <Link href="https://github.com/Jaagat-P" target="_blank">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform hover:border-startup-purple hover:text-startup-purple"
              >
                <Link href="https://www.linkedin.com/in/jaagp/" target="_blank">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full hover:scale-110 transition-transform hover:border-startup-cyan hover:text-startup-cyan"
              >
                <Link href="mailto:jaagat@stanford.edu">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full hover:scale-110 transition-transform text-xs gap-1.5 hover:border-startup-orange hover:text-startup-orange"
              >
                <Link
                  href="https://www.forbes.com/sites/meimeifox/2023/11/25/these-teenaged-twins-bring-the-arts-to-stem-to-make-it-more-fun/"
                  target="_blank"
                >
                  <Newspaper className="h-3.5 w-3.5" />
                  Featured on Forbes
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-gradient-to-r from-startup-blue to-startup-purple shadow-lg">
              <Image
                src="/images/profile.png"
                alt="Jaagat Prashar"
                width={320}
                height={320}
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-startup-blue/10 to-startup-purple/10 animate-pulse"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-12 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">About Me</h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg">
                Hi! My name is Jaagat Prashar and I am a student at Stanford studying Computer Science and Mathematics.
                Currently, I am conducting research on enhancing decisions in healthcare through LLMs at Dr. Fei Fei's
                Lab (SVL at SAIL).
              </p>
              <p className="text-lg">
                Previously, I conducted self-published (ACM SIGKDD) deep learning for drug discovery research (3rd at
                Regeneron ISEF).
              </p>
              <p className="text-lg">
                In my free time, I enjoy co-hosting the STARTS (STEM+Arts) podcast (77K+ views, 45 episodes) with my
                twin brother, reading about philosophy, going to the gym, and writing poetry.
              </p>
            </div>
            <div className="space-y-8">
              <motion.div
                className="bg-gradient-to-r from-startup-blue/5 to-startup-purple/5 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python (PyTorch)", "C++", "Java", "R", "Julia", "ReactJS", "Git", "LaTeX", "Linux", "SQL"].map(
                    (skill) => (
                      <Badge key={skill} className="hover:bg-startup-blue hover:text-white transition-colors">
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-startup-purple/5 to-startup-cyan/5 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Machine Learning",
                    "Computer Vision",
                    "Natural Language Processing",
                    "Healthcare AI",
                    "Drug Discovery",
                  ].map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="hover:bg-startup-purple hover:text-white transition-colors"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          className="py-12 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">Education</h2>
            <Separator className="flex-1" />
          </div>
          <div className="space-y-8">
            <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="h-20 bg-gradient-to-r from-startup-blue/20 to-startup-purple/10 relative">
                  <div className="absolute -bottom-12 left-8">
                    <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center text-xl font-bold p-2 border-2 border-cardinal shadow-md">
                      <Image
                        src="/images/stanford-logo.png"
                        alt="Stanford University"
                        width={80}
                        height={80}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 pt-16">
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Stanford University</h3>
                      <p className="text-lg text-muted-foreground">Computer Science and Mathematics</p>
                      <p className="text-muted-foreground mt-1">
                        Clubs: Stanford ASES (Bootcamp Fellow), Math Directed Reading Program, Stanford Association for
                        Computing Machinery
                      </p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-lg">2024 - 2028</p>
                    </div>
                  </div>
                  <div>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-semibold text-lg mb-3 p-2 rounded-md hover:bg-muted transition-colors">
                        <h4>Relevant Coursework</h4>
                        <ChevronRight className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-90" />
                      </summary>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 mt-4 pl-1 animate-in slide-in-from-top-5 duration-300">
                        <p>• CS106B: Programming Abstractions</p>
                        <p>• Math 51: Linear Algebra and Differential Calculus</p>
                        <p>• CS109: Probability for Computer Scientists</p>
                        <p>• CS103: Mathematical Foundations of Computing</p>
                        <p>• MATH 53: Ordinary Differential Equations</p>
                        <p>• CS 153: Infrastructure at Scale</p>
                        <p>• Physics 41: Mechanics</p>
                        <p>• ENGR 40M: An Intro to Making</p>
                        <p>• AA120Q: Building Trust in Autonomy</p>
                      </div>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="py-12 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">Projects</h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Monco Project */}
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden flex flex-col h-full border-none shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/monco.png"
                    alt="Monco - Drug Discovery Pipeline"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <h3 className="text-xl font-bold mb-4 px-6 text-white">Monco - Drug Discovery Pipeline</h3>
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    A novel deep learning pipeline to generate drug candidates to target the EZH2 gene in pediatric
                    neuroblastoma. Presented at BROAD Institute of MIT and Harvard.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-startup-blue/10 hover:bg-startup-blue hover:text-white">
                      Deep Learning
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-startup-purple/10 hover:bg-startup-purple hover:text-white"
                    >
                      Drug Discovery
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-cyan/10 hover:bg-startup-cyan hover:text-white">
                      Oncology
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-pink/10 hover:bg-startup-pink hover:text-white">
                      Healthcare
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group hover:border-startup-blue hover:text-startup-blue"
                    >
                      <Link href="https://kdd-dssg.github.io/KDD_DSSG_Proceedings_C.pdf" target="_blank">
                        Paper
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Zeus Project */}
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden flex flex-col h-full border-none shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/zeus.jpeg"
                    alt="Zeus - Ultra-Low Latency LLM Agent"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <h3 className="text-xl font-bold mb-4 px-6 text-white">Zeus - Ultra-Low Latency LLM Agent</h3>
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    Developed Zeus, an ultra-low latency LLM computer agent using accessibility APIs to enable
                    intelligent task planning and execution through optimized response times.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-startup-blue/10 hover:bg-startup-blue hover:text-white">
                      LLM
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-startup-purple/10 hover:bg-startup-purple hover:text-white"
                    >
                      Accessibility APIs
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-cyan/10 hover:bg-startup-cyan hover:text-white">
                      Task Planning
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-pink/10 hover:bg-startup-pink hover:text-white">
                      Low Latency
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group hover:border-startup-blue hover:text-startup-blue"
                    >
                      <Link href="https://github.com/ethandgoodhart/zeus-agent" target="_blank">
                        GitHub
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group hover:border-startup-purple hover:text-startup-purple"
                    >
                      <Link href="https://www.youtube.com/watch?v=JRPIb7In9C8" target="_blank">
                        Demo
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Bayesian Risk Assessment Tool */}
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden flex flex-col h-full border-none shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/bayesian-risk.png"
                    alt="Bayesian Risk Assessment Tool"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <h3 className="text-xl font-bold mb-4 px-6 text-white">Bayesian Risk Assessment Tool</h3>
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    Developed a probabilistic, Bayesian risk assessment tool for assessing sentiment in Twitter posts
                    with an emphasis on classifying dangerous tweets.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-startup-blue/10 hover:bg-startup-blue hover:text-white">
                      Python
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-startup-purple/10 hover:bg-startup-purple hover:text-white"
                    >
                      Bayesian Statistics
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-cyan/10 hover:bg-startup-cyan hover:text-white">
                      NLP
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-pink/10 hover:bg-startup-pink hover:text-white">
                      Sentiment Analysis
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group hover:border-startup-blue hover:text-startup-blue"
                    >
                      <Link href="https://github.com/Jaagat-P/CS109-Challenge" target="_blank">
                        GitHub
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fairness in Computer Vision & Robotics */}
            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="overflow-hidden flex flex-col h-full border-none shadow-lg rounded-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 relative overflow-hidden rounded-t-lg">
                  <Image
                    src="/images/projects/fairness.png"
                    alt="Fairness in Computer Vision & Robotics"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <h3 className="text-xl font-bold mb-4 px-6 text-white">Fairness in Computer Vision & Robotics</h3>
                  </div>
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 flex-1">
                    Authored literature review/report on fairness, explainability, and transparency in computer vision,
                    robotics, and aviation under Professor Mykel Kochenderfer.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-startup-blue/10 hover:bg-startup-blue hover:text-white">
                      Computer Vision
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-startup-purple/10 hover:bg-startup-purple hover:text-white"
                    >
                      Robotics
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-cyan/10 hover:bg-startup-cyan hover:text-white">
                      Fairness
                    </Badge>
                    <Badge variant="secondary" className="bg-startup-pink/10 hover:bg-startup-pink hover:text-white">
                      Explainability
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="group hover:border-startup-blue hover:text-startup-blue"
                    >
                      <Link
                        href="https://drive.google.com/file/d/1tTlNGETglYdFa6qEcF23dBxT10rHO-dH/view?usp=sharing"
                        target="_blank"
                      >
                        Paper
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Awards Section */}
        <motion.section
          id="awards"
          className="py-12 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">Awards & Publications</h2>
            <Separator className="flex-1" />
          </div>

          <Tabs defaultValue="research" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 bg-gradient-to-r from-startup-blue/10 to-startup-purple/10">
              <TabsTrigger
                value="research"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-startup-blue/20 data-[state=active]:to-startup-purple/20"
              >
                Research Awards
              </TabsTrigger>
              <TabsTrigger
                value="technical"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-startup-blue/20 data-[state=active]:to-startup-cyan/20"
              >
                Technical
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-startup-purple/20 data-[state=active]:to-startup-pink/20"
              >
                Recognition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="research" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Oral Presentation of Monco at BROAD Institute of MIT-Harvard Machine Learning in Drug Discovery Symposium",
                      "Oral Presentation of Monco at Data Science for Social Good Workshop at 29th ACM SIGKDD Conference",
                      "Research Paper Monco published in proceedings of Data Science for Social Good Workshop at 29th ACM SIGKDD Conference",
                      "Research Poster on mental health and drama therapy accepted to 44th North American Drama Therapy Conference",
                      "3rd Place Grand Award at Regeneron ISEF in Computational Biology and Bioinformatics (CBB)",
                      "1st Place at Texas Science and Engineering Fair in CBB",
                      "1 of 2 Best of State Honorable Mention in Life Sciences division at Texas Science and Engineering Fair",
                      "1st Place at Science and Engineering Fair of Houston in Medicine and Health",
                      "Named as International 2022-2023 Conrad Innovator in Health and Nutrition category",
                      "Selected as 1 of 50 World Science Scholars (International)",
                    ].map((award, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-r from-startup-blue/5 to-startup-purple/5 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow"
                        whileHover={{ y: -3, backgroundColor: "rgba(121, 40, 202, 0.05)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Award className="h-5 w-5 text-startup-purple mt-1 shrink-0" />
                        <p>{award}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Selected to participate in Stanford's Math Directed Reading Program (10 weeks)",
                      "Technology Students Association, 2nd Place in Data Science and Analytics (National and State)",
                      "Technology Students Association, 1st Place in Data Science and Analytics (Regional)",
                      "Technology Students Association, 3rd Place in Cybersecurity (Regional)",
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-r from-startup-cyan/5 to-startup-blue/5 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow"
                        whileHover={{ y: -3, backgroundColor: "rgba(0, 112, 243, 0.05)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Code className="h-5 w-5 text-startup-blue mt-1 shrink-0" />
                        <p>{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="animate-in fade-in-50 duration-300">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Stanford Writing Boothe Prize Nominee for excellence in legal writing",
                      "Featured on Forbes for STARTS (STEM + Arts) podcast initiative",
                      "Featured on ABC13 Houston for competing at Science and Engineering Fair of Houston",
                      "Featured on BBC News and Katy Times for advocacy work",
                      "UNICEF Houston Mayor's Office of Education - recognition from Houston Mayor for mental health advocacy",
                      "TX Thespians, 2nd Place in DemocracyWorks competition",
                    ].map((recognition, index) => (
                      <motion.div
                        key={index}
                        className="bg-gradient-to-r from-startup-pink/5 to-startup-orange/5 p-4 rounded-lg flex items-start gap-3 hover:shadow-md transition-shadow"
                        whileHover={{ y: -3, backgroundColor: "rgba(255, 0, 128, 0.05)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Users className="h-5 w-5 text-startup-pink mt-1 shrink-0" />
                        <p>{recognition}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-12 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">Contact Me</h2>
            <Separator className="flex-1" />
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg">
                I'm always open to discussing new projects, research opportunities, or collaborations. Feel free to
                reach out to me through any of the following channels:
              </p>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-startup-blue/10 hover:to-transparent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-gradient-to-r from-startup-blue to-startup-purple p-3 rounded-full">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <a href="mailto:jaagat@stanford.edu" className="hover:text-startup-blue transition-colors">
                    jaagat@stanford.edu
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-startup-purple/10 hover:to-transparent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-gradient-to-r from-startup-purple to-startup-cyan p-3 rounded-full">
                    <Linkedin className="h-5 w-5 text-white" />
                  </div>
                  <a
                    href="https://www.linkedin.com/in/jaagp/"
                    target="_blank"
                    className="hover:text-startup-purple transition-colors"
                    rel="noreferrer"
                  >
                    linkedin.com/in/jaagp/
                  </a>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-startup-cyan/10 hover:to-transparent transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-gradient-to-r from-startup-cyan to-startup-pink p-3 rounded-full">
                    <Github className="h-5 w-5 text-white" />
                  </div>
                  <a
                    href="https://github.com/Jaagat-P"
                    target="_blank"
                    className="hover:text-startup-cyan transition-colors"
                    rel="noreferrer"
                  >
                    github.com/Jaagat-P
                  </a>
                </motion.div>
              </div>
            </div>
            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-startup-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-startup-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-startup-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-startup-pink focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-startup-blue to-startup-purple hover:shadow-lg transition-all duration-300"
                  >
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gradient-to-r from-startup-blue/5 to-startup-purple/5">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Jaagat Prashar. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform hover:text-startup-blue"
            >
              <Link href="https://github.com/Jaagat-P" target="_blank">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform hover:text-startup-purple"
            >
              <Link href="https://www.linkedin.com/in/jaagp/" target="_blank">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="hover:scale-110 transition-transform hover:text-startup-cyan"
            >
              <Link href="mailto:jaagat@stanford.edu">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

