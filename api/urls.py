from django.urls import path
from . import views 
urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('html-online-editor/', views.HTMLEditorView.as_view(), name='html_editor'),
    path('css-online-editor/', views.CSSEditorView.as_view(), name='css_editor'),
    path('js-online-editor/', views.JSEditorView.as_view(), name='js_editor'),
    # path('space-flight/', views.SpaceShipView.as_view(), name='space_ship'),
    path('online-python-compiler/', views.PythonEditorView.as_view(), name='python_editor'),
    path('guid/', views.generate_guid, name='generate_guid'),
    path('box-shadow/', views.CSSBoxView.as_view(), name='css_box_shadow'),

    # Minify and Buetify URLS
    path('css-minify-buetify/',views.FormatMinifyCSSView.as_view(), name='css_format_minify'),
    path('html-minify-buetify/',views.FormatMinifyHTMLView.as_view(), name='css_format_minify'),
    path('json-minify-buetify/',views.FormatMinifyJSONView.as_view(), name='json_format_minify'),
    # path('markdown-minify-buetify/',views.FormatMinifyMakrDownView.as_view(), name='markdown_format_minify'),
    # path('sql-minify-buetify/',views.FormatMinifySQLView.as_view(), name='sql_format_minify'),
    path('xml-minify-buetify/',views.FormatMinifyXMLView.as_view(), name='xml_format_minify'),
    path('js-minify-buetify/',views.FormatMinifyJSView.as_view(), name='js_format_minify'),
    path('yml-minify-buetify/',views.FormatMinifyYMLView.as_view(), name='yml_format_minify'),
    path('csharp-minify-buetify/',views.FormatMinifyCSharpView.as_view(), name='csharp_format_minify'),

    # All Generators URLS
    path('sha512-hash-generator/', views.SHA512HashGenerator.as_view(), name='sha512_generator'),
    path('sha256-hash-generator/', views.SHA256HashGenerator.as_view(), name='sha256_generator'),
    path('md5-hash-generator/', views.MD5HashGenerator.as_view(), name='md5_hash_generator'),
    path('wordpress-password-generator/', views.WordPressPasswordGenerator.as_view(), name="wordpress_password_generator"),
    path('slug-generator/',views.SlugView.as_view(), name='slug'),

    # All Validators URLS
    path('email-validator/', views.email_validator_view, name='email_validator'),

    # All Converters
    path('xml-to-json/', views.XMLToJsonConverterView.as_view(), name='xml_to_json_converter'),
    # Other Tools URLS
    path('word-shuffle/', views.shuffle_words, name='word_shuffle'),
    path('notepad/', views.notepad_editor, name='notepad_editor'),
    path('parse-url/', views.url_parser, name='parse_url'),
    path('bitwise-calculator/', views.bitwise_calculator_view, name='bitwise_calculator_view'),
]