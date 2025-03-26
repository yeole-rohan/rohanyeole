from django.shortcuts import render

import json

def format_json(json_str):
    try:
        data = json.loads(json_str)
        formatted_json = json.dumps(data, indent=2)
        return formatted_json
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON: {e}")

def json_formatter(request):
    context = {}
    if request.method == 'POST':
        json_str = request.POST.get('json', '').strip()
        if json_str:
            try:
                context['formatted_json'] = format_json(json_str)
            except ValueError as e:
                context['error'] = str(e)
        else:
            context['error'] = 'Please enter a JSON string.'
    return render(request, 'parsers/json.html', context)
