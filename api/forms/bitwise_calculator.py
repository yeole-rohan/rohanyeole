from django import forms

class BitwiseCalculatorForm(forms.Form):
    DATA_TYPES = [
        ('int', 'Integer'),
        ('bin', 'Binary'),
        ('hex', 'Hexadecimal'),
        ('dec', 'Decimal'),
    ]

    OPERATORS = [
        ('&', 'AND'),
        ('|', 'OR'),
        ('^', 'XOR'),
        ('~', 'NOT'),
        ('<<', 'Left Shift'),
        ('>>', 'Right Shift'),
    ]

    data_type = forms.ChoiceField(choices=DATA_TYPES, label="Data Type")
    number1 = forms.CharField(label="Number 1", required=True)
    number2 = forms.CharField(label="Number 2", required=False)  # Optional for NOT operator
    bitwise_operator = forms.ChoiceField(choices=OPERATORS, label="Bitwise Operator")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add Bootstrap classes to form fields
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-control'})