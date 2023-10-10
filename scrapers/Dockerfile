FROM python:latest

WORKDIR /app

COPY ./ ./

RUN pip install -r ./requirements.txt

RUN wget -nc https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt update

RUN apt install -f ./google-chrome-stable_current_amd64.deb

CMD uvicorn main:app --reload --port 8000 --host 0.0.0.0
