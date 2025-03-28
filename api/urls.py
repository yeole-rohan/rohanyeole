from django.urls import path
from . import views 
urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('html-online-compiler/', views.HTMLEditorView.as_view(), name='html_editor'),
    path('css-online-editor/', views.CSSEditorView.as_view(), name='css_editor'),
    path('js-online-editor/', views.JSEditorView.as_view(), name='js_editor'),
    path('space-flight/', views.SpaceShipView.as_view(), name='space_ship'),
    path('online-python-compiler/', views.PythonEditorView.as_view(), name='python_editor'),
    path('guid/', views.generate_guid, name='generate_guid'),
    path('box-shadow/', views.CSSBoxView.as_view(), name='css_box_shadow'),
    path('slug-generator/',views.SlugView.as_view(), name='slug'),
    path('css-minify-buetify/',views.FormatMinifyCSSView.as_view(), name='css_format_minify'),
    path('html-minify-buetify/',views.FormatMinifyHTMLView.as_view(), name='css_format_minify'),
    path('json-minify-buetify/',views.FormatMinifyJSONView.as_view(), name='json_format_minify'),
    path('markdown-minify-buetify/',views.FormatMinifyMakrDownView.as_view(), name='markdown_format_minify'),
    path('sql-minify-buetify/',views.FormatMinifySQLView.as_view(), name='sql_format_minify'),
    path('xml-minify-buetify/',views.FormatMinifyXMLView.as_view(), name='xml_format_minify'),
    path('js-minify-buetify/',views.FormatMinifyJSView.as_view(), name='js_format_minify'),
    path('yml-minify-buetify/',views.FormatMinifyYMLView.as_view(), name='yml_format_minify'),
    path('csharp-minify-buetify/',views.FormatMinifyCSharpView.as_view(), name='csharp_format_minify'),
    path('parse-url/', views.url_parser, name='parse_url'),

    # All Validators URLS
    path('email-validator/', views.email_validator_view, name='email_validator'),

    # Other Tools URLS
    path('word-shuffle/', views.shuffle_words, name='word_shuffle'),
]