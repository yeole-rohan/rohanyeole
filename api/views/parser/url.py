from urllib.parse import urlparse, urlunparse, ParseResult
import tldextract
from django.shortcuts import render

def parse_url(url):
    try:
        parsed_url = urlparse(url)
        extracted = tldextract.extract(url)

        components = {
            'Protocol': parsed_url.scheme or '',
            'Hostname': parsed_url.hostname or '',
            'Port': str(parsed_url.port) if parsed_url.port else '',
            'Full Host': parsed_url.netloc or '',
            'Username': parsed_url.username or '',
            'Password': parsed_url.password or '',
            'Userinfo': f"{parsed_url.username}:{parsed_url.password}" if parsed_url.username or parsed_url.password else '',
            'Authority': parsed_url.netloc or '',
            'Origin': urlunparse(ParseResult(scheme=parsed_url.scheme, netloc=parsed_url.netloc, path='', params='', query='', fragment='')),
            'Domain': f"{extracted.domain}.{extracted.suffix}",
            'Subdomain': extracted.subdomain or '',
            'TLD': extracted.suffix or '',
            'Pathname': parsed_url.path or '',
            'Directory': '/'.join(parsed_url.path.split('/')[:-1]) if parsed_url.path else '',
            'Filename': parsed_url.path.split('/')[-1] if parsed_url.path else '',
            'Suffix': '',
            'Query': parsed_url.query or '',
            'Hash': parsed_url.fragment or '',
            'Fragment': parsed_url.fragment or '',
            'Resource': parsed_url.path or '',
        }
        return components
    except Exception as e:
        raise ValueError(f"Invalid URL: {e}")
    

def url_parser(request):
    context = {}
    if request.method == 'POST':
        url = request.POST.get('url', '').strip()
        if url:
            try:
                context['components'] = parse_url(url)
            except ValueError as e:
                context['error'] = str(e)
        else:
            context['error'] = 'Please enter a URL.'
    return render(request, 'parsers/url.html', context)

