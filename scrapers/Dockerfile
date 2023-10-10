FROM python:latest

WORKDIR /app

COPY ./requirements.txt ./

RUN pip install -r ./requirements.txt

COPY ./ ./

RUN wget -nc https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt-get update

RUN apt-get -y --force-yes install -f ./google-chrome-stable_current_amd64.deb

CMD uvicorn main:app --reload --port 8000 --host 0.0.0.0
