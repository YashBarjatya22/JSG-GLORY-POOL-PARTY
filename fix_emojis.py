import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace corrupted characters with correct emojis
text = text.replace('dY"  <a', '📧 <a')
text = text.replace('dY" +91', '📱 +91')
text = text.replace('dY"? Riverarch', '📍 Riverarch')
text = text.replace('+`', '↑')
text = text.replace('+`', '↑')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
