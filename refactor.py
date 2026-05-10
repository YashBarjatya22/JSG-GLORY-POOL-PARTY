import re
import os

with open("c:/Users/yashb/OneDrive/Desktop/jsg/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace hardcoded dark colors with CSS variables
replacements = {
    r'rgba\(26, 31, 58, 0\.6\)': 'var(--glass-bg)',
    r'rgba\(26, 31, 58, 0\.4\)': 'var(--glass-bg)',
    r'rgba\(10, 14, 39, 0\.7\)': 'var(--glass-nav)',
    r'rgba\(26, 31, 58, 0\.9\)': 'var(--glass-bg-hover)',
    r'background:\s*var\(--dark-bg\)': 'background: var(--dark-bg)',
    r'color:\s*white': 'color: var(--heading-color)',
    r'color:\s*#eaf9ff': 'color: var(--sub-text)',
    r'color:\s*#ccc': 'color: var(--muted-text)',
    r'color:\s*#ddd': 'color: var(--muted-text)',
    r'rgba\(0,0,0,0\.2\)': 'var(--glass-bg)',
    r'rgba\(0, 217, 255, 0\.1\)': 'var(--shadow-soft)',
    r'rgba\(0, 217, 255, 0\.2\)': 'var(--shadow-glow)',
    r'rgba\(0, 217, 255, 0\.3\)': 'var(--shadow-glow)',
    r'rgba\(0, 217, 255, 0\.5\)': 'var(--shadow-glow)',
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content)

with open("c:/Users/yashb/OneDrive/Desktop/jsg/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done index.html refactoring")
