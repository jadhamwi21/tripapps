FROM python:latest

WORKDIR /app

COPY ./requirements.txt ./

RUN pip install -r ./requirements.txt

RUN wget -nc https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt update

RUN apt install -y --force-yes -f ./google-chrome-stable_current_amd64.deb

COPY ./ ./

CMD uvicorn main:app --reload --port 8000 --host 0.0.0.0
