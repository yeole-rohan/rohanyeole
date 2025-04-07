from django.shortcuts import render
import requests

def source_code_viewer(request):
    html_content = ""
    url = ""

    if request.method == "POST":
        url = request.POST.get("url", "")
        try:
            response = requests.get(url)
            response.raise_for_status()
            html_content = response.text
        except Exception as e:
            html_content = f"Error fetching HTML: {e}"

    return render(request, "others/source_code_viewer.html", {
        "html_content": html_content,
        "url": url
    })
