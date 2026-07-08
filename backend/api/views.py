from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import PageContent, Center, Achievement, Testimonial, ContactMessage, Enrollment, GalleryImage, StandardBatch, MonthlyAssessment, FeatureItem, WhyArcheryItem, ProgramItem
import json

def get_site_data(request):
    # Auto-seed initial database content if PageContent is empty
    if not PageContent.objects.exists():
        PageContent.objects.create(key="site_title", value="Bow & Arrow Archery Academy | Premier Archery Coaching in Chennai")
        PageContent.objects.create(key="meta_description", value="Chennai's leading professional archery academy since 2013. 100+ students trained, 7 centres, certified coaching for beginners to competition athletes.")
        PageContent.objects.create(key="hero_title_1", value="Master the")
        PageContent.objects.create(key="hero_title_2", value="Art of Archery")
        PageContent.objects.create(key="hero_description_line_1", value="Professional archery coaching for students, schools and competitive athletes across Chennai.")
        PageContent.objects.create(key="hero_description_line_2", value="Bow & Arrow Archery Academy has trained 100+ students since 2011 through structured coaching, certified training systems and competition-focused athlete development.")
        PageContent.objects.create(key="contact_phone", value="8668054120 / 9840754120")
        PageContent.objects.create(key="contact_email", value="coach2017@yahoo.com")
        PageContent.objects.create(key="contact_address", value="Chennai, Tamil Nadu")

    if not Center.objects.exists():
        Center.objects.create(name="Ambattur", desc="Youth development & school training.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.673891463138!2d80.1557731!3d13.1116238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5262590209dfa9%3A0xad526a4220b33b93!2sAmbattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Ambattur+Chennai")
        Center.objects.create(name="Porur", desc="Beginner to intermediate training batches.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8524673327663!2d80.1472853!3d13.0450201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526131f496350f%3A0xc07a82be1e2f75d3!2sPorur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Porur+Chennai")
        Center.objects.create(name="Poonamallee", desc="Family and weekend coaching programs.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7432074351314!2d80.0906233!3d13.0519159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260f854bcfb79%3A0x67db20b665fa7cf!2sPoonamallee%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Poonamallee+Chennai")
        Center.objects.create(name="Patabiram", desc="Standard target practice & archery range.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.031548239049!2d80.0573934!3d13.1207869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528a2b53f6630f%3A0x29efefc207b068a8!2sPattabiram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Pattabiram+Chennai")
        Center.objects.create(name="Korattur", desc="Advanced coaching & competitive track.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.8079093859664!2d80.1804245!3d13.1030999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264057e05e5df%3A0x1d46be69a84f3c09!2sKorattur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Korattur+Chennai")
        Center.objects.create(name="Vel tech college", desc="Campus-based competition training.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.095400267676!2d80.1064875!3d13.1884485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52865910d5403b%3A0x8673f4e8b3941785!2sVel%20Tech%20Rangarajan%20Dr.Sagunthala%20R%26D%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Vel+Tech+University+Chennai")
        Center.objects.create(name="Sevvapet", desc="Outdoor field archery training centre.", map_url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.4447470659613!2d79.9490124!3d13.1668822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5280b06b9b3297%3A0xbbfd118bb9d57a2e!2sSevvapet%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000", google_maps_url="https://www.google.com/maps/search/?api=1&query=Sevvapet+Chennai")

    if not Achievement.objects.exists():
        Achievement.objects.create(icon="Users", value=100, suffix="+", label="Students")
        Achievement.objects.create(icon="Calendar", value=200, suffix="+", label="Training Batches")
        Achievement.objects.create(icon="Award", value=10, suffix="+", label="Years of Excellence")
        Achievement.objects.create(icon="MapPin", value=7, suffix="", label="Training Centres")
        Achievement.objects.create(icon="GraduationCap", value=8, suffix="+", label="School Collaborations")
        Achievement.objects.create(icon="Medal", value=50, suffix="+", label="District Champions")
        Achievement.objects.create(icon="Trophy", value=20, suffix="+", label="State-Level Winners")

    if not Testimonial.objects.exists():
        Testimonial.objects.create(
            name="Priya Ramesh",
            role="Parent, Porur",
            quote="The discipline and confidence my son gained through this academy is incredible.",
            img="g4"
        )
        Testimonial.objects.create(
            name="Karthik V.",
            role="District Competitor",
            quote="I started as a beginner and now confidently compete in district tournaments.",
            img="g3"
        )
        Testimonial.objects.create(
            name="Anitha S.",
            role="School Coordinator",
            quote="Professional coaching and excellent sports culture for students.",
            img="g1"
        )

    if not GalleryImage.objects.exists():
        GalleryImage.objects.create(src="g1", cat="Training Sessions", span="row-span-2")
        GalleryImage.objects.create(src="g2", cat="Achievements", span="")
        GalleryImage.objects.create(src="g3", cat="Our Team", span="")
        GalleryImage.objects.create(src="g4", cat="Precision", span="row-span-2")
        GalleryImage.objects.create(src="g5", cat="Certifications", span="")
        GalleryImage.objects.create(src="g6", cat="National Games", span="")

    if not StandardBatch.objects.exists():
        StandardBatch.objects.create(
            name="1 TO 2 STANDARD BATCH",
            age_group="Age 6–8 Years",
            objectives="Develop interest in archery\nImprove hand-eye coordination\nLearn basic movement and posture\nIntroduce safe handling of training equipment\nBuild confidence through fun-based activities",
            weekly_plan="Session 1:\n- Warm-up activities and stretching\n- Balance and coordination exercises\n- Introduction to archery equipment\n- Safety instructions and discipline practices\n\nSession 2:\n- Basic stance and posture training\n- Bow holding techniques\n- Aiming basics using short-distance targets\n- Guided shooting practice\n\nSession 3:\n- Fun target activities\n- Team participation exercises\n- Simple shooting games and coordination drills",
            assessment="Proper posture and balance\nUnderstanding of safety rules\nParticipation and discipline\nCoordination improvement\nConfidence during shooting activities"
        )
        StandardBatch.objects.create(
            name="3 TO 4 STANDARD BATCH",
            age_group="Age 8–10 Years",
            objectives="Learn archery fundamentals\nImprove aiming and release techniques\nBuild shooting confidence\nIntroduce target scoring basics",
            weekly_plan="Session 1:\n- Dynamic warm-up exercises\n- Stance correction and body alignment\n- Target aiming practice\n- Short-distance shooting drills\n\nSession 2:\n- Controlled release techniques\n- Shooting consistency drills\n- Coordination and flexibility exercises\n- Safety reinforcement practices\n\nSession 3:\n- Target scoring activities\n- Pair and team practice sessions\n- Fun competitive shooting games",
            assessment="Shooting posture improvement\nBasic target accuracy\nConsistency in shooting technique\nDiscipline and focus\nUnderstanding of scoring basics"
        )
        StandardBatch.objects.create(
            name="5 TO 6 STANDARD BATCH",
            age_group="Age 10–12 Years",
            objectives="Develop intermediate archery skills\nImprove shooting consistency and focus\nBuild physical fitness and endurance\nIntroduce performance awareness",
            weekly_plan="Session 1:\n- Warm-up and flexibility training\n- Advanced aiming techniques\n- Distance shooting practice\n- Breathing and focus exercises\n\nSession 2:\n- Shooting correction drills\n- Balance and posture improvement\n- Strength and coordination exercises\n- Scoring practice sessions\n\nSession 3:\n- Practice competition rounds\n- Team strategy activities\n- Performance observation and correction",
            assessment="Shooting accuracy and consistency\nTechnical skill improvement\nMental focus and discipline\nPhysical coordination\nMatch awareness and scoring performance"
        )
        StandardBatch.objects.create(
            name="7 TO 8 STANDARD BATCH",
            age_group="Age 12–14 Years",
            objectives="Develop advanced archery techniques\nPrepare students for competitions\nImprove mental toughness and discipline\nEnhance leadership and teamwork qualities",
            weekly_plan="Session 1:\n- Strength and conditioning exercises\n- Precision shooting drills\n- Long-distance target practice\n- Advanced posture correction\n\nSession 2:\n- Pressure shooting scenarios\n- Target grouping practice\n- Performance analysis sessions\n- Reaction and focus drills\n\nSession 3:\n- Practice tournament rounds\n- Tactical shooting activities\n- Leadership and teamwork sessions\n- Performance review and feedback",
            assessment="Precision and target grouping\nShooting consistency under pressure\nLeadership and teamwork\nMental focus and confidence\nCompetitive readiness"
        )

    if not MonthlyAssessment.objects.exists():
        MonthlyAssessment.objects.create(category="Attendance", val_1_2="✔", val_3_4="✔", val_5_6="✔", val_7_8="✔")
        MonthlyAssessment.objects.create(category="Discipline", val_1_2="✔", val_3_4="✔", val_5_6="✔", val_7_8="✔")
        MonthlyAssessment.objects.create(category="Fitness", val_1_2="Basic", val_3_4="Moderate", val_5_6="Good", val_7_8="Advanced")
        MonthlyAssessment.objects.create(category="Shooting Technique", val_1_2="Intro", val_3_4="Basic", val_5_6="Intermediate", val_7_8="Advanced")
        MonthlyAssessment.objects.create(category="Accuracy", val_1_2="Intro", val_3_4="Basic", val_5_6="Good", val_7_8="Advanced")
        MonthlyAssessment.objects.create(category="Coordination", val_1_2="Basic", val_3_4="Moderate", val_5_6="Good", val_7_8="Advanced")
        MonthlyAssessment.objects.create(category="Match Awareness", val_1_2="Low", val_3_4="Basic", val_5_6="Good", val_7_8="Strong")

    if not FeatureItem.objects.exists():
        FeatureItem.objects.create(icon="Award", title="Certified Coaching", desc="Nationally accredited coaches with proven track records.")
        FeatureItem.objects.create(icon="GraduationCap", title="Structured Curriculum", desc="Three-tier program from beginner to advanced mastery.")
        FeatureItem.objects.create(icon="Trophy", title="Tournament Preparation", desc="Competition-grade training and mock tournament drills.")
        FeatureItem.objects.create(icon="Activity", title="Athlete Development", desc="Personalised plans for posture, strength and precision.")
        FeatureItem.objects.create(icon="Brain", title="Mental Conditioning", desc="Focus, breathing and visualisation techniques.")
        FeatureItem.objects.create(icon="Shield", title="Safety-Focused Training", desc="Strict protocols, premium equipment and supervision.")

    if not WhyArcheryItem.objects.exists():
        WhyArcheryItem.objects.create(icon="Target", title="Improves Concentration")
        WhyArcheryItem.objects.create(icon="Shield", title="Builds Discipline")
        WhyArcheryItem.objects.create(icon="Crosshair", title="Hand-Eye Coordination")
        WhyArcheryItem.objects.create(icon="Brain", title="Mental Toughness")
        WhyArcheryItem.objects.create(icon="Heart", title="Low Injury Risk")
        WhyArcheryItem.objects.create(icon="Users", title="All-Age Friendly")
        WhyArcheryItem.objects.create(icon="Trophy", title="Competitive Pathways")
        WhyArcheryItem.objects.create(icon="Activity", title="Mind & Body Balance")

    if not ProgramItem.objects.exists():
        ProgramItem.objects.create(icon="Heart", title="Family Archery", desc="Bonding sessions for parents & children.", details="Our Family Archery program offers a unique opportunity for parents and children to learn together. All equipment is provided, and our coaches ensure a safe, fun, and supportive environment for all ages.")
        ProgramItem.objects.create(icon="Compass", title="Field Archery", desc="Outdoor courses through varied terrain.", details="Simulates hunting or outdoor scenarios by setting targets at various distances and elevations along a scenic nature trail. Learn to estimate distances, adjust for wind, and maintain balance on uneven ground.")
        ProgramItem.objects.create(icon="Trophy", title="Competition Training", desc="Elite-track athlete development.", details="Designed for competitive archers aiming for district, state, or national tournaments. Features intensive physical conditioning, posture refinement drills, advanced equipment tuning, and psychological simulation.")
        ProgramItem.objects.create(icon="Sparkles", title="Workshops & Seminars", desc="Skill clinics with guest experts.", details="Special seminars led by national coaches and international archery experts. Covers recurve and compound bow mechanics, advanced visualization techniques, breath control, and tournament strategy.")
        ProgramItem.objects.create(icon="Flame", title="Intensive Camps", desc="Multi-day immersion programmes.", details="High-intensity multi-day training camps hosted during breaks. Immerse yourself in archery practice with daily target routines, video analysis sessions, biomechanics correction, and fun mock tournaments.")

    # Fetch data
    content_dict = {pc.key: pc.value for pc in PageContent.objects.all()}
    centers = list(Center.objects.values('id', 'name', 'desc', 'map_url', 'google_maps_url'))
    achievements = list(Achievement.objects.values('icon', 'value', 'suffix', 'label'))
    testimonials = list(Testimonial.objects.values('name', 'role', 'quote', 'img'))
    gallery = list(GalleryImage.objects.values('id', 'src', 'cat', 'span'))
    batches = list(StandardBatch.objects.values('id', 'name', 'age_group', 'objectives', 'weekly_plan', 'assessment'))
    assessments = list(MonthlyAssessment.objects.values('id', 'category', 'val_1_2', 'val_3_4', 'val_5_6', 'val_7_8'))
    features = list(FeatureItem.objects.values('id', 'icon', 'title', 'desc'))
    why_archery = list(WhyArcheryItem.objects.values('id', 'icon', 'title'))
    programs = list(ProgramItem.objects.values('id', 'icon', 'title', 'desc', 'details'))

    return JsonResponse({
        'content': content_dict,
        'centers': centers,
        'achievements': achievements,
        'testimonials': testimonials,
        'gallery': gallery,
        'batches': batches,
        'assessments': assessments,
        'features': features,
        'why_archery': why_archery,
        'programs': programs
    }, safe=False)

@csrf_exempt
def enroll_student(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            student_name = data.get('student_name', '').strip()
            dob = data.get('dob', '').strip()
            primary_contact = data.get('primary_contact', '').strip()
            
            if student_name:
                duplicate = False
                if dob and Enrollment.objects.filter(student_name__iexact=student_name, dob=dob).exists():
                    duplicate = True
                elif primary_contact and Enrollment.objects.filter(student_name__iexact=student_name, primary_contact=primary_contact).exists():
                    duplicate = True
                
                if duplicate:
                    return JsonResponse({
                        'status': 'error', 
                        'message': 'This student is already enrolled. Please contact the academy directly for program changes.'
                    }, status=400)

            enrollment = Enrollment.objects.create(
                student_name=data.get('student_name', ''),
                dob=data.get('dob', ''),
                age=int(data.get('age')) if data.get('age') else None,
                gender=data.get('gender', ''),
                blood_group=data.get('blood_group', ''),
                nationality=data.get('nationality', ''),
                school=data.get('school', ''),
                grade=data.get('grade', ''),
                residential_address=data.get('residential_address', ''),
                city_pin=data.get('city_pin', ''),
                
                father_name=data.get('father_name', ''),
                father_occupation=data.get('father_occupation', ''),
                mother_name=data.get('mother_name', ''),
                mother_occupation=data.get('mother_occupation', ''),
                primary_contact=data.get('primary_contact', ''),
                alternate_contact=data.get('alternate_contact', ''),
                email_address=data.get('email_address', ''),
                relationship=data.get('relationship', ''),
                
                training_level=data.get('training_level', ''),
                coaching_option=data.get('coaching_option', ''),
                add_ons=", ".join(data.get('add_ons', [])) if isinstance(data.get('add_ons'), list) else data.get('add_ons', ''),
                date_of_joining=data.get('date_of_joining', ''),
                aadhar_no=data.get('aadhar_no', ''),
                photo=data.get('photo', ''),
                
                medical_conditions_exist=data.get('medical_conditions_exist', 'No'),
                medical_details=data.get('medical_details', ''),
                allergies=data.get('allergies', ''),
                medications=data.get('medications', ''),
                emergency_name=data.get('emergency_name', ''),
                emergency_phone=data.get('emergency_phone', '')
            )
            return JsonResponse({'status': 'success', 'id': enrollment.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def contact_submit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            msg = ContactMessage.objects.create(
                full_name=data.get('full_name', ''),
                phone=data.get('phone', ''),
                email=data.get('email', ''),
                preferred_center=data.get('preferred_center', ''),
                message=data.get('message', '')
            )
            
            # Send notification email to coach
            subject = f"New Free Trial Booking - {msg.full_name}"
            body = (
                f"Hello Coach,\n\n"
                f"A new student has booked a free trial session:\n\n"
                f"Name: {msg.full_name}\n"
                f"Phone: {msg.phone}\n"
                f"Email: {msg.email}\n"
                f"Preferred Training Centre: {msg.preferred_center}\n"
                f"Message: {msg.message}\n\n"
                f"Regards,\n"
                f"Admission Portal System"
            )
            try:
                from django.core.mail import EmailMessage
                from_email = msg.email if msg.email else 'noreply@arrowcraft.com'
                email_msg = EmailMessage(
                    subject=subject,
                    body=body,
                    from_email=from_email,
                    to=['coach2017@yahoo.com'],
                    reply_to=[from_email]
                )
                email_msg.send(fail_silently=True)
            except Exception as mail_err:
                print("Failed to send email alert:", mail_err)

            return JsonResponse({'status': 'success', 'id': msg.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def get_admin_submissions(request):
    enrollments = list(Enrollment.objects.values().order_by('-submitted_at'))
    contacts = list(ContactMessage.objects.values().order_by('-submitted_at'))
    return JsonResponse({
        'enrollments': enrollments,
        'contacts': contacts
    })

@csrf_exempt
def update_site_content(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            for key, value in data.items():
                PageContent.objects.update_or_create(key=key, defaults={'value': value})
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def update_centers(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Center.objects.all().delete()
            for c in data:
                Center.objects.create(name=c.get('name'), desc=c.get('desc'), map_url=c.get('map_url', ''), google_maps_url=c.get('google_maps_url', ''))
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def update_achievements(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Achievement.objects.all().delete()
            for a in data:
                Achievement.objects.create(
                    icon=a.get('icon'), 
                    value=int(a.get('value')), 
                    suffix=a.get('suffix', ''), 
                    label=a.get('label')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def update_testimonials(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Testimonial.objects.all().delete()
            for t in data:
                Testimonial.objects.create(
                    name=t.get('name'),
                    role=t.get('role'),
                    quote=t.get('quote'),
                    img=t.get('img')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_gallery_images(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            GalleryImage.objects.all().delete()
            for img in data:
                GalleryImage.objects.create(
                    src=img.get('src'),
                    cat=img.get('cat', ''),
                    span=img.get('span', '')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_batches(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            StandardBatch.objects.all().delete()
            for b in data:
                StandardBatch.objects.create(
                    name=b.get('name'),
                    age_group=b.get('age_group', ''),
                    objectives=b.get('objectives', ''),
                    weekly_plan=b.get('weekly_plan', ''),
                    assessment=b.get('assessment', '')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_assessments(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            MonthlyAssessment.objects.all().delete()
            for ma in data:
                MonthlyAssessment.objects.create(
                    category=ma.get('category'),
                    val_1_2=ma.get('val_1_2', ''),
                    val_3_4=ma.get('val_3_4', ''),
                    val_5_6=ma.get('val_5_6', ''),
                    val_7_8=ma.get('val_7_8', '')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_features(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            FeatureItem.objects.all().delete()
            for f in data:
                FeatureItem.objects.create(
                    icon=f.get('icon'),
                    title=f.get('title'),
                    desc=f.get('desc')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_why_archery(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            WhyArcheryItem.objects.all().delete()
            for w in data:
                WhyArcheryItem.objects.create(
                    icon=w.get('icon'),
                    title=w.get('title')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def update_programs(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            ProgramItem.objects.all().delete()
            for p in data:
                ProgramItem.objects.create(
                    icon=p.get('icon'),
                    title=p.get('title'),
                    desc=p.get('desc'),
                    details=p.get('details', '')
                )
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST method is allowed'}, status=405)


@csrf_exempt
def delete_contact(request, pk):
    if request.method == 'DELETE' or request.method == 'POST':
        try:
            msg = ContactMessage.objects.get(pk=pk)
            msg.delete()
            return JsonResponse({'status': 'success'})
        except ContactMessage.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Record not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)


@csrf_exempt
def clear_contacts(request):
    if request.method == 'POST' or request.method == 'DELETE':
        try:
            ContactMessage.objects.all().delete()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_enrollment(request, pk):
    if request.method == 'DELETE' or request.method == 'POST':
        try:
            enrollment = Enrollment.objects.get(pk=pk)
            enrollment.delete()
            return JsonResponse({'status': 'success'})
        except Enrollment.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Record not found'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Method not allowed'}, status=405)
