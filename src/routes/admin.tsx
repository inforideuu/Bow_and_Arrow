import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Settings,
  MapPin,
  Trophy,
  Users,
  MessageSquare,
  FileSpreadsheet,
  Save,
  Plus,
  Trash2,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Image,
  LogOut,
  Award,
  Shield,
  Heart,
  Target,
  Download,
  Bell
} from "lucide-react";

import { API_URL } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

type TabType =
  | "dashboard"
  | "content"
  | "features"
  | "why_archery"
  | "programs"
  | "centers"
  | "achievements"
  | "testimonials"
  | "gallery"
  | "enrollments"
  | "contacts";

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("admin_logged_in") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [siteData, setSiteData] = useState({
    content: {
      site_title: "",
      meta_description: "",
      hero_title_1: "",
      hero_title_2: "",
      hero_description_line_1: "",
      hero_description_line_2: "",
      contact_phone: "",
      contact_email: "",
      contact_address: "",
    },
    centers: [] as { name: string; desc: string; map_url: string; google_maps_url: string }[],
    achievements: [] as { icon: string; value: number; suffix: string; label: string }[],
    testimonials: [] as { name: string; role: string; quote: string; img: string }[],
    gallery: [] as { id?: number; src: string; cat: string; span: string }[],
    features: [] as { id?: number; icon: string; title: string; desc: string }[],
    why_archery: [] as { id?: number; icon: string; title: string }[],
    programs: [] as { id?: number; icon: string; title: string; desc: string; details: string }[],
    batches: [] as { id?: number; name: string; age_group: string; objectives: string; weekly_plan: string; assessment: string }[],
    assessments: [] as { id?: number; category: string; val_1_2: string; val_3_4: string; val_5_6: string; val_7_8: string }[],
  });

  const [submissions, setSubmissions] = useState({
    enrollments: [] as any[],
    contacts: [] as any[],
  });

  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("read_notification_ids");
        if (saved) {
          setReadIds(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load notifications from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && readIds.length > 0) {
      try {
        localStorage.setItem("read_notification_ids", JSON.stringify(readIds));
      } catch (e) {
        console.error("Failed to save notifications to localStorage", e);
      }
    }
  }, [readIds]);


  // Derived notifications
  const allNotifications = [
    ...submissions.enrollments.map(e => ({
      id: `enroll-${e.id}`,
      type: "Enrollment",
      title: e.student_name,
      desc: `Level: ${e.training_level} · Contact: ${e.primary_contact}`,
      time: new Date(e.submitted_at).toLocaleDateString(),
      data: e,
      rawTime: new Date(e.submitted_at).getTime()
    })),
    ...submissions.contacts.map(c => ({
      id: `contact-${c.id}`,
      type: "Free Trial",
      title: c.full_name,
      desc: `Center: ${c.preferred_center} · Phone: ${c.phone}`,
      time: new Date(c.submitted_at).toLocaleDateString(),
      data: { student_name: c.full_name, primary_contact: c.phone, isContactMsg: true, ...c },
      rawTime: new Date(c.submitted_at).getTime()
    }))
  ].sort((a, b) => b.rawTime - a.rawTime);

  const unreadCount = allNotifications.filter(n => !readIds.includes(n.id)).length;
  const recentNotifications = allNotifications.slice(0, 10);

  const markAllRead = () => {
    setReadIds(allNotifications.map(n => n.id));
  };
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const siteRes = await fetch(`${API_URL}/api/site-data/`);
      const siteJson = await siteRes.json();
      setSiteData(siteJson);

      const subRes = await fetch(`${API_URL}/api/admin/submissions/`);
      const subJson = await subRes.json();
      setSubmissions(subJson);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-hero opacity-30 mix-blend-luminosity pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <div className="relative w-full max-w-md bg-charcoal/80 border border-primary/20 p-8 rounded-3xl backdrop-blur-md shadow-elegant space-y-6">
          <div className="text-center space-y-2">
            <img src="/b&a logo.jpeg" alt="Logo" className="h-16 w-auto mx-auto rounded" />
            <h1 className="font-display text-3xl uppercase tracking-wider text-gradient-gold">Admin Portal</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Bow & Arrow Archery Academy</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-400 p-3.5 rounded-xl text-xs text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            if (usernameInput === "admin" && passwordInput === "admin321") {
              setIsLoggedIn(true);
              localStorage.setItem("admin_logged_in", "true");
              setLoginError("");
            } else {
              setLoginError("Invalid username or password.");
            }
          }} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="mt-1.5 w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary text-background font-bold hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-elegant text-sm uppercase tracking-wider"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleSaveContent = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-content/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData.content),
      });
      if (res.ok) {
        setSaveStatus("success");
        setStatusMsg("Page configuration saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save content configuration.");
    }
  };

  const handleSaveCenters = async (updatedCenters: typeof siteData.centers) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-centers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCenters),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, centers: updatedCenters }));
        setSaveStatus("success");
        setStatusMsg("Training centers list saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save centers.");
    }
  };

  const handleSaveAchievements = async (updatedAchievements: typeof siteData.achievements) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-achievements/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAchievements),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, achievements: updatedAchievements }));
        setSaveStatus("success");
        setStatusMsg("Achievements list saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save achievements.");
    }
  };

  const handleSaveTestimonials = async (updatedTestimonials: typeof siteData.testimonials) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-testimonials/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTestimonials),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, testimonials: updatedTestimonials }));
        setSaveStatus("success");
        setStatusMsg("Testimonials list saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save testimonials.");
    }
  };

  const handleSaveGallery = async (updatedGallery: typeof siteData.gallery) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-gallery-images/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGallery),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, gallery: updatedGallery }));
        setSaveStatus("success");
        setStatusMsg("Gallery saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save gallery images.");
    }
  };

  const handleSaveFeatures = async (updatedFeatures: typeof siteData.features) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-features/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFeatures),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, features: updatedFeatures }));
        setSaveStatus("success");
        setStatusMsg("About Features saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save features.");
    }
  };

  const handleSaveWhyArchery = async (updatedWhy: typeof siteData.why_archery) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-why-archery/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedWhy),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, why_archery: updatedWhy }));
        setSaveStatus("success");
        setStatusMsg("Why Archery items saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save Why Archery items.");
    }
  };

  const handleSavePrograms = async (updatedPrograms: typeof siteData.programs) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-programs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPrograms),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, programs: updatedPrograms }));
        setSaveStatus("success");
        setStatusMsg("Programs saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save programs.");
    }
  };

  const handleSaveAssessments = async (updatedAssessments: typeof siteData.assessments) => {
    setSaveStatus("saving");
    try {
      const res = await fetch(`${API_URL}/api/admin/update-assessments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAssessments),
      });
      if (res.ok) {
        setSiteData(prev => ({ ...prev, assessments: updatedAssessments }));
        setSaveStatus("success");
        setStatusMsg("Assessments saved successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to save assessments.");
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this trial booking?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/${id}/delete/`, {
        method: "POST"
      });
      if (res.ok) {
        setSubmissions(prev => ({
          ...prev,
          contacts: prev.contacts.filter(c => c.id !== id)
        }));
        setSaveStatus("success");
        setStatusMsg("Booking deleted successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to delete booking.");
    }
  };

  const handleClearContacts = async () => {
    if (!window.confirm("Are you sure you want to delete ALL trial bookings? This action cannot be undone.")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/contacts/clear/`, {
        method: "POST"
      });
      if (res.ok) {
        setSubmissions(prev => ({
          ...prev,
          contacts: []
        }));
        setSaveStatus("success");
        setStatusMsg("All bookings cleared successfully!");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        throw new Error();
      }
    } catch {
      setSaveStatus("error");
      setStatusMsg("Failed to clear bookings.");
    }
  };

  const handleDownloadPDF = (enrollment: any) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Student Enrollment Profile - ${enrollment.student_name}</title>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet">
          <style>
            @media print {
              body {
                padding: 10px;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .page-container {
                border: none !important;
                box-shadow: none !important;
              }
            }
            body {
              font-family: 'Montserrat', sans-serif;
              color: #2c2c2c;
              background-color: #ffffff;
              line-height: 1.5;
              margin: 0;
              padding: 30px;
            }
            .page-container {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #e5d5b7;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.05);
              position: relative;
              background-image: radial-gradient(#faf6ee 1px, transparent 1px);
              background-size: 20px 20px;
            }
            .top-border {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 8px;
              background: linear-gradient(90deg, #b89347, #d4af37, #967121);
            }
            .header-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 35px;
            }
            .logo-cell {
              width: 120px;
              vertical-align: middle;
            }
            .logo-img {
              height: 90px;
              width: auto;
              mix-blend-mode: multiply;
              filter: contrast(1.1);
            }
            .title-cell {
              padding-left: 20px;
              vertical-align: middle;
            }
            .academy-title {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              font-weight: 700;
              color: #7a5e24;
              margin: 0;
              letter-spacing: 0.5px;
              text-transform: uppercase;
            }
            .academy-subtitle {
              font-size: 11px;
              color: #888;
              margin: 5px 0 0 0;
              letter-spacing: 3px;
              text-transform: uppercase;
              font-weight: 700;
            }
            .photo-box {
              width: 120px;
              height: 140px;
              border: 2px dashed #d4af37;
              background: #fafafa;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 9px;
              color: #b89347;
              text-transform: uppercase;
              font-weight: 700;
              text-align: center;
              border-radius: 8px;
              overflow: hidden;
            }
            .photo-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .section-title {
              font-family: 'Playfair Display', serif;
              font-size: 15px;
              color: #ffffff;
              background: linear-gradient(135deg, #7a5e24, #b89347);
              padding: 8px 16px;
              margin-top: 30px;
              margin-bottom: 18px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              font-weight: 600;
              border-radius: 4px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px 25px;
            }
            .info-col-2 {
              grid-column: span 2;
            }
            .info-col-3 {
              grid-column: span 3;
            }
            .info-item {
              border-bottom: 1px solid #f0e6d2;
              padding-bottom: 6px;
            }
            .info-label {
              font-size: 9px;
              color: #9c804b;
              text-transform: uppercase;
              font-weight: 700;
              letter-spacing: 0.8px;
            }
            .info-value {
              font-size: 13px;
              color: #1a1a1a;
              font-weight: 500;
              margin-top: 3px;
            }
            .badge {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 20px;
              font-size: 10px;
              font-weight: 700;
              background-color: #faf0db;
              color: #7a5e24;
              border: 1px solid #e5d5b7;
              text-transform: uppercase;
            }
            .footer-note {
              margin-top: 50px;
              border-top: 2px solid #e5d5b7;
              padding-top: 15px;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              color: #888;
              font-weight: 500;
            }
            .signature-box {
              margin-top: 40px;
              text-align: right;
              font-size: 12px;
              font-weight: 700;
              color: #7a5e24;
            }
            .signature-line {
              display: inline-block;
              border-top: 1px solid #b89347;
              width: 180px;
              margin-top: 45px;
              text-align: center;
              font-size: 10px;
              color: #888;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="page-container">
            <div class="top-border"></div>
            
            <table class="header-table">
              <tr>
                <td class="logo-cell">
                  <img class="logo-img" src="/pdf logo.jpeg" alt="B&A Logo" />
                </td>
                <td class="title-cell">
                  <h1 class="academy-title">Bow & Arrow</h1>
                  <div class="academy-subtitle">Archery Academy Chennai</div>
                  <div style="font-size: 12px; color: #b89347; font-weight: 700; margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">Official Enrollment File</div>
                </td>
                <td align="right" valign="top">
                  <div class="photo-box">
                    ${enrollment.photo ? `<img class="photo-img" src="${enrollment.photo}" alt="Student Photo" />` : `Student<br/>Photo<br/>Placeholder`}
                  </div>
                </td>
              </tr>
            </table>
            
            <div class="section-title">I. Student Profile</div>
            <div class="info-grid">
              <div class="info-col-2 info-item">
                <div class="info-label">Full Name of Student</div>
                <div class="info-value" style="font-size: 16px; font-weight: 700; color: #7a5e24;">${enrollment.student_name}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date of Admission</div>
                <div class="info-value">${enrollment.date_of_joining || new Date(enrollment.submitted_at).toLocaleDateString()}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Date of Birth</div>
                <div class="info-value">${enrollment.dob || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Age</div>
                <div class="info-value">${enrollment.age || "—"} Years</div>
              </div>
              <div class="info-item">
                <div class="info-label">Gender</div>
                <div class="info-value">${enrollment.gender || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Blood Group</div>
                <div class="info-value"><span class="badge">${enrollment.blood_group || "—"}</span></div>
              </div>
              <div class="info-item">
                <div class="info-label">Aadhar Card Number</div>
                <div class="info-value">${enrollment.aadhar_no || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Nationality</div>
                <div class="info-value">${enrollment.nationality || "—"}</div>
              </div>
              <div class="info-col-2 info-item">
                <div class="info-label">School / Educational Institution</div>
                <div class="info-value">${enrollment.school || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Grade / Standard</div>
                <div class="info-value">${enrollment.grade || "—"}</div>
              </div>
              <div class="info-col-2 info-item">
                <div class="info-label">Residential Address</div>
                <div class="info-value">${enrollment.residential_address || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">City & PIN Code</div>
                <div class="info-value">${enrollment.city_pin || "—"}</div>
              </div>
            </div>

            <div class="section-title">II. Parent / Guardian Records</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Father's Name</div>
                <div class="info-value">${enrollment.father_name || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Father's Occupation</div>
                <div class="info-value">${enrollment.father_occupation || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Relationship</div>
                <div class="info-value">${enrollment.relationship || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Mother's Name</div>
                <div class="info-value">${enrollment.mother_name || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Mother's Occupation</div>
                <div class="info-value">${enrollment.mother_occupation || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email Address</div>
                <div class="info-value">${enrollment.email_address || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Primary Contact No.</div>
                <div class="info-value" style="font-weight: 700;">${enrollment.primary_contact || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Alternate Contact No.</div>
                <div class="info-value">${enrollment.alternate_contact || "—"}</div>
              </div>
            </div>

            <div class="section-title">III. Program Assignment & Medical Records</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Assigned Training Level</div>
                <div class="info-value"><span class="badge" style="background-color: #e3f2fd; color: #1565c0; border-color: #bbdefb;">${enrollment.training_level || "Beginner"}</span></div>
              </div>
              <div class="info-col-2 info-item">
                <div class="info-label">Coaching model Option</div>
                <div class="info-value">${enrollment.coaching_option || "—"}</div>
              </div>
              <div class="info-col-3 info-item">
                <div class="info-label">Selected Optional Add-ons</div>
                <div class="info-value">${enrollment.add_ons || "None selected."}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Medical Conditions Exist?</div>
                <div class="info-value">${enrollment.medical_conditions_exist || "No"}</div>
              </div>
              <div class="info-col-2 info-item">
                <div class="info-label">Medical Specifications / Details</div>
                <div class="info-value">${enrollment.medical_details || "—"}</div>
              </div>
              <div class="info-col-3 info-item">
                <div class="info-label">Allergies & Current Medications</div>
                <div class="info-value">${enrollment.allergies ? enrollment.allergies + " / " : ""}${enrollment.medications || "None"}</div>
              </div>
              <div class="info-col-2 info-item">
                <div class="info-label">Emergency Contact Authorized Person</div>
                <div class="info-value">${enrollment.emergency_name || "—"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Emergency Phone</div>
                <div class="info-value" style="font-weight: 700; color: #d32f2f;">${enrollment.emergency_phone || "—"}</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
              <div class="footer-note" style="width: 50%;">
                <div>
                  Bow & Arrow Archery Academy Chennai Admissions<br/>
                  Document reference: BAA-ENR-${enrollment.id || "00"}<br/>
                  Generated on: ${new Date().toLocaleDateString()}
                </div>
              </div>
              <div class="signature-box">
                <div class="signature-line">Authorized Signature</div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 300);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "content", label: "Page Content", icon: Settings },
    { id: "features", label: "About Features", icon: Award },
    { id: "why_archery", label: "Why Archery", icon: Target },
    { id: "programs", label: "Our Programs", icon: Heart },
    { id: "centers", label: "Training Centers", icon: MapPin },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "testimonials", label: "Testimonials", icon: Users },
    { id: "gallery", label: "Gallery Section", icon: Image },
    { id: "enrollments", label: "Student Enrollments", icon: FileSpreadsheet },
    { id: "contacts", label: "Trial Bookings", icon: MessageSquare },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Loading Admin Console...</p>
        </div>
      </div>
    );
  }

  const filteredEnrollments = submissions.enrollments.filter(
    (e) =>
      e.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.primary_contact && e.primary_contact.includes(searchTerm)) ||
      (e.training_level && e.training_level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal border-b md:border-b-0 md:border-r border-border shrink-0 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-border flex items-center gap-2">
            <img src="/b&a logo.jpeg" alt="Logo" className="h-10 w-auto rounded" />
            <div>
              <div className="font-display text-lg tracking-wider text-primary">ADMIN CONSOLE</div>
              <div className="text-[9px] tracking-widest text-muted-foreground uppercase -mt-1">B&amp;A Archery Academy</div>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeTab === item.id
                    ? "bg-primary text-background font-bold"
                    : "text-muted-foreground hover:bg-background/40 hover:text-foreground"
                    }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border space-y-2">
          <a
            href="/"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-border hover:border-primary text-xs tracking-wider uppercase font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            ← View Live Site
          </a>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("admin_logged_in");
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-h-screen">
        {/* Top Header Row with Notification Bell */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-border bg-charcoal/20 px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Active Panel:</span>
            <span className="text-sm font-bold uppercase tracking-wider text-primary">{activeTab}</span>
          </div>
          <div className="relative flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2.5 rounded-full bg-background border border-border hover:border-primary text-foreground hover:scale-105 transition-all relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown menu */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-card border border-primary/20 rounded-2xl shadow-elegant overflow-hidden z-50">
                  <div className="p-4 border-b border-border bg-charcoal flex justify-between items-center">
                    <span className="font-display text-sm tracking-wider uppercase text-foreground">Recent Submissions</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-[10px] uppercase tracking-widest text-primary hover:underline font-semibold"
                      >
                        Clear New
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-border">
                    {recentNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground">
                        No new notifications.
                      </div>
                    ) : (
                      recentNotifications.map((n, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedEnrollment(n.data);
                            setIsNotifOpen(false);
                            if (!readIds.includes(n.id)) {
                              setReadIds(prev => [...prev, n.id]);
                            }
                          }}
                          className={`p-3.5 hover:bg-background/50 transition-colors cursor-pointer text-xs space-y-1 ${!readIds.includes(n.id) ? "border-l-2 border-primary bg-primary/5" : ""
                            }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-foreground truncate max-w-[140px]">{n.title}</span>
                            <span className="text-[9px] uppercase tracking-widest text-primary/80 font-semibold px-1.5 py-0.5 rounded bg-primary/10">
                              {n.type}
                            </span>
                          </div>
                          <p className="text-muted-foreground truncate">{n.desc}</p>
                          <span className="text-[9px] text-muted-foreground/60 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Banner */}
        {saveStatus !== "idle" && (
          <div
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-elegant border ${saveStatus === "success"
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : saveStatus === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-charcoal border-primary/20 text-primary"
              }`}
          >
            {saveStatus === "saving" && <div className="h-4 w-4 border-2 border-primary border-t-transparent animate-spin rounded-full" />}
            {saveStatus === "success" && <CheckCircle className="h-5 w-5" />}
            {saveStatus === "error" && <AlertCircle className="h-5 w-5" />}
            <span className="text-sm font-medium">{statusMsg || "Saving details..."}</span>
          </div>
        )}

        {/* Tab Content Router */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Overview Dashboard</h2>
              <p className="text-sm text-muted-foreground">Quick analytical snapshot of registrations and configuration status.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="glass-gold rounded-2xl p-6 relative overflow-hidden">
                <FileSpreadsheet className="absolute right-4 bottom-4 h-16 w-16 text-primary opacity-10" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Total Enrolled Students</div>
                <div className="font-display text-5xl text-primary mt-2">{submissions.enrollments.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Active students loaded from local application registers.</p>
              </div>

              <div className="glass rounded-2xl p-6 relative overflow-hidden">
                <MessageSquare className="absolute right-4 bottom-4 h-16 w-16 text-foreground opacity-10" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Trial Session Bookings</div>
                <div className="font-display text-5xl text-foreground mt-2">{submissions.contacts.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Contact forms submitted requesting free trial sessions.</p>
              </div>

              <div className="glass rounded-2xl p-6 relative overflow-hidden">
                <MapPin className="absolute right-4 bottom-4 h-16 w-16 text-foreground opacity-10" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Location Centers</div>
                <div className="font-display text-5xl text-foreground mt-2">{siteData.centers.length}</div>
                <p className="text-xs text-muted-foreground mt-2">Active training locations in Chennai managed on the map.</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 pt-4">
              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="font-semibold text-lg border-b border-border pb-2">Recent Student Enrollments</div>
                {submissions.enrollments.slice(0, 4).length === 0 ? (
                  <div className="text-sm text-muted-foreground">No recent enrollments.</div>
                ) : (
                  <div className="space-y-3">
                    {submissions.enrollments.slice(0, 4).map((e, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-background/40 border border-border p-3.5 rounded-xl text-sm">
                        <div>
                          <div className="font-bold text-foreground">{e.student_name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{e.training_level} · Contact: {e.primary_contact}</div>
                        </div>
                        <button
                          onClick={() => setSelectedEnrollment(e)}
                          className="p-2 rounded-lg bg-background border border-border hover:border-primary text-primary hover:scale-105 transition-transform"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="font-semibold text-lg border-b border-border pb-2">Recent Trial Enquiries</div>
                {submissions.contacts.slice(0, 4).length === 0 ? (
                  <div className="text-sm text-muted-foreground">No recent contact inquiries.</div>
                ) : (
                  <div className="space-y-3">
                    {submissions.contacts.slice(0, 4).map((c, idx) => (
                      <div key={idx} className="bg-background/40 border border-border p-3.5 rounded-xl text-sm space-y-1">
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-foreground">{c.full_name}</div>
                          <div className="text-xs text-primary/80 uppercase font-semibold">{c.preferred_center}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Email: {c.email} | Phone: {c.phone}</div>
                        <div className="text-xs text-muted-foreground border-t border-border/50 pt-1 mt-1.5 italic">"{c.message}"</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Website Content Config</h2>
                <p className="text-sm text-muted-foreground">Edit global titles, descriptions, and contact coordinates in the database.</p>
              </div>
              <button
                onClick={handleSaveContent}
                className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform"
              >
                <Save className="h-4 w-4" /> Save Content
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 bg-charcoal/20 border border-border p-6 rounded-2xl">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Website Main Title</label>
                <input
                  type="text"
                  value={siteData.content.site_title}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, site_title: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Meta Description</label>
                <textarea
                  value={siteData.content.meta_description}
                  rows={2}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, meta_description: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Hero Heading Line 1</label>
                <input
                  type="text"
                  value={siteData.content.hero_title_1}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, hero_title_1: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Hero Heading Line 2 (Highlighted)</label>
                <input
                  type="text"
                  value={siteData.content.hero_title_2}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, hero_title_2: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Hero Description Line 1</label>
                <input
                  type="text"
                  value={siteData.content.hero_description_line_1}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, hero_description_line_1: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Hero Description Line 2</label>
                <textarea
                  value={siteData.content.hero_description_line_2}
                  rows={3}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, hero_description_line_2: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Contact Address / Headquarters</label>
                <input
                  type="text"
                  value={siteData.content.contact_address}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, contact_address: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Contact Phone Number</label>
                <input
                  type="text"
                  value={siteData.content.contact_phone}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, contact_phone: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Contact Email Address</label>
                <input
                  type="email"
                  value={siteData.content.contact_email}
                  onChange={(e) => setSiteData(prev => ({ ...prev, content: { ...prev.content, contact_email: e.target.value } }))}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "centers" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Training Centers List</h2>
                <p className="text-sm text-muted-foreground">Manage active coaching sites, locations and branches.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.centers, { name: "New Center", desc: "Coaching schedule description.", map_url: "", google_maps_url: "" }];
                    setSiteData(prev => ({ ...prev, centers: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Location
                </button>
                <button
                  onClick={() => handleSaveCenters(siteData.centers)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Centers
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {siteData.centers.map((c, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl space-y-3 relative group">
                  <button
                    onClick={() => {
                      const updated = siteData.centers.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, centers: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Center Name</label>
                    <input
                      type="text"
                      value={c.name}
                      onChange={(e) => {
                        const updated = [...siteData.centers];
                        updated[i] = { ...updated[i], name: e.target.value };
                        setSiteData(prev => ({ ...prev, centers: updated }));
                      }}
                      className="w-full max-w-[80%] bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Center Description / Batches</label>
                    <textarea
                      value={c.desc}
                      rows={2}
                      onChange={(e) => {
                        const updated = [...siteData.centers];
                        updated[i] = { ...updated[i], desc: e.target.value };
                        setSiteData(prev => ({ ...prev, centers: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Google Maps Embed URL</label>
                    <input
                      type="text"
                      value={c.map_url || ""}
                      onChange={(e) => {
                        const updated = [...siteData.centers];
                        updated[i] = { ...updated[i], map_url: e.target.value };
                        setSiteData(prev => ({ ...prev, centers: updated }));
                      }}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-xs"
                    />
                  </div>
                  {/* <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Google Maps Redirect URL</label>
                    <input
                      type="text"
                      value={c.google_maps_url || ""}
                      onChange={(e) => {
                        const updated = [...siteData.centers];
                        updated[i] = { ...updated[i], google_maps_url: e.target.value };
                        setSiteData(prev => ({ ...prev, centers: updated }));
                      }}
                      placeholder="https://maps.app.goo.gl/... or https://www.google.com/maps/place/..."
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-xs"
                    />
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Academy Achievements / Counters</h2>
                <p className="text-sm text-muted-foreground">Adjust statistics, student counts, and years of excellence on the homepage.</p>
              </div>
              <button
                onClick={() => handleSaveAchievements(siteData.achievements)}
                className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
              >
                <Save className="h-4 w-4" /> Save Achievements
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {siteData.achievements.map((a, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Label / Title</label>
                    <input
                      type="text"
                      value={a.label}
                      onChange={(e) => {
                        const updated = [...siteData.achievements];
                        updated[i].label = e.target.value;
                        setSiteData(prev => ({ ...prev, achievements: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Lucide Icon Class</label>
                    <input
                      type="text"
                      value={a.icon}
                      onChange={(e) => {
                        const updated = [...siteData.achievements];
                        updated[i].icon = e.target.value;
                        setSiteData(prev => ({ ...prev, achievements: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Integer Value</label>
                    <input
                      type="number"
                      value={a.value}
                      onChange={(e) => {
                        const updated = [...siteData.achievements];
                        updated[i].value = parseInt(e.target.value) || 0;
                        setSiteData(prev => ({ ...prev, achievements: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Value Suffix</label>
                    <input
                      type="text"
                      value={a.suffix}
                      onChange={(e) => {
                        const updated = [...siteData.achievements];
                        updated[i].suffix = e.target.value;
                        setSiteData(prev => ({ ...prev, achievements: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Testimonials &amp; Quotes</h2>
                <p className="text-sm text-muted-foreground">Configure client references, quotes and parent reviews.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.testimonials, { name: "Client Name", role: "Parent / Archer", quote: "Praising quote.", img: "g1" }];
                    setSiteData(prev => ({ ...prev, testimonials: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Testimonial
                </button>
                <button
                  onClick={() => handleSaveTestimonials(siteData.testimonials)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Reviews
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {siteData.testimonials.map((t, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl space-y-3 relative">
                  <button
                    onClick={() => {
                      const updated = siteData.testimonials.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, testimonials: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Author Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[i].name = e.target.value;
                          setSiteData(prev => ({ ...prev, testimonials: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Author Designation</label>
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) => {
                          const updated = [...siteData.testimonials];
                          updated[i].role = e.target.value;
                          setSiteData(prev => ({ ...prev, testimonials: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Parent Quote</label>
                    <textarea
                      value={t.quote}
                      rows={3}
                      onChange={(e) => {
                        const updated = [...siteData.testimonials];
                        updated[i].quote = e.target.value;
                        setSiteData(prev => ({ ...prev, testimonials: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Avatar Image Key (g1 to g6)</label>
                    <select
                      value={t.img}
                      onChange={(e) => {
                        const updated = [...siteData.testimonials];
                        updated[i].img = e.target.value;
                        setSiteData(prev => ({ ...prev, testimonials: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    >
                      {["g1", "g2", "g3", "g4", "g5", "g6"].map(k => (
                        <option key={k} value={k} className="bg-background">{k.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Academy Gallery Section</h2>
                <p className="text-sm text-muted-foreground">Add, edit, or delete images displayed in the scrollable gallery section.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.gallery, { src: "g1", cat: "New Event", span: "" }];
                    setSiteData(prev => ({ ...prev, gallery: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Image
                </button>
                <button
                  onClick={() => handleSaveGallery(siteData.gallery)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Gallery
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.gallery.map((img, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl space-y-3 relative flex flex-col justify-between">
                  <button
                    onClick={() => {
                      const updated = siteData.gallery.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, gallery: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="space-y-3 flex-1">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Category / Caption</label>
                      <input
                        type="text"
                        value={img.cat}
                        onChange={(e) => {
                          const updated = [...siteData.gallery];
                          updated[i].cat = e.target.value;
                          setSiteData(prev => ({ ...prev, gallery: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground block">Image URL / Preset Key (e.g. g1 to g6)</label>
                      <input
                        type="text"
                        value={img.src}
                        onChange={(e) => {
                          const updated = [...siteData.gallery];
                          updated[i].src = e.target.value;
                          setSiteData(prev => ({ ...prev, gallery: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">Image Preview:</span>
                    <div className="h-12 w-16 bg-charcoal border border-border rounded overflow-hidden">
                      <img
                        src={
                          img.src === "g1" ? "/src/assets/g1.jpg" :
                            img.src === "g2" ? "/src/assets/g2.jpg" :
                              img.src === "g3" ? "/src/assets/g3.jpg" :
                                img.src === "g4" ? "/src/assets/g4.jpg" :
                                  img.src === "g5" ? "/src/assets/g5.jpg" :
                                    img.src === "g6" ? "/src/assets/g6.jpg" :
                                      img.src
                        }
                        alt="preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">About Features Manager</h2>
                <p className="text-sm text-muted-foreground">Manage the 6 bullet features listed in the About section.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.features, { icon: "Award", title: "New Feature", desc: "Feature description." }];
                    setSiteData(prev => ({ ...prev, features: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Feature
                </button>
                <button
                  onClick={() => handleSaveFeatures(siteData.features)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Features
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {siteData.features.map((f, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl space-y-3 relative group">
                  <button
                    onClick={() => {
                      const updated = siteData.features.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, features: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Title</label>
                      <input
                        type="text"
                        value={f.title}
                        onChange={(e) => {
                          const updated = [...siteData.features];
                          updated[i].title = e.target.value;
                          setSiteData(prev => ({ ...prev, features: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Icon Key</label>
                      <select
                        value={f.icon}
                        onChange={(e) => {
                          const updated = [...siteData.features];
                          updated[i].icon = e.target.value;
                          setSiteData(prev => ({ ...prev, features: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      >
                        {["Award", "GraduationCap", "Trophy", "Activity", "Brain", "Shield", "Users", "MapPin"].map(icon => (
                          <option key={icon} value={icon} className="bg-background">{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Short Description</label>
                    <input
                      type="text"
                      value={f.desc}
                      onChange={(e) => {
                        const updated = [...siteData.features];
                        updated[i].desc = e.target.value;
                        setSiteData(prev => ({ ...prev, features: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "why_archery" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Why Archery Items Manager</h2>
                <p className="text-sm text-muted-foreground">Manage the 8 dynamic advantages displayed in the Why Archery grid.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.why_archery, { icon: "Target", title: "New Benefit" }];
                    setSiteData(prev => ({ ...prev, why_archery: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Item
                </button>
                <button
                  onClick={() => handleSaveWhyArchery(siteData.why_archery)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Items
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {siteData.why_archery.map((w, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-5 rounded-2xl space-y-3 relative group">
                  <button
                    onClick={() => {
                      const updated = siteData.why_archery.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, why_archery: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Benefit Title</label>
                    <input
                      type="text"
                      value={w.title}
                      onChange={(e) => {
                        const updated = [...siteData.why_archery];
                        updated[i].title = e.target.value;
                        setSiteData(prev => ({ ...prev, why_archery: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Icon Key</label>
                    <select
                      value={w.icon}
                      onChange={(e) => {
                        const updated = [...siteData.why_archery];
                        updated[i].icon = e.target.value;
                        setSiteData(prev => ({ ...prev, why_archery: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    >
                      {["Target", "Shield", "Crosshair", "Brain", "Heart", "Users", "Trophy", "Activity"].map(icon => (
                        <option key={icon} value={icon} className="bg-background">{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Academy Programs Manager</h2>
                <p className="text-sm text-muted-foreground">Create, update, or remove archery coaching tracks and programs.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updated = [...siteData.programs, { icon: "Heart", title: "New Program", desc: "Short summary.", details: "Detailed information displayed on expand." }];
                    setSiteData(prev => ({ ...prev, programs: updated }));
                  }}
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" /> Add Program
                </button>
                <button
                  onClick={() => handleSavePrograms(siteData.programs)}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:scale-105 transition-transform text-sm"
                >
                  <Save className="h-4 w-4" /> Save Programs
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {siteData.programs.map((p, i) => (
                <div key={i} className="bg-charcoal/20 border border-border p-6 rounded-2xl space-y-4 relative">
                  <button
                    onClick={() => {
                      const updated = siteData.programs.filter((_, idx) => idx !== i);
                      setSiteData(prev => ({ ...prev, programs: updated }));
                    }}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Program Title</label>
                      <input
                        type="text"
                        value={p.title}
                        onChange={(e) => {
                          const updated = [...siteData.programs];
                          updated[i].title = e.target.value;
                          setSiteData(prev => ({ ...prev, programs: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Icon Key</label>
                      <select
                        value={p.icon}
                        onChange={(e) => {
                          const updated = [...siteData.programs];
                          updated[i].icon = e.target.value;
                          setSiteData(prev => ({ ...prev, programs: updated }));
                        }}
                        className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                      >
                        {["Heart", "Compass", "Trophy", "Sparkles", "Flame", "Award", "Users"].map(icon => (
                          <option key={icon} value={icon} className="bg-background">{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Short Summary</label>
                    <input
                      type="text"
                      value={p.desc}
                      onChange={(e) => {
                        const updated = [...siteData.programs];
                        updated[i].desc = e.target.value;
                        setSiteData(prev => ({ ...prev, programs: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold block">Detailed Description (Shown on Learn More)</label>
                    <textarea
                      value={p.details}
                      rows={3}
                      onChange={(e) => {
                        const updated = [...siteData.programs];
                        updated[i].details = e.target.value;
                        setSiteData(prev => ({ ...prev, programs: updated }));
                      }}
                      className="w-full bg-background/50 border border-border rounded-xl px-3 py-2 text-foreground focus:border-primary outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "enrollments" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border pb-4 gap-3">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Student Enrollments Register</h2>
                <p className="text-sm text-muted-foreground">View and review submitted Student Admission Applications.</p>
              </div>
              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search by name, level, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-charcoal border border-border rounded-xl px-4 py-2.5 text-foreground focus:border-primary outline-none text-sm"
                />
              </div>
            </div>

            {filteredEnrollments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground">
                No matching student enrollments found.
              </div>
            ) : (
              <div className="overflow-x-auto border border-border rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-charcoal/50 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Training Level</th>
                      <th className="p-4">Coaching Option</th>
                      <th className="p-4">Contact Phone</th>
                      <th className="p-4">Submitted At</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {filteredEnrollments.map((e, idx) => (
                      <tr key={idx} className="hover:bg-background/40 transition-colors">
                        <td className="p-4 font-bold text-foreground">{e.student_name}</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">{e.training_level}</span></td>
                        <td className="p-4 text-xs max-w-[200px] truncate">{e.coaching_option}</td>
                        <td className="p-4">{e.primary_contact}</td>
                        <td className="p-4 text-xs text-muted-foreground">{new Date(e.submitted_at).toLocaleDateString()}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedEnrollment(e)}
                            className="inline-flex items-center gap-1 bg-background border border-border hover:border-primary px-3 py-1.5 rounded-lg text-primary text-xs hover:scale-105 transition-transform"
                          >
                            <Eye className="h-3.5 w-3.5" /> Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-4">
              <div>
                <h2 className="font-display text-4xl text-foreground uppercase tracking-wide">Trial Session Bookings</h2>
                <p className="text-sm text-muted-foreground">List of incoming bookings submitted via the Book Trial contact form.</p>
              </div>
              {submissions.contacts.length > 0 && (
                <button
                  onClick={handleClearContacts}
                  className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 text-red-400 font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4" /> Clear All Bookings
                </button>
              )}
            </div>

            {submissions.contacts.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground">
                No trial bookings found in database.
              </div>
            ) : (
              <div className="overflow-x-auto border border-border rounded-2xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-charcoal/50 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      <th className="p-4">Full Name</th>
                      <th className="p-4">Phone Number</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Preferred Center</th>
                      <th className="p-4">Message Context</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {submissions.contacts.map((c, idx) => (
                      <tr key={idx} className="hover:bg-background/40 transition-colors">
                        <td className="p-4 font-bold text-foreground">{c.full_name}</td>
                        <td className="p-4">{c.phone}</td>
                        <td className="p-4 text-xs">{c.email}</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-ember/10 border border-ember/20 text-xs font-semibold text-accent">{c.preferred_center}</span></td>
                        <td className="p-4 text-xs italic max-w-sm truncate">"{c.message}"</td>
                        <td className="p-4 text-xs text-muted-foreground">{new Date(c.submitted_at).toLocaleDateString()}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="inline-flex items-center gap-1 bg-background border border-border hover:border-red-500/35 px-3 py-1.5 rounded-lg text-red-400 text-xs hover:scale-105 transition-transform cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Enrollment details overlay popup */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-card border border-primary/30 rounded-3xl shadow-elegant overflow-hidden max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border bg-charcoal">
              <div>
                <h3 className="font-display text-2xl text-gradient-gold uppercase">Student Profile details</h3>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">Admission Application Record</p>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="p-2 rounded-full hover:bg-border text-muted-foreground hover:text-foreground transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 no-scrollbar text-sm">
              {/* SECTION 1 */}
              <div className="space-y-3">
                <div className="font-semibold text-primary uppercase border-b border-border pb-1 tracking-wider text-xs">Section 1 — Student Details</div>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {selectedEnrollment.photo && (
                    <div className="shrink-0 mx-auto md:mx-0">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 text-center md:text-left">Student Photo</div>
                      <img src={selectedEnrollment.photo} alt={selectedEnrollment.student_name} className="h-28 w-28 object-cover rounded-2xl border-2 border-primary/40 shadow-elegant" />
                    </div>
                  )}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Full Name</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.student_name}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Date of Birth</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.dob || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Age</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.age || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Gender</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.gender || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Blood Group</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.blood_group || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Aadhar No</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.aadhar_no || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Nationality</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.nationality || "—"}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">School / Institution</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.school || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Class / Grade</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.grade || "—"}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Residential Address</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.residential_address || "—"}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">City &amp; PIN Code</div>
                      <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.city_pin || "—"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="space-y-3">
                <div className="font-semibold text-primary uppercase border-b border-border pb-1 tracking-wider text-xs">Section 2 — Parent / Guardian details</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Father's Name</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.father_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Father's Occupation</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.father_occupation || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Mother's Name</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.mother_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Mother's Occupation</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.mother_occupation || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Primary Contact No.</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.primary_contact || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Alternate Contact No.</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.alternate_contact || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Email Address</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.email_address || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Relationship to Student</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.relationship || "—"}</div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="space-y-3">
                <div className="font-semibold text-primary uppercase border-b border-border pb-1 tracking-wider text-xs">Section 3 — Program Selection</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Training Level</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.training_level || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Coaching Engagement Option</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.coaching_option || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Date of Joining</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.date_of_joining || "—"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Optional Add-On Services Selected</div>
                    <div className="font-bold text-foreground mt-1 max-w-xl leading-relaxed bg-background/50 p-2.5 rounded-xl border border-border">
                      {selectedEnrollment.add_ons || "None selected."}
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDICAL */}
              <div className="space-y-3">
                <div className="font-semibold text-primary uppercase border-b border-border pb-1 tracking-wider text-xs">Medical &amp; Health details</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Known Medical Conditions?</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.medical_conditions_exist || "No"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Medical Specifications (If Yes)</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.medical_details || "—"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Known Allergies</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.allergies || "—"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Medications</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.medications || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Emergency Contact Person</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.emergency_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Emergency Phone Number</div>
                    <div className="font-bold text-foreground mt-0.5">{selectedEnrollment.emergency_phone || "—"}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border bg-charcoal/30 flex justify-end gap-3">
              <button
                onClick={() => handleDownloadPDF(selectedEnrollment)}
                className="bg-charcoal border border-primary text-primary font-bold px-6 py-2 rounded-xl hover:scale-105 transition-transform cursor-pointer inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" /> Download PDF
              </button>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="bg-primary text-background font-bold px-6 py-2 rounded-xl hover:scale-105 transition-transform cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper to convert values to integer
function int(val: any): number {
  return parseInt(val, 10);
}
