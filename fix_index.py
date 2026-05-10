with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

marker = '<!-- ==================== BACKGROUND MUSIC ==================== -->'
parts = content.split(marker)

clean_tail = """<!-- ==================== BACKGROUND MUSIC ==================== -->
    <audio id="bgMusic" loop>
        <source src="bgm.mpeg" type="audio/mpeg">
    </audio>

    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    </script>
</body>
</html>"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(parts[0] + clean_tail)
