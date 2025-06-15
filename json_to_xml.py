import json
import xml.etree.ElementTree as ET

# Lue JSON-tiedosto
with open('members.json', 'r', encoding='utf-8') as f:
    members = json.load(f)

# Luo XML:n juurielementti
root = ET.Element('members')

for member in members:
    artist = ET.SubElement(root, 'member')
    name = ET.SubElement(artist, 'name')
    name.text = member.get('name', '')
    url = ET.SubElement(artist, 'url')
    url.text = member.get('url', '')

# Muunna XML merkkijonoksi
tree = ET.ElementTree(root)
tree.write('members.xml', encoding='utf-8', xml_declaration=True)

print("members.xml tiedosto luotu.")

