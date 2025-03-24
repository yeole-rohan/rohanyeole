# guidgen/views.py
import uuid
from django.shortcuts import render
from django.http import JsonResponse

def generate_guid(request):
    if request.method == 'POST':
        num_guids = int(request.POST.get('num_guids', 1))
        use_hyphens = request.POST.get('hyphens') == 'on'
        use_braces = request.POST.get('braces') == 'on'
        use_uppercase = request.POST.get('uppercase') == 'on'
        use_quotes = request.POST.get('quotes') == 'on'
        use_commas = request.POST.get('commas') == 'on'
        base64 = request.POST.get('base64') == 'on'
        rfc7515 = request.POST.get('rfc7515') == 'on'
        url_encode = request.POST.get('url_encode') == 'on'

        guids = []
        for _ in range(num_guids):
            guid = str(uuid.uuid4())
            if use_hyphens:
                guid = guid
            else:
                guid = guid.replace('-', '')
            if use_braces:
                guid = f'{{{guid}}}'
            if use_uppercase:
                guid = guid.upper()
            if use_quotes:
                guid = f'"{guid}"'
            if use_commas:
                guid = f'{guid},'
            if base64:
                guid = guid.encode('ascii').hex()
            if rfc7515:
                guid = f'urn:uuid:{guid}'
            if url_encode:
                guid = guid.replace('/', '%2F').replace('+', '%2B')
            guids.append(guid)

        return JsonResponse({'guids': guids})
    return render(request, 'generators/guid.html')
