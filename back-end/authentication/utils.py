from django.core.mail import EmailMessage
import threading


class EmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()


class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'],
            body=f"Click the link below to verify your email:\n{data['url']}",
            to=[data['to_email']]
        )
        email.send()
