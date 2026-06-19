from django.contrib import admin
from .models import PageContent, Center, Achievement, Testimonial, ContactMessage, Enrollment

@admin.register(PageContent)
class PageContentAdmin(admin.ModelAdmin):
    list_display = ('key', 'value_preview')
    search_fields = ('key', 'value')

    def value_preview(self, obj):
        return obj.value[:50] + "..." if len(obj.value) > 50 else obj.value
    value_preview.short_description = "Value"

@admin.register(Center)
class CenterAdmin(admin.ModelAdmin):
    list_display = ('name', 'desc')
    search_fields = ('name',)

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'suffix', 'icon')
    search_fields = ('label',)

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'quote_preview', 'img')
    search_fields = ('name', 'role')

    def quote_preview(self, obj):
        return obj.quote[:50] + "..." if len(obj.quote) > 50 else obj.quote
    quote_preview.short_description = "Quote"

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'email', 'preferred_center', 'submitted_at')
    list_filter = ('preferred_center', 'submitted_at')
    search_fields = ('full_name', 'email', 'phone')
    readonly_fields = ('submitted_at',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student_name', 'training_level', 'coaching_option', 'primary_contact', 'submitted_at')
    list_filter = ('training_level', 'coaching_option', 'submitted_at')
    search_fields = ('student_name', 'primary_contact', 'email_address', 'father_name', 'mother_name')
    readonly_fields = ('submitted_at',)
    fieldsets = (
        ('Student Info', {
            'fields': ('student_name', 'dob', 'age', 'gender', 'blood_group', 'nationality', 'school', 'grade', 'residential_address', 'city_pin')
        }),
        ('Parent Info', {
            'fields': ('father_name', 'father_occupation', 'mother_name', 'mother_occupation', 'primary_contact', 'alternate_contact', 'email_address', 'relationship')
        }),
        ('Program details', {
            'fields': ('training_level', 'coaching_option', 'add_ons')
        }),
        ('Medical / Health Details', {
            'fields': ('medical_conditions_exist', 'medical_details', 'allergies', 'medications', 'emergency_name', 'emergency_phone')
        }),
        ('System metadata', {
            'fields': ('submitted_at',)
        }),
    )
