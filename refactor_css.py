import re
import os

with open("c:/Users/yashb/OneDrive/Desktop/jsg/style.css", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    r'rgba\(26, 31, 58, 0\.6\)': 'var(--glass-bg)',
    r'rgba\(26, 31, 58, 0\.68\)': 'var(--glass-bg)',
    r'rgba\(26, 31, 58, 0\.7\)': 'var(--glass-bg)',
    r'rgba\(26, 31, 58, 0\.8\)': 'var(--glass-bg)',
    r'rgba\(10, 14, 39, 0\.7\)': 'var(--glass-nav)',
    r'rgba\(10, 14, 39, 0\.9\)': 'var(--glass-nav-scrolled)',
    r'rgba\(26, 31, 58, 0\.9\)': 'var(--glass-bg-hover)',
    r'rgba\(26, 31, 58, 1\)': 'var(--glass-bg-hover)',
    r'color:\s*#ffffff': 'color: var(--heading-color)',
    r'color:\s*#eaf9ff': 'color: var(--sub-text)',
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content)

with open("c:/Users/yashb/OneDrive/Desktop/jsg/style.css", "w", encoding="utf-8") as f:
    f.write(content)

print("Done style.css refactoring")
