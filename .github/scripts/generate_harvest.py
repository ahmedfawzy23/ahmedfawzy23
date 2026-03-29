import os
import requests
import json
from datetime import datetime, timedelta

def get_contributions():
    # كود لجلب بيانات المساهمات من GitHub API
    # (تم تبسيطه لغرض المحاكاة ليعمل فوراً)
    return [5, 2, 0, 8, 1, 4, 10] # مثال للبيانات

def generate_svg():
    # إعدادات الألوان (ألوان المزرعة والحصاد)
    colors = {
        'empty': '#3d2b1f',   # تربة بنية
        'plowed': '#5c4033',  # تربة محروثة
        'sprout': '#90EE90',  # شتلة خضراء
        'crop': '#228B22',    # نبات أخضر
        'harvest': '#FFD700'  # حصاد ذهبي (للكوميتس الكبيرة)
    }
    
    # بناء الـ SVG
    svg_content = f"""
    <svg width="800" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#0d1117" rx="10"/>
        <text x="20" y="30" fill="white" font-family="Arial">🚜 Tractor Harvest: Harvesting Commits...</text>
        <rect x="50" y="50" width="700" height="80" fill="{colors['empty']}" rx="5"/>
        <text x="70" y="100" fill="{colors['harvest']}" font-size="40">🚜 🌾 🌾 🌾 🌾 🌾 🌾</text>
    </svg>
    """
    
    os.makedirs('output', exist_ok=True)
    with open('output/tractor_harvest.svg', 'w') as f:
        f.write(svg_content)

if __name__ == "__main__":
    generate_svg()
