import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Target,
  Award,
  Users,
  MapPin,
  Calendar,
  Trophy,
  Medal,
  Brain,
  Shield,
  Activity,
  Heart,
  Compass,
  GraduationCap,
  Quote,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Star,
  Crosshair,
  Flame,
  Sparkles,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";
import heroImg from "@/assets/hero-archer.jpg";
import coachImg from "@/assets/coach.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import { Navbar } from "@/components/site/Navbar";
import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { useState, useEffect } from "react";
import { EnrollmentModal } from "@/components/site/EnrollmentModal";
import { API_URL } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bow & Arrow Archery Academy | Premier Archery Coaching in Chennai" },
      {
        name: "description",
        content:
          "Chennai's leading professional archery academy since 2013. 100+ students trained, 7 centres, certified coaching for beginners to competition athletes.",
      },
      { property: "og:title", content: "Bow & Arrow Archery Academy — Chennai" },
      { property: "og:description", content: "Master the art of archery with certified coaches across 7 Chennai centres." },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
});

const heroStats = [
  { label: "Students Trained", value: 100, suffix: "+" },
  { label: "Training Centres", value: 10, suffix: "+" },
  { label: "School Partnerships", value: 10, suffix: "+" },
  { label: "Training Batches", value: 200, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
];

const features = [
  { icon: Award, title: "Certified Coaching", desc: "Nationally accredited coaches with proven track records." },
  { icon: GraduationCap, title: "Structured Curriculum", desc: "Three-tier program from beginner to advanced mastery." },
  { icon: Trophy, title: "Tournament Preparation", desc: "Competition-grade training and mock tournament drills." },
  { icon: Activity, title: "Athlete Development", desc: "Personalised plans for posture, strength and precision." },
  { icon: Brain, title: "Mental Conditioning", desc: "Focus, breathing and visualisation techniques." },
  { icon: Shield, title: "Safety-Focused Training", desc: "Strict protocols, premium equipment and supervision." },
];

const centres = [
  { name: "Ambattur", desc: "Youth development & school training.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.673891463138!2d80.1557731!3d13.1116238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5262590209dfa9%3A0xad526a4220b33b93!2sAmbattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Ambattur+Chennai" },
  { name: "Porur", desc: "Beginner to intermediate training batches.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8524673327663!2d80.1472853!3d13.0450201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526131f496350f%3A0xc07a82be1e2f75d3!2sPorur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Porur+Chennai" },
  { name: "Poonamallee", desc: "Family and weekend coaching programs.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7432074351314!2d80.0906233!3d13.0519159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260f854bcfb79%3A0x67db20b665fa7cf!2sPoonamallee%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Poonamallee+Chennai" },
  { name: "Patabiram", desc: "Standard target practice & archery range.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.031548239049!2d80.0573934!3d13.1207869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528a2b53f6630f%3A0x29efefc207b068a8!2sPattabiram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Pattabiram+Chennai" },
  { name: "Korattur", desc: "Advanced coaching & competitive track.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.8079093859664!2d80.1804245!3d13.1030999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264057e05e5df%3A0x1d46be69a84f3c09!2sKorattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Korattur+Chennai" },
  { name: "Vel tech college", desc: "Campus-based competition training.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.095400267676!2d80.1064875!3d13.1884485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52865910d5403b%3A0x8673f4e8b3941785!2sVel%20Tech%20Rangarajan%20Dr.Sagunthala%20R%26D%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Vel+Tech+University+Chennai" },
  { name: "Sevvapet", desc: "Outdoor field archery training centre.", map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.4447470659613!2d79.9490124!3d13.1668822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5280b06b9b3297%3A0xbbfd118bb9d57a2e!2sSevvapet%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url: "https://www.google.com/maps/search/?api=1&query=Sevvapet+Chennai" },
];

const whyArchery = [
  { icon: Target, title: "Improves Concentration" },
  { icon: Shield, title: "Builds Discipline" },
  { icon: Crosshair, title: "Hand-Eye Coordination" },
  { icon: Brain, title: "Mental Toughness" },
  { icon: Heart, title: "Low Injury Risk" },
  { icon: Users, title: "All-Age Friendly" },
  { icon: Trophy, title: "Competitive Pathways" },
  { icon: Activity, title: "Mind & Body Balance" },
];

const levels = [
  {
    tag: "Level 01",
    title: "Beginner",
    hours: "36 Hours",
    color: "from-amber-400/30 to-amber-600/10",
    modules: [
      "Archery Basics",
      "Stance & Posture",
      "Shooting Techniques",
      "Safety Protocols",
      "Target Practice",
      "Warm-up Routine",
      "Understanding Bow & Arrow Parts"
    ],
  },
  {
    tag: "Level 02",
    title: "Intermediate",
    hours: "60 Hours",
    color: "from-orange-400/30 to-orange-600/10",
    modules: [
      "Advanced Shooting",
      "Equipment Tuning",
      "Competitive Scoring",
      "Mental Focus Training",
      "Flexibility & Strength",
      "Wind & Weather Adjustments",
      "Posture Correction Drills"
    ],
  },
  {
    tag: "Level 03",
    title: "Advanced",
    hours: "90 Hours",
    color: "from-red-400/30 to-red-700/10",
    modules: [
      "Tournament Preparation",
      "Precision Training",
      "Mental Toughness",
      "Competition Strategies",
      "Performance Analysis",
      "Olympic Recurve & Compound Styles",
      "Video Analysis & Body Mechanics"
    ],
  },
];

const programs = [
  {
    icon: Heart,
    title: "Family Archery",
    desc: "Bonding sessions for parents & children.",
    details: "Our Family Archery program offers a unique opportunity for parents and children to learn together. The sessions focus on building trust, patience, and concentration. All equipment is provided, and our certified coaches ensure a safe, fun, and supportive environment for all age levels to bond over archery."
  },
  {
    icon: Compass,
    title: "Field Archery",
    desc: "Outdoor courses through varied terrain.",
    details: "Field Archery simulates hunting or outdoor scenarios by setting targets at various distances and elevations along a scenic nature trail. Learn how to estimate distances, adjust for wind, and maintain balance on uneven ground. Perfect for archers looking for adventure."
  },
  {
    icon: Trophy,
    title: "Competition Training",
    desc: "Elite-track athlete development.",
    details: "Designed for competitive archers aiming for district, state, or national tournaments. This program features intensive physical conditioning, posture refinement drills, advanced equipment tuning, and psychological simulation to prepare students for high-pressure competitive environments."
  },
  {
    icon: Sparkles,
    title: "Workshops & Seminars",
    desc: "Skill clinics with guest experts.",
    details: "Special seminars led by national coaches and international archery experts. These clinics cover deep-dive technical aspects including recurve and compound bow mechanics, advanced visualization techniques, breath control, and tournament strategy guides."
  },
  {
    icon: Flame,
    title: "Intensive Camps",
    desc: "Multi-day immersion programmes.",
    details: "High-intensity multi-day training camps hosted during school breaks and weekends. Immerse yourself in archery practice with daily target routines, video analysis sessions, biomechanics correction, and fun mock tournaments to keep skills sharp and focused."
  },
];

const achievements = [
  { icon: "Users", value: 100, suffix: "+", label: "Students" },
  { icon: "Calendar", value: 200, suffix: "+", label: "Training Batches" },
  { icon: "Award", value: 10, suffix: "+", label: "Years of Excellence" },
  { icon: "MapPin", value: 7, suffix: "+", label: "Training Centres" },
  { icon: "GraduationCap", value: 8, suffix: "+", label: "School Collaborations" },
  { icon: "Medal", value: 50, suffix: "+", label: "District Champions" },
  { icon: "Trophy", value: 20, suffix: "+", label: "State-Level Winners" },
];

const galleryItems = [
  { src: g1, cat: "Training Sessions", span: "row-span-2" },
  { src: g2, cat: "Achievements", span: "" },
  { src: g3, cat: "Our Team", span: "" },
  { src: g4, cat: "Precision", span: "row-span-2" },
  { src: g5, cat: "Certifications", span: "" },
  { src: g6, cat: "National Games", span: "" },
];

const testimonials = [
  {
    name: "Priya Ramesh",
    role: "Parent, Porur",
    quote: "The discipline and confidence my son gained through this academy is incredible.",
    img: g4,
  },
  {
    name: "Karthik V.",
    role: "District Competitor",
    quote: "I started as a beginner and now confidently compete in district tournaments.",
    img: g3,
  },
  {
    name: "Anitha S.",
    role: "School Coordinator",
    quote: "Professional coaching and excellent sports culture for students.",
    img: g1,
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Award,
  MapPin,
  GraduationCap,
  Medal,
  Trophy,
  Target,
  Shield,
  Crosshair,
  Brain,
  Heart,
  Activity,
  Compass,
  Sparkles,
  Flame,
};

const imageMap: Record<string, string> = {
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
};

const defaultBatches = [
  {
    name: "1 TO 2 STANDARD BATCH",
    age_group: "Age 6–8 Years",
    objectives: "Develop interest in archery\nImprove hand-eye coordination\nLearn basic movement and posture\nIntroduce safe handling of training equipment\nBuild confidence through fun-based activities",
    weekly_plan: "Session 1:\n- Warm-up activities and stretching\n- Balance and coordination exercises\n- Introduction to archery equipment\n- Safety instructions and discipline practices\n\nSession 2:\n- Basic stance and posture training\n- Bow holding techniques\n- Aiming basics using short-distance targets\n- Guided shooting practice\n\nSession 3:\n- Fun target activities\n- Team participation exercises\n- Simple shooting games and coordination drills",
    assessment: "Proper posture and balance\nUnderstanding of safety rules\nParticipation and discipline\nCoordination improvement\nConfidence during shooting activities"
  },
  {
    name: "3 TO 4 STANDARD BATCH",
    age_group: "Age 8–10 Years",
    objectives: "Learn archery fundamentals\nImprove aiming and release techniques\nBuild shooting confidence\nIntroduce target scoring basics",
    weekly_plan: "Session 1:\n- Dynamic warm-up exercises\n- Stance correction and body alignment\n- Target aiming practice\n- Short-distance shooting drills\n\nSession 2:\n- Controlled release techniques\n- Shooting consistency drills\n- Coordination and flexibility exercises\n- Safety reinforcement practices\n\nSession 3:\n- Target scoring activities\n- Pair and team practice sessions\n- Fun competitive shooting games",
    assessment: "Shooting posture improvement\nBasic target accuracy\nConsistency in shooting technique\nDiscipline and focus\nUnderstanding of scoring basics"
  },
  {
    name: "5 TO 6 STANDARD BATCH",
    age_group: "Age 10–12 Years",
    objectives: "Develop intermediate archery skills\nImprove shooting consistency and focus\nBuild physical fitness and endurance\nIntroduce performance awareness",
    weekly_plan: "Session 1:\n- Warm-up and flexibility training\n- Advanced aiming techniques\n- Distance shooting practice\n- Breathing and focus exercises\n\nSession 2:\n- Shooting correction drills\n- Balance and posture improvement\n- Strength and coordination exercises\n- Scoring practice sessions\n\nSession 3:\n- Practice competition rounds\n- Team strategy activities\n- Performance observation and correction",
    assessment: "Shooting accuracy and consistency\nTechnical skill improvement\nMental focus and discipline\nPhysical coordination\nMatch awareness and scoring performance"
  },
  {
    name: "7 TO 8 STANDARD BATCH",
    age_group: "Age 12–14 Years",
    objectives: "Develop advanced archery techniques\nPrepare students for competitions\nImprove mental toughness and discipline\nEnhance leadership and teamwork qualities",
    weekly_plan: "Session 1:\n- Strength and conditioning exercises\n- Precision shooting drills\n- Long-distance target practice\n- Advanced posture correction\n\nSession 2:\n- Pressure shooting scenarios\n- Target grouping practice\n- Performance analysis sessions\n- Reaction and focus drills\n\nSession 3:\n- Practice tournament rounds\n- Tactical shooting activities\n- Leadership and teamwork sessions\n- Performance review and feedback",
    assessment: "Precision and target grouping\nShooting consistency under pressure\nLeadership and teamwork\nMental focus and confidence\nCompetitive readiness"
  }
];

const defaultAssessments = [
  { category: "Attendance", val_1_2: "✔", val_3_4: "✔", val_5_6: "✔", val_7_8: "✔" },
  { category: "Discipline", val_1_2: "✔", val_3_4: "✔", val_5_6: "✔", val_7_8: "✔" },
  { category: "Fitness", val_1_2: "Basic", val_3_4: "Moderate", val_5_6: "Good", val_7_8: "Advanced" },
  { category: "Shooting Technique", val_1_2: "Intro", val_3_4: "Basic", val_5_6: "Intermediate", val_7_8: "Advanced" },
  { category: "Accuracy", val_1_2: "Intro", val_3_4: "Basic", val_5_6: "Good", val_7_8: "Advanced" },
  { category: "Coordination", val_1_2: "Basic", val_3_4: "Moderate", val_5_6: "Good", val_7_8: "Advanced" },
  { category: "Match Awareness", val_1_2: "Low", val_3_4: "Basic", val_5_6: "Good", val_7_8: "Strong" }
];

function Index() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState<Record<string, boolean>>({});
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<any | null>(null);
  const [activeCenterIdx, setActiveCenterIdx] = useState<number>(0);

  useEffect(() => {
    console.log("isEnrollOpen state is now:", isEnrollOpen);
  }, [isEnrollOpen]);

  const [siteData, setSiteData] = useState({
    content: {
      site_title: "Bow & Arrow Archery Academy | Premier Archery Coaching in Chennai",
      meta_description: "Chennai's leading professional archery academy since 2013. 100+ students trained, 7 centres, certified coaching for beginners to competition athletes.",
      hero_title_1: "Master the",
      hero_title_2: "Art of Archery",
      hero_description_line_1: "Professional archery coaching for students, schools and competitive athletes across Chennai.",
      hero_description_line_2: "Bow & Arrow Archery Academy has trained 100+ students since 2011 through structured coaching, certified training systems and competition-focused athlete development.",
      contact_phone: "8668054120 / 9840754120",
      contact_email: "coach2017@yahoo.com",
      contact_address: "NO 45 BALAJI NAGAR KOLLUMEDU ROAD VELLANUR CHENNAI 62",
    },
    centers: centres,
    achievements: achievements,
    testimonials: testimonials,
    gallery: galleryItems,
    batches: defaultBatches,
    assessments: defaultAssessments,
    features: features,
    why_archery: whyArchery,
    programs: programs,
  });

  useEffect(() => {
    fetch(`${API_URL}/api/site-data/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content && data.centers && data.achievements && data.testimonials && data.gallery && data.batches && data.assessments && data.features && data.why_archery && data.programs) {
          setSiteData(data);
        }
      })
      .catch((err) => console.log("Failed to fetch site data, using static fallback", err));
  }, []);

  const heroStatsMapped = [
    { label: "Students Trained", value: siteData.achievements.find(a => a.icon === 'Users')?.value || 100, suffix: "+" },
    { label: "Training Centres", value: siteData.achievements.find(a => a.icon === 'MapPin')?.value || 7, suffix: "+" },
    { label: "School Partnerships", value: siteData.achievements.find(a => a.icon === 'GraduationCap')?.value || 10, suffix: "+" },
    { label: "Training Batches", value: siteData.achievements.find(a => a.icon === 'Calendar')?.value || 200, suffix: "+" },
    { label: "Years Experience", value: siteData.achievements.find(a => a.icon === 'Award')?.value || 15, suffix: "+" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar onEnrollClick={() => setIsEnrollOpen(true)} />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <img
          src={heroImg}
          alt="Professional archer drawing a bow"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />



        {/* Dynamic 3D Animated Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-40">
          <motion.div
            style={{ perspective: 800, transformStyle: "preserve-3d" }}
            animate={{
              rotateY: [-15, 15, -15],
              rotateX: [8, -8, 8],
              rotateZ: [-2, 2, -2],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-center font-display uppercase tracking-[0.15em] select-none leading-none"
          >
            <div
              className="text-6xl md:text-[7vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary/10 to-amber-500/5 drop-shadow-[0_10px_20px_rgba(184,147,71,0.05)]"
              style={{ transform: "translateZ(50px)" }}
            >
              Bow & Arrow
            </div>
            <div
              className="text-4xl md:text-[4vw] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/[0.05] via-primary/5 to-white/[0.02] mt-4"
              style={{ transform: "translateZ(20px)" }}
            >
              Archery Academy
            </div>
          </motion.div>
        </div>

        {/* Flying arrow removed or made 3D - since user requested 3D arrow in ultra slow motion, we focus entirely on the main 3D target arrow simulation */}


        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-10 items-center w-full">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-xs tracking-[0.25em] uppercase text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" /> Established 2011 · Chennai
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] uppercase"
            >
              {siteData.content.hero_title_1 || "Master the"}
              <br />
              <span className="text-gradient-gold">{siteData.content.hero_title_2 || "Art of Archery"}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              {siteData.content.hero_description_line_1}
              <span className="block mt-3 text-base">
                {siteData.content.hero_description_line_2}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => setIsEnrollOpen(true)}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ember text-accent-foreground font-semibold hover:glow-ember transition-all cursor-pointer"
              >
                Join Training Program <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsEnrollOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-gold text-primary font-semibold hover:glow-gold transition-all cursor-pointer"
              >
                Book Free Trial
              </button>
              <a href="#curriculum" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-foreground border border-border hover:border-primary transition-colors">
                Explore Curriculum
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-3xl"
            >
              {heroStatsMapped.map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 text-center hover-lift">
                  <div className="font-display text-2xl lg:text-3xl text-primary">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] mt-1 tracking-wider uppercase text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>


          {/* Animated 3D Target and Firing Arrow Simulation */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative min-h-[550px]">
            {/* Dynamic Visible 3D Text Header */}
            <motion.div
              style={{ perspective: 600, transformStyle: "preserve-3d" }}
              animate={{
                rotateY: [-10, 10, -10],
                rotateX: [6, -6, 6],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-center mb-6 font-display uppercase tracking-widest pointer-events-none select-none z-10"
            >
              <h2 className="text-3xl font-extrabold text-gradient-gold drop-shadow-[0_5px_15px_rgba(184,147,71,0.2)]" style={{ transform: "translateZ(30px)" }}>
                Bow & Arrow
              </h2>
              <p className="text-sm font-semibold text-muted-foreground mt-1" style={{ transform: "translateZ(15px)" }}>
                Archery Academy
              </p>
            </motion.div>

            <div className="relative w-80 h-80 flex items-center justify-center" style={{ perspective: "1000px" }}>
              {/* Tilted 3D Archery Target Board */}
              <motion.div
                animate={{
                  rotateY: [-24, -20, -24],
                  rotateX: [12, 16, 12],
                  scale: [1, 1.06, 0.95, 1.03, 1] // Wobble on hit at 18.0s (75% mark of 24s duration)
                }}
                transition={{
                  rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                  scale: {
                    duration: 24,
                    repeat: Infinity,
                    repeatDelay: 0,
                    times: [0, 0.74, 0.77, 0.82, 1],
                    ease: "easeOut"
                  }
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-72 h-72 rounded-full border-8 border-yellow-900/60 shadow-[0_20px_50px_rgba(184,147,71,0.25)] relative flex items-center justify-center bg-zinc-900"
              >
                {/* Concentric rings */}
                <div className="absolute inset-2 rounded-full bg-white border border-zinc-200" />
                <div className="absolute inset-8 rounded-full bg-black border border-zinc-800" />
                <div className="absolute inset-14 rounded-full bg-blue-600 border border-blue-700" />
                <div className="absolute inset-20 rounded-full bg-red-600 border border-red-700" />
                <div className="absolute inset-26 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-inner flex items-center justify-center">
                  {/* Bullseye center indicator */}
                  <div className="w-5 h-5 rounded-full bg-yellow-600 animate-ping absolute opacity-30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-700" />
                </div>
              </motion.div>

              {/* Impact Wave Waveform */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{
                  scale: [0.1, 2.0],
                  opacity: [0, 0.9, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 18.0, // Synchronized with impact at 18.0s
                  repeat: Infinity,
                  repeatDelay: 22.5,
                  ease: "easeOut"
                }}
                className="absolute w-24 h-24 rounded-full border-2 border-yellow-400 pointer-events-none"
              />

              {/* Ultra Slow Motion 3D Arrow flying from left side of the screen */}
              <motion.div
                style={{ transformStyle: "preserve-3d", originZ: -200 }}
                initial={{
                  x: -1000,
                  y: 240,
                  z: 300,
                  scale: 1.8,
                  opacity: 0,
                  rotateX: 10,
                  rotateY: 42,
                  rotateZ: -20
                }}
                animate={{
                  // Ultra slow motion flight (takes 18.0 seconds to cover the distance, starting below the text and rising)
                  x: [-1000, -500, 0, 0, 0, 0],
                  y: [240, 160, 0, 0, 0, 0],
                  z: [300, 150, 0, 0, 0, 0],
                  scale: [1.8, 1.4, 1, 1, 1, 1],
                  opacity: [0, 1, 1, 1, 1, 0],
                  rotateX: [10, 5, 0, 0, 0, 0],
                  rotateY: [42, 21, 0, 0, 0, 0],
                  // Wobble on target landing
                  rotateZ: [-20, -10, 0, 14, -9, 6, -3, 1, 0]
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: "easeInOut",
                  times: [0, 0.45, 0.75, 0.78, 0.83, 0.88, 0.92, 0.95, 0.98, 1]
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-30"
              >
                {/* 3D Arrow Body with Spin roll */}
                <motion.div
                  className="relative flex items-center"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    // Spinning roll during flight, stops spinning on hit
                    rotateX: [0, 1800, 1800, 1800]
                  }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.75, 0.9, 1]
                  }}
                >
                  {/* Real 3-Vane Fletching in Brilliant Gold (Volumetric layout rotated at 120 degree offsets) */}
                  <div className="w-14 h-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 rounded-sm absolute -left-14 origin-right" style={{ transform: "rotateX(0deg) translateZ(1px) skewX(12deg)", clipPath: "polygon(0% 100%, 25% 0%, 100% 0%, 100% 100%)" }} />
                  <div className="w-14 h-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-sm absolute -left-14 origin-right" style={{ transform: "rotateX(120deg) translateZ(1px) skewX(12deg)", clipPath: "polygon(0% 100%, 25% 0%, 100% 0%, 100% 100%)" }} />
                  <div className="w-14 h-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 rounded-sm absolute -left-14 origin-right" style={{ transform: "rotateX(240deg) translateZ(1px) skewX(12deg)", clipPath: "polygon(0% 100%, 25% 0%, 100% 0%, 100% 100%)" }} />

                  {/* Volumetric 3D Cylinder Shaft in Polished Gold */}
                  <div className="relative w-28 h-2.5 mr-2" style={{ transformStyle: "preserve-3d" }}>
                    {[0, 60, 120, 180, 240, 300].map((deg) => (
                      <div
                        key={deg}
                        className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-500 border-t border-b border-yellow-700/20"
                        style={{
                          transform: `rotateX(${deg}deg) translateZ(3px)`,
                          height: "3px",
                          backfaceVisibility: "hidden",
                        }}
                      />
                    ))}
                  </div>

                  {/* 3D Broadhead Arrowhead in Reflective Metallic Gold (Cross shape) */}
                  <div className="relative w-7 h-7 -ml-2 shrink-0" style={{ transformStyle: "preserve-3d" }}>
                    {[0, 90].map((deg, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-600 border border-yellow-500"
                        style={{
                          transform: `rotateX(${deg}deg)`,
                          clipPath: "polygon(0% 50%, 75% 20%, 100% 50%, 75% 80%)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Overlaid stat cards with glassmorphism */}
            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-4 w-48 glass-gold rounded-xl p-3 shadow-elegant text-xs"
            >
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Gold Standard</div>
                  <div className="font-display text-sm text-foreground">99.9% Accuracy</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-4 w-44 glass rounded-xl p-3 shadow-elegant text-xs"
            >
              {/* <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Training Level</div>
                  <div className="font-display text-sm text-foreground">Olympic Standards</div>
                </div>
              </div> */}
            {/* </motion.div> */}
          </div>
        </div>

        {/* scroll indicator */}
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.a>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gold opacity-20 blur-3xl rounded-full" />
              <img src={heroImg} loading="lazy" width={1024} height={1024} alt="Coaching" className="relative rounded-3xl shadow-elegant" />
              <div className="absolute -bottom-6 -right-6 glass-gold rounded-2xl p-5 hidden md:block">
                <div className="font-display text-4xl text-primary"><Counter to={15} suffix="+" /></div>
                <div className="text-xs tracking-widest uppercase text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="text-xs tracking-[0.3em] text-primary uppercase">Who We Are</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
              About <span className="text-gradient-gold">B&amp;A Archery Academy</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg text-justify">
              Bow &amp; Arrow Archery Academy (B&amp;A) is Chennai's leading dedicated archery coaching institution, established in 2011.
              The academy develops discipline, confidence, concentration and competitive excellence through world-class training.
            </p>
            <p className="mt-3 text-muted-foreground">
              Operating across <span className="text-primary font-semibold">10+ active training centres</span> and multiple school
              partnerships throughout Chennai.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {siteData.features.map((f) => {
                const IconComponent = typeof f.icon === "string" ? (iconMap[f.icon] || Award) : f.icon;
                const keyId = (f as any).id || f.title;
                return (
                  <div key={keyId} className="glass rounded-xl p-4 hover-lift group">
                    <IconComponent className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                    <div className="mt-2 font-semibold text-foreground">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{f.desc}</div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CENTRES */}
      <section id="centres" className="relative py-24 lg:py-32 bg-charcoal/40">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Across Chennai</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Training <span className="text-gradient-ember">Centres</span>
              </h2>
              <p className="mt-4 text-muted-foreground">Nine premium locations training beginners through to elite competitors.</p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteData.centers.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div
                  onClick={() => {
                    const mapsUrl = c.google_maps_url || c.map_url;
                    if (mapsUrl) {
                      window.open(mapsUrl, "_blank", "noopener,noreferrer");
                    }
                  }}
                  className="group relative rounded-2xl glass p-6 hover-lift overflow-hidden cursor-pointer border transition-all duration-300 border-border/30 hover:border-primary/50"
                >
                  <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-ember opacity-0 group-hover:opacity-30 blur-3xl transition" />
                  <div className="relative flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gold grid place-items-center shrink-0">
                      <MapPin className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <div className="font-display text-2xl text-foreground tracking-wider">{c.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">{c.desc}</div>
                      <div className="mt-3 inline-flex items-center text-xs text-primary uppercase tracking-wider">
                        Open in Google Maps <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COACH */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-ember opacity-30 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border border-primary/30 shadow-elegant">
                <img src={"./durairaj.png"} loading="lazy" width={1024} height={1024} alt="Coach Durairaj R" className="w-full" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-black text-yellow-400 rounded-2xl px-4 py-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Head Coach</div>
                <div className="font-display text-xl text-primary">Durairaj R</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="text-xs tracking-[0.3em] text-primary uppercase">Meet The Mentor</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
              Coach <span className="text-gradient-gold">Durairaj R</span>
            </h2>
            <div className="text-muted-foreground mt-2">Head Coach · Bow &amp; Arrow Archery Academy</div>

            <p className="mt-6 text-muted-foreground text-lg">
              Certified and experienced archery coach with over a decade of expertise in athlete development, competitive training,
              technical precision and mental discipline.
            </p>

            <div className="mt-8 glass-gold rounded-2xl p-6 relative">
              <Quote className="h-8 w-8 text-primary opacity-60" />
              <p className="mt-2 font-display text-xl lg:text-2xl text-foreground italic">
                "Build focus, confidence, and consistency through archery — one arrow at a time."
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { icon: Award, t: "Nationally Accredited Coach" },
                { icon: Users, t: "100+ Students Trained" },
                { icon: Trophy, t: "District & State-Level Coaching" },
                { icon: Calendar, t: "15+ Years Experience" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-3 glass rounded-xl p-4">
                  <c.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{c.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY ARCHERY */}
      <section className="relative py-24 lg:py-32 bg-charcoal/40">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Uniqueness of The Sport</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Why <span className="text-gradient-ember">Archery?</span>
              </h2>
              <p className="mt-4 text-muted-foreground">A sport that sharpens the mind as much as the body.</p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteData.why_archery.map((w, i) => {
              const IconComponent = typeof w.icon === "string" ? (iconMap[w.icon] || Target) : w.icon;
              const keyId = (w as any).id || w.title;
              return (
                <Reveal key={keyId} delay={i * 0.04}>
                  <div className="group relative glass rounded-2xl p-6 text-center hover-lift h-full">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-ember grid place-items-center group-hover:scale-110 transition-transform">
                      <IconComponent className="h-7 w-7 text-background" />
                    </div>
                    <div className="mt-4 font-semibold text-foreground">{w.title}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Three Levels</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Master <span className="text-gradient-gold">Curriculum</span>
              </h2>
              <p className="mt-4 text-muted-foreground">A structured journey from first arrow to competition stage.</p>
            </div>
          </Reveal>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {levels.map((l, i) => (
              <button
                key={l.title}
                onClick={() => setActiveLevel(i)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all ${activeLevel === i
                  ? "bg-ember text-accent-foreground glow-ember"
                  : "glass text-muted-foreground hover:text-foreground"
                  }`}
              >
                {l.tag} · {l.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-10 relative rounded-3xl glass p-8 lg:p-12 overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${levels[activeLevel].color} opacity-60`} />
            <div className="relative grid lg:grid-cols-3 gap-10">
              <div>
                <div className="text-xs tracking-[0.3em] text-primary uppercase">{levels[activeLevel].tag}</div>
                <h3 className={`mt-2 font-display uppercase text-foreground ${levels[activeLevel].title === "Intermediate"
                  ? "text-4xl lg:text-5xl"
                  : "text-5xl lg:text-7xl"
                  }`}>
                  {levels[activeLevel].title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-primary">
                  <Calendar className="h-4 w-4" /> {levels[activeLevel].hours}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  {levels[activeLevel].modules.map((m, idx) => (
                    <div key={m} className="flex items-center gap-3 glass rounded-xl p-4">
                      <div className="h-8 w-8 rounded-full bg-gold grid place-items-center text-background font-bold text-sm shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <span className="font-medium">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="relative py-24 lg:py-32 bg-charcoal/40">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Specialised Tracks</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Our <span className="text-gradient-ember">Programs</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteData.programs.map((p, i) => {
              const isExpanded = !!expandedPrograms[p.title];
              const IconComponent = typeof p.icon === "string" ? (iconMap[p.icon] || Heart) : p.icon;
              const keyId = (p as any).id || p.title;
              return (
                <Reveal key={keyId} delay={i * 0.06}>
                  <div className="group relative rounded-2xl p-px bg-gradient-to-br from-primary/40 to-accent/30 hover:from-primary hover:to-accent transition-all h-full">
                    <div className="rounded-2xl bg-card p-6 h-full flex flex-col justify-between hover-lift">
                      <div>
                        <div className="h-14 w-14 rounded-2xl bg-ember grid place-items-center">
                          <IconComponent className="h-7 w-7 text-background" />
                        </div>
                        <h3 className="mt-5 font-display text-2xl text-foreground tracking-wider">{p.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                          <p className="text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                            {p.details}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedPrograms(prev => ({ ...prev, [p.title]: !isExpanded }))}
                        className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:text-accent cursor-pointer transition-colors"
                      >
                        {isExpanded ? "Show Less" : "Learn More"} <ArrowRight className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 bg-hero opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Track Record</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Hall of <span className="text-gradient-gold">Champions</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {siteData.achievements.map((a, i) => {
              const IconComponent = iconMap[a.icon] || Trophy;
              return (
                <Reveal key={a.label} delay={i * 0.05}>
                  <div className="relative glass-gold rounded-2xl p-6 text-center hover-lift overflow-hidden group">
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold opacity-20 blur-3xl group-hover:opacity-40 transition" />
                    <IconComponent className="h-8 w-8 text-primary mx-auto" />
                    <div className="mt-3 font-display text-4xl lg:text-5xl text-gradient-gold">
                      <Counter to={a.value} suffix={a.suffix} />
                    </div>
                    <div className="mt-1 text-xs tracking-widest uppercase text-muted-foreground">{a.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-24 lg:py-32 bg-charcoal/40">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Captured Moments</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                Academy <span className="text-gradient-ember">Gallery</span>
              </h2>
              <p className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">Scroll to view more · Click image to expand</p>
            </div>
          </Reveal>

          <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 no-scrollbar scroll-smooth">
            {siteData.gallery.map((g, i) => (
              <Reveal key={i} delay={i * 0.04} className="snap-center shrink-0 w-[280px] sm:w-[360px] aspect-[4/3] relative">
                <div
                  onClick={() => setSelectedGalleryImage(g)}
                  className="group relative h-full w-full overflow-hidden rounded-2xl cursor-pointer shadow-elegant border border-border/30 hover:border-primary/50 transition-colors"
                >
                  <img
                    src={imageMap[g.src] || g.src}
                    loading="lazy"
                    alt={g.cat}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-100 transition" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs tracking-[0.25em] uppercase text-primary">B&amp;A</div>
                    <div className="font-display text-xl text-foreground">{g.cat}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs tracking-[0.3em] text-primary uppercase">Voices</div>
              <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
                What Our <span className="text-gradient-gold">Athletes Say</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 no-scrollbar">
            {siteData.testimonials.map((t, i) => (
              <div
                key={i}
                className="w-full md:w-[600px] flex-shrink-0 snap-center glass-gold rounded-3xl p-8 lg:p-12 text-center flex flex-col justify-between"
              >
                <div>
                  <Quote className="h-10 w-10 text-primary mx-auto opacity-70" />
                  <p className="mt-6 font-display text-2xl lg:text-3xl text-foreground italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div>
                  <div className="mt-6 flex items-center justify-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <img src={imageMap[t.img] || g1} loading="lazy" width={80} height={80} alt="" className="h-12 w-12 rounded-full object-cover border-2 border-primary" />
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="text-xs text-muted-foreground tracking-wider uppercase">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero" />
        <img src={heroImg} loading="lazy" width={1920} height={1080} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/50" />
        <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold text-xs tracking-[0.25em] uppercase text-primary">
              <Flame className="h-3.5 w-3.5" /> Limited Seats Open
            </div>
            <h2 className="mt-6 font-display text-5xl lg:text-7xl uppercase leading-[0.95]">
              Start Your <br /> <span className="text-gradient-ember">Archery Journey</span> Today
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto">
              Join Chennai's premier archery academy and train under certified professionals with structured programs designed for
              focus, discipline and competitive excellence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setIsEnrollOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-ember text-accent-foreground font-bold hover:glow-ember transition-all cursor-pointer"
              >
                Enroll Now <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-gold text-primary font-bold hover:glow-gold transition-all">
                Contact Academy
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24 lg:py-32 bg-charcoal/40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="text-xs tracking-[0.3em] text-primary uppercase">Get In Touch</div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl uppercase">
              Visit Our <span className="text-gradient-gold">Academy</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Reach out for trial sessions, enrolments and partnership enquiries.</p>

            <div className="mt-8 space-y-3">
              {[
                { icon: MapPin, title: "Headquarters", desc: siteData.content.contact_address },
                { icon: Phone, title: "Phone", desc: siteData.content.contact_phone },
                { icon: Mail, title: "Email", desc: siteData.content.contact_email },
              ].map((c) => (
                <div key={c.title} className="flex items-start gap-4 glass rounded-2xl p-5 hover-lift">
                  <div className="h-11 w-11 rounded-xl bg-gold grid place-items-center shrink-0">
                    <c.icon className="h-5 w-5 text-background" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                    <div className="font-semibold text-foreground">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive map
            <div id="interactive-map" className="mt-6 relative rounded-2xl overflow-hidden h-72 border border-primary/20 shadow-elegant">
              {siteData.centers[activeCenterIdx]?.map_url ? (
                <iframe
                  title="Training Center Location"
                  src={siteData.centers[activeCenterIdx].map_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-center bg-charcoal">
                  <div>
                    <MapPin className="h-10 w-10 text-primary mx-auto" />
                    <div className="mt-2 font-display text-xl">Location Map Not Available</div>
                  </div>
                </div>
              )}
            </div> */}
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm centers={siteData.centers} />
          </Reveal>
        </div>

        {/* Floating WhatsApp */}
        <a
          href="#contact"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-ember text-background grid place-items-center shadow-elegant glow-ember hover:scale-110 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="relative pt-20 pb-10 border-t border-border bg-charcoal">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-5 gap-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <img src="./b&a logo.png" alt="b&a logo.png" className="h-15 w-auto" />
                {/* <div className="h-10 w-10 rounded-full bg-gold grid place-items-center">
                  <Target className="h-5 w-5 text-background" />
                </div> */}
                <div>
                  <div className="font-display text-xl tracking-widest">BOW &amp; ARROW</div>
                  <div className="text-[10px] tracking-[0.3em] text-muted-foreground">ARCHERY ACADEMY · CHENNAI</div>
                  <div className="text-[10px] tracking-[0.2em] text-muted-foreground">KOORMAI ELAKU PVT LTD</div>
                </div>
              </div>
              <p className="mt-5 text-muted-foreground max-w-md">
                Chennai's premier archery academy training students, schools and competitive athletes since 2013.
              </p>
              <div className="mt-6 glass-gold rounded-2xl p-5">
                <Quote className="h-5 w-5 text-primary" />
                <p className="mt-2 font-display text-lg italic text-foreground">
                  "Champions are built through discipline, focus, and consistency."
                </p>
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] uppercase text-primary">Quick Links</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["About", "Curriculum", "Programs", "Achievements", "Gallery", "Contact"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">{l}</a>
                  </li>
                ))}
                <li>
                  <a href="/admin" className="hover:text-primary transition-colors font-medium">Admin Panel</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs tracking-[0.25em] uppercase text-primary">Locations</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {centres.map((c) => (<li key={c.name}>{c.name}</li>))}
              </ul>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <h6 className="text-xs tracking-[0.25em] uppercase text-primary">Powered by</h6>
              <img src="zenelaitinfotech_logo.png" alt="zenelait_infotech" className="h-15 w-auto" />
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bow &amp; Arrow Archery Academy. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((I, i) => (
                <a key={i} href="#" aria-label="Social link" className="h-9 w-9 grid place-items-center rounded-full glass hover:glow-gold transition-all">
                  <I className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <EnrollmentModal isOpen={isEnrollOpen} onClose={() => setIsEnrollOpen(false)} />
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-md cursor-zoom-out"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-charcoal/80 border border-border text-foreground hover:text-primary transition-all z-10 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={imageMap[selectedGalleryImage.src] || selectedGalleryImage.src}
              alt={selectedGalleryImage.cat}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-primary/20 shadow-elegant"
            />
            <div className="mt-4 text-center">
              <span className="text-xs tracking-[0.3em] text-primary uppercase">B&amp;A Academy</span>
              <h3 className="font-display text-2xl text-foreground mt-1 uppercase">{selectedGalleryImage.cat}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContactForm({ centers }: { centers: { name: string; desc: string }[] }) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    preferred_center: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Initialize preferred center when centers are loaded
  useEffect(() => {
    if (centers.length > 0 && !formData.preferred_center) {
      setFormData(prev => ({ ...prev, preferred_center: centers[0].name }));
    }
  }, [centers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.phone || !formData.email) {
      setErrorMsg("Full Name, Phone and Email are required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const subject = encodeURIComponent(
          `Free Trial Booking - ${formData.full_name}`
        );

        const body = encodeURIComponent(
          `New Free Trial Request\n\n` +
          `Full Name: ${formData.full_name}\n` +
          `Phone: ${formData.phone}\n` +
          `Email: ${formData.email}\n` +
          `Preferred Centre: ${formData.preferred_center}\n\n` +
          `Message:\n${formData.message}`
        );

        // Open user's email app with details pre-filled in Gmail
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=coach2017@yahoo.com&su=${subject}&body=${body}`,
          "_blank"
        );

        setSubmitted(true);
        setStatus("idle");

        setFormData({
          full_name: "",
          phone: "",
          email: "",
          preferred_center: centers[0]?.name || "",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 4000);
      } else {
        const err = await response.json();
        setErrorMsg(err.message || "Failed to submit request.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMsg("Failed to connect to backend server.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-gold rounded-3xl p-8 shadow-elegant">
      <div className="font-display text-2xl text-foreground tracking-wider">Book a Free Trial</div>
      <p className="text-sm text-muted-foreground mt-1">Fill in the form and our team will reach out within 24 hours.</p>

      {status === "error" && (
        <div className="mt-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
          {errorMsg}
        </div>
      )}

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Your name" />
        <Field label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" />
        <Field label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className="sm:col-span-2" />

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Preferred Centre</label>
          <select
            name="preferred_center"
            value={formData.preferred_center}
            onChange={handleChange}
            className="mt-2 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
          >
            {centers.map((c) => (<option key={c.name} value={c.name} className="bg-background">{c.name}</option>))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your goals..."
            className="mt-2 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-ember text-accent-foreground font-bold hover:glow-ember transition-all cursor-pointer disabled:opacity-50"
      >
        {status === "submitting" ? (
          "Sending..."
        ) : submitted ? (
          <><CheckCircle2 className="h-5 w-5" /> Request Sent</>
        ) : (
          <>Send Request <Send className="h-4 w-4" /></>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  placeholder,
  className = "",
  value,
  onChange,
  name
}: {
  label: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
        required
      />
    </div>
  );
}
