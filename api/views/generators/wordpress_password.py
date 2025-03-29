import bcrypt
from django.views.generic import FormView
from django.shortcuts import render
from api.forms import WordPressPasswordForm

class WordPressPasswordGenerator(FormView):
    template_name = "generators/wordpress_password.html"
    form_class = WordPressPasswordForm

    def form_valid(self, form):
        password = form.cleaned_data["password"].strip()

        # Generate a WordPress-compatible hash
        salt = bcrypt.gensalt(rounds=12)
        hashed_password = bcrypt.hashpw(password.encode(), salt).decode()

        # SQL statements for WordPress `wp_users` table
        sql_username = f'UPDATE `wp_users` SET `user_pass` = "{hashed_password}" WHERE user_login="your_user_name";'
        sql_email = f'UPDATE `wp_users` SET `user_pass` = "{hashed_password}" WHERE user_email="your_email_address";'

        return render(self.request, self.template_name, {
            "form": form,
            "hashed_password": hashed_password,
            "sql_username": sql_username,
            "sql_email": sql_email
        })

    def form_invalid(self, form):
        return render(self.request, self.template_name, {"form": form})

