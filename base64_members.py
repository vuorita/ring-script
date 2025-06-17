import json
import base64

def encode_base64(text):
    return base64.b64encode(text.encode('utf-8')).decode('utf-8')

def convert_txt_to_json():
    with open("members.json.txt", "r", encoding="utf-8") as f:
        members = json.load(f)

    encoded_members = []
    for member in members:
        encoded_members.append({
            "name": encode_base64(member["name"]),
            "url": encode_base64(member["url"])
        })

    with open("members.json", "w", encoding="utf-8") as f:
        json.dump(encoded_members, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    convert_txt_to_json()

