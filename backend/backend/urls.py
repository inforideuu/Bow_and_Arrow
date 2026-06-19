"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/site-data/', views.get_site_data),
    path('api/enroll/', views.enroll_student),
    path('api/contact/', views.contact_submit),
    path('api/admin/submissions/', views.get_admin_submissions),
    path('api/admin/update-content/', views.update_site_content),
    path('api/admin/update-centers/', views.update_centers),
    path('api/admin/update-achievements/', views.update_achievements),
    path('api/admin/update-testimonials/', views.update_testimonials),
    path('api/admin/update-gallery-images/', views.update_gallery_images),
    path('api/admin/update-batches/', views.update_batches),
    path('api/admin/update-assessments/', views.update_assessments),
    path('api/admin/update-features/', views.update_features),
    path('api/admin/update-why-archery/', views.update_why_archery),
    path('api/admin/update-programs/', views.update_programs),
    path('api/admin/contacts/<int:pk>/delete/', views.delete_contact),
    path('api/admin/contacts/clear/', views.clear_contacts),
]

