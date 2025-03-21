from django.shortcuts import render
from django.views.generic import TemplateView

class HTMLEditorView(TemplateView):
    template_name = 'compilers/html_editor.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Initial code for each editor
        context['initial_html'] = '''
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My HTML Page</title>
    </head>
    <body>
        <h1>Code, Edit, Run code online.</h1>
        <p>Try changing the text and click on the run button to see the output.</p>
    </body>
</html>
'''
        context['initial_css'] = '''
body { background-color: lightblue; } 
h1 {color: green;}
p {color: red;}
'''
        context['initial_js'] = 'console.log("Hello from JavaScript!");'
        return context