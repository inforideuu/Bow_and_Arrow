import { useState } from "react";
import { X, Send, CheckCircle2, AlertCircle, Camera } from "lucide-react";
import { API_URL } from "../../lib/utils";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ isOpen, onClose }: EnrollmentModalProps) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    student_name: "",
    dob: "",
    age: "",
    gender: "",
    blood_group: "",
    nationality: "",
    school: "",
    grade: "",
    residential_address: "",
    city_pin: "",
    aadhar_no: "",

    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    primary_contact: "",
    alternate_contact: "",
    email_address: "",
    relationship: "",

    training_level: "Beginner",
    coaching_option: "Option 1 — Monthly Salary Model",
    add_ons: [] as string[],
    date_of_joining: "",

    medical_conditions_exist: "No",
    medical_details: "",
    allergies: "",
    medications: "",
    emergency_name: "",
    emergency_phone: "",
    photo: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/png") {
      setErrorMsg("Only PNG format is allowed.");
      setStatus("error");
      return;
    }

    if (file.size > 1024 * 1024) {
      setErrorMsg("Image size must be up to 1MB.");
      setStatus("error");
      return;
    }

    if (status === "error") {
      setStatus("idle");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.student_name || !formData.primary_contact) {
      setErrorMsg("Student Name and Primary Contact Number are required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(`${API_URL}/api/enroll/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const err = await response.json();
        setErrorMsg(err.message || "Failed to submit application.");
        setStatus("error");
      }
    } catch (e) {
      setErrorMsg("Failed to connect to backend server.");
      setStatus("error");
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-primary/30 rounded-3xl shadow-elegant overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-charcoal">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl text-gradient-gold uppercase">Student Enrollment Form</h2>
            <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Bow &amp; Arrow Archery Academy</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-border text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
              <h3 className="font-display text-3xl uppercase text-foreground">Application Submitted!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for enrolling at Bow &amp; Arrow Academy. Our team will review your application and contact you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-full bg-ember text-accent-foreground font-bold hover:glow-ember transition-all"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* SECTION 1 — STUDENT INFORMATION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
                  <h3 className="font-display text-lg text-primary tracking-wider uppercase">Section 1 — Student Information</h3>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Full Name of Student *</label>
                    <input
                      type="text"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Date of Birth</label>
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="DD/MM/YYYY"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Age"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    >
                      <option value="" className="bg-background">Select Gender</option>
                      <option value="Male" className="bg-background">Male</option>
                      <option value="Female" className="bg-background">Female</option>
                      <option value="Other" className="bg-background">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Blood Group</label>
                    <input
                      type="text"
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      placeholder="e.g. O+ve"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="Nationality"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Aadhar No</label>
                    <input
                      type="text"
                      name="aadhar_no"
                      value={formData.aadhar_no}
                      onChange={handleChange}
                      placeholder="Enter 12-digit Aadhar No"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">School / Institution</label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder="School name"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Class / Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="Grade"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Residential Address</label>
                    <input
                      type="text"
                      name="residential_address"
                      value={formData.residential_address}
                      onChange={handleChange}
                      placeholder="House number, Street name"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">City &amp; PIN Code</label>
                    <input
                      type="text"
                      name="city_pin"
                      value={formData.city_pin}
                      onChange={handleChange}
                      placeholder="City - PIN"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2 md:col-span-3">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground block">Student Photo (PNG format only, max 1MB)</label>
                    {formData.photo ? (
                      <div className="mt-2 flex items-center gap-4 bg-background/30 p-3 rounded-xl border border-border">
                        <img src={formData.photo} alt="Student Preview" className="h-16 w-16 object-cover rounded-lg border border-primary/30" />
                        <div className="flex-1">
                          <span className="text-xs text-muted-foreground block">Image selected successfully.</span>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, photo: "" }))}
                            className="mt-1 text-xs text-red-400 hover:text-red-300 font-semibold"
                          >
                            Remove Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1.5 relative border border-dashed border-border hover:border-primary/50 transition-colors rounded-xl p-6 flex flex-col items-center justify-center bg-background/20 cursor-pointer">
                        <input
                          type="file"
                          accept="image/png"
                          onChange={handlePhotoChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">Click to upload or drag PNG file here</span>
                        <span className="text-[10px] text-muted-foreground/60 mt-1">Maximum file size: 1MB</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2 — PARENT / GUARDIAN INFORMATION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
                  <h3 className="font-display text-lg text-primary tracking-wider uppercase">Section 2 — Parent / Guardian Information</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Father's Name</label>
                    <input
                      type="text"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      placeholder="Father's name"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Father's Occupation</label>
                    <input
                      type="text"
                      name="father_occupation"
                      value={formData.father_occupation}
                      onChange={handleChange}
                      placeholder="Occupation"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Mother's Name</label>
                    <input
                      type="text"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      placeholder="Mother's name"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Mother's Occupation</label>
                    <input
                      type="text"
                      name="mother_occupation"
                      value={formData.mother_occupation}
                      onChange={handleChange}
                      placeholder="Occupation"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Primary Contact Number *</label>
                    <input
                      type="text"
                      name="primary_contact"
                      value={formData.primary_contact}
                      onChange={handleChange}
                      placeholder="Primary contact"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Alternate Contact Number</label>
                    <input
                      type="text"
                      name="alternate_contact"
                      value={formData.alternate_contact}
                      onChange={handleChange}
                      placeholder="Alternate contact"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      name="email_address"
                      value={formData.email_address}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Relationship to Student</label>
                    <div className="mt-3 flex gap-6">
                      {["Father", "Mother", "Guardian"].map((rel) => (
                        <label key={rel} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                          <input
                            type="radio"
                            name="relationship"
                            value={rel}
                            checked={formData.relationship === rel}
                            onChange={handleChange}
                            className="h-4 w-4 accent-primary"
                          />
                          {rel}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 — PROGRAM SELECTION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
                  <h3 className="font-display text-lg text-primary tracking-wider uppercase">Section 3 — Program Selection</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">Training Level</label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {[
                        { level: "Beginner", label: "Beginner", desc: "Introduction to Archery | 36 Hours" },
                        { level: "Intermediate", label: "Intermediate", desc: "Skill Development | 60 Hours" },
                        { level: "Advanced", label: "Advanced", desc: "Competitive Archery | 90 Hours" },
                      ].map((item) => (
                        <label
                          key={item.level}
                          className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${formData.training_level === item.level
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background/20"
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="training_level"
                              value={item.level}
                              checked={formData.training_level === item.level}
                              onChange={handleChange}
                              className="h-4 w-4 accent-primary"
                            />
                            <span className={`font-bold text-foreground uppercase tracking-wider ${
                              item.label === "Intermediate" ? "text-xs" : "text-sm"
                            }`}>
                              {item.label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-2 block">{item.desc}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground block mb-2">Date of Joining</label>
                    <div className="max-w-xs">
                      <input
                        type="date"
                        name="date_of_joining"
                        value={formData.date_of_joining}
                        onChange={handleChange}
                        className="w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* MEDICAL & HEALTH INFORMATION */}
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
                  <h3 className="font-display text-lg text-primary tracking-wider uppercase">Medical &amp; Health Information</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      Does the student have any known medical conditions?
                    </label>
                    <div className="mt-2 flex gap-4">
                      {["No", "Yes"].map((val) => (
                        <label key={val} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                          <input
                            type="radio"
                            name="medical_conditions_exist"
                            value={val}
                            checked={formData.medical_conditions_exist === val}
                            onChange={handleChange}
                            className="h-4 w-4 accent-primary"
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.medical_conditions_exist === "Yes" && (
                    <div className="sm:col-span-2">
                      <label className="text-[11px] uppercase tracking-widest text-muted-foreground">If Yes, please specify</label>
                      <textarea
                        name="medical_details"
                        value={formData.medical_details}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Describe medical conditions..."
                        className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary resize-none"
                      />
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Any known allergies</label>
                    <input
                      type="text"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Describe allergies if any"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Current medications (if any)</label>
                    <input
                      type="text"
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      placeholder="Medications"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergency_name"
                      value={formData.emergency_name}
                      onChange={handleChange}
                      placeholder="Emergency contact person"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Emergency Contact Number</label>
                    <input
                      type="text"
                      name="emergency_phone"
                      value={formData.emergency_phone}
                      onChange={handleChange}
                      placeholder="Emergency phone"
                      className="mt-1.5 w-full bg-background/40 border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-border">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-ember text-accent-foreground font-bold hover:glow-ember transition-all disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Application <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 rounded-full border border-border hover:bg-border text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
