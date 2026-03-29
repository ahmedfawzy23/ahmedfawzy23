import os

def generate_svg():
    colors = ['#3d2b1f', '#5c4033', '#90EE90', '#228B22', '#FFD700']
    
    svg_content = """<svg width="800" height="150" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0d1117" rx="10"/>
    <rect x="20" y="40" width="760" height="90" fill="#3d2b1f" rx="5"/>
    <text x="30" y="30" fill="#90EE90" font-family="Arial" font-weight="bold">🚜 Ahmed's Code Farm: Harvesting Solutions...</text>
    <text x="50" y="100" font-size="45">🚜  🌾  🌱  🌾  🌱  🌾  🌱  🌾</text>
    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
    </svg>"""
    
    os.makedirs('assets', exist_ok=True)
    with open('assets/tractor_harvest.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

if __name__ == "__main__":
    generate_svg()
