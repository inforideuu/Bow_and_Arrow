from django.db import models

class PageContent(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()

    def __str__(self):
        return f"{self.key}: {self.value[:30]}..."

class Center(models.Model):
    name = models.CharField(max_length=100)
    desc = models.CharField(max_length=255)
    map_url = models.TextField(blank=True, default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8524673327663!2d80.1472853!3d13.0450201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526131f496350f%3A0xc07a82be1e2f75d3!2sPorur%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000")
    google_maps_url = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name

class Achievement(models.Model):
    icon = models.CharField(max_length=50)  # e.g., "Users", "Trophy"
    value = models.IntegerField()
    suffix = models.CharField(max_length=10, blank=True)
    label = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.label} ({self.value}{self.suffix})"

class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    quote = models.TextField()
    img = models.CharField(max_length=100)  # Name of imported asset or filename

    def __str__(self):
        return f"{self.name} - {self.role}"

class ContactMessage(models.Model):
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    preferred_center = models.CharField(max_length=100)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Contact from {self.full_name} on {self.submitted_at.strftime('%Y-%m-%d %H:%M')}"

class Enrollment(models.Model):
    # Student Information
    student_name = models.CharField(max_length=100)
    dob = models.CharField(max_length=20, null=True, blank=True)  # Store as string for easy front-end mapping
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    blood_group = models.CharField(max_length=10, null=True, blank=True)
    nationality = models.CharField(max_length=50, null=True, blank=True)
    school = models.CharField(max_length=100, null=True, blank=True)
    grade = models.CharField(max_length=20, null=True, blank=True)
    residential_address = models.TextField(null=True, blank=True)
    city_pin = models.CharField(max_length=50, null=True, blank=True)

    # Parent/Guardian Information
    father_name = models.CharField(max_length=100, null=True, blank=True)
    father_occupation = models.CharField(max_length=100, null=True, blank=True)
    mother_name = models.CharField(max_length=100, null=True, blank=True)
    mother_occupation = models.CharField(max_length=100, null=True, blank=True)
    primary_contact = models.CharField(max_length=20, null=True, blank=True)
    alternate_contact = models.CharField(max_length=20, null=True, blank=True)
    email_address = models.EmailField(null=True, blank=True)
    relationship = models.CharField(max_length=20, null=True, blank=True)

    # Program Selection
    training_level = models.CharField(max_length=50, null=True, blank=True)
    coaching_option = models.CharField(max_length=100, null=True, blank=True)
    add_ons = models.TextField(null=True, blank=True)  # Store list as comma separated values
    date_of_joining = models.CharField(max_length=20, null=True, blank=True)  # Store as string/date format
    aadhar_no = models.CharField(max_length=20, null=True, blank=True)
    photo = models.TextField(null=True, blank=True)


    # Medical & Health Information
    medical_conditions_exist = models.CharField(max_length=10, default="No")
    medical_details = models.TextField(null=True, blank=True)
    allergies = models.TextField(null=True, blank=True)
    medications = models.TextField(null=True, blank=True)
    emergency_name = models.CharField(max_length=100, null=True, blank=True)
    emergency_phone = models.CharField(max_length=20, null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enrollment: {self.student_name} ({self.training_level}) - {self.submitted_at.strftime('%Y-%m-%d')}"

class GalleryImage(models.Model):
    src = models.TextField()  # Local path, URL, or Base64 content
    cat = models.CharField(max_length=100)  # e.g., "Training Sessions"
    span = models.CharField(max_length=50, blank=True, default="")  # row-span-2, col-span-2, etc.

    def __str__(self):
        return f"Gallery: {self.cat} ({self.src[:30]})"


class StandardBatch(models.Model):
    name = models.CharField(max_length=150)  # e.g., "1 TO 2 STANDARD BATCH"
    age_group = models.CharField(max_length=100)  # e.g., "Age 6–8 Years"
    objectives = models.TextField()  # JSON-encoded string or newline-separated values
    weekly_plan = models.TextField()  # JSON-encoded string or newline-separated values
    assessment = models.TextField()  # JSON-encoded string or newline-separated values

    def __str__(self):
        return self.name


class MonthlyAssessment(models.Model):
    category = models.CharField(max_length=150)  # e.g., "Attendance", "Discipline", "Fitness"
    val_1_2 = models.CharField(max_length=100)  # e.g., "✔", "Basic"
    val_3_4 = models.CharField(max_length=100)
    val_5_6 = models.CharField(max_length=100)
    val_7_8 = models.CharField(max_length=100)

    def __str__(self):
        return self.category


class FeatureItem(models.Model):
    icon = models.CharField(max_length=50)  # e.g. "Award", "GraduationCap"
    title = models.CharField(max_length=100)
    desc = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class WhyArcheryItem(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class ProgramItem(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    desc = models.CharField(max_length=255)
    details = models.TextField()

    def __str__(self):
        return self.title
