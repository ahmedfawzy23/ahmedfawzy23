import os

def generate_svg():
    # الألوان (ألوان Terminal الكلاسيكية: أسود وأخضر)
    colors = {
        'bg': '#000000',      # خلفية سوداء
        'text': '#00FF00',    # نص أخضر فاقع
        'bug': '#FF4500',     # لون البوج (برتقالي محمر)
        'motto': '#58a6ff'    # لون شعار البحث
    }
    
    # بناء الـ SVG كأنه Terminal Window
    svg_content = f"""<svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="{colors['bg']}" rx="10"/>
    
    <rect width="100%" height="30" fill="#333" rx="10" />
    <circle cx="20" cy="15" r="6" fill="#FF5F56"/>
    <circle cx="40" cy="15" r="6" fill="#FFBD2E"/>
    <circle cx="60" cy="15" r="6" fill="#27C93F"/>
    <text x="80" y="20" fill="#ccc" font-family="Courier New" font-size="14">ahmedfawzy@laravel-shell:~</text>

    <g font-family="Courier New" font-size="16">
        <text x="20" y="60" fill="{colors['text']}">> Target: Project XYZ - Running Bug Scanner...</text>
        <text x="20" y="85" fill="{colors['text']}">> Scanning...............................</text>
        
        <g id="bugs">
            <text x="20" y="110" font-size="20">🐞</text>
            <text x="120" y="110" font-size="20">🐛</text>
            <text x="220" y="110" font-size="20">🐞</text>
            <text x="320" y="110" font-size="20">🐛</text>
            <text x="420" y="110" font-size="20">🐞</text>
            <text x="520" y="110" font-size="20">🐛</text>
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
        </g>

        <g id="hunter">
            <text x="0" y="110" font-size="20" fill="{colors['text']}" font-weight="bold">></text>
            <animateTransform attributeName="transform" type="translate" from="-50 0" to="800 0" dur="8s" repeatCount="indefinite" />
            
            <text x="10" y="105" font-size="12" fill="{colors['text']}" font-weight="bold">[FIXED!]</text>
        </g>

        <text x="20" y="140" fill="{colors['text']}">> Current Score: 115 Bugs Eliminated.</text>
        <text x="20" y="165" fill="{colors['text']}">> System Status: Optimal. Total Commits: 115.</text>
        <text x="20" y="180" fill="{colors['motto']}" font-size="12">[MENTOR MODE: ON] Help others master Backend logic.</text>
    </g>
    </svg>"""
    
    os.makedirs('assets', exist_ok=True)
    with open('assets/tractor_harvest.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

if __name__ == "__main__":
    generate_svg()
