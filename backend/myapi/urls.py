from django.urls import path
from . import views

# Defines the URLs for each API endpoint 
# Each endpoint has an associated view function in views.py
urlpatterns = [
    path('candlestick-data/', views.candlestick_data, name='candlestick-data'),
    path('line-chart-data/', views.line_chart_data, name='line-chart-data'),
    path('bar-chart-data/', views.bar_chart_data, name='bar-chart-data'),
    path('pie-chart-data/', views.pie_chart_data, name='pie-chart-data'),
]