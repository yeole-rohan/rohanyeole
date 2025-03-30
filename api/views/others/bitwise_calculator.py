from django.shortcuts import render
from api.forms import BitwiseCalculatorForm

def bitwise_calculator_view(request):
    result_bin = None
    result_dec = None
    result_hex = None
    result_int = None
    error = None

    if request.method == 'POST':
        form = BitwiseCalculatorForm(request.POST)
        if form.is_valid():
            data_type = form.cleaned_data['data_type']
            number1 = form.cleaned_data['number1']
            number2 = form.cleaned_data['number2']
            operator = form.cleaned_data['bitwise_operator']

            try:
                # Convert inputs to integers
                if data_type == 'bin':  # Binary
                    num1 = int(number1, 2)
                    num2 = int(number2, 2) if number2 else 0
                elif data_type == 'hex':  # Hexadecimal
                    num1 = int(number1, 16)
                    num2 = int(number2, 16) if number2 else 0
                elif data_type == 'dec':  # Decimal
                    num1 = int(number1)
                    num2 = int(number2) if number2 else 0
                else:  # Integer
                    num1 = int(number1)
                    num2 = int(number2) if number2 else 0

                # Perform bitwise operation
                if operator == '&':
                    result = num1 & num2
                elif operator == '|':
                    result = num1 | num2
                elif operator == '^':
                    result = num1 ^ num2
                elif operator == '~':
                    result = ~num1
                elif operator == '<<':
                    result = num1 << num2
                elif operator == '>>':
                    result = num1 >> num2

                # Calculate results in all formats
                result_bin = bin(result)[2:]
                result_dec = str(result)
                result_hex = hex(result)[2:]
                result_int = int(result)
            except ValueError:
                error = "Invalid input: Please enter valid numbers."
    else:
        form = BitwiseCalculatorForm()

    return render(request, 'others/bitwise_calculator.html', {
        'form': form,
        'result_bin': result_bin,
        'result_dec': result_dec,
        'result_hex': result_hex,
        'result_int': result_int,
        'error': error,
    })
