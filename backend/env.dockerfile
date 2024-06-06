FROM python:3.12-alpine 

RUN apk add --no-cache geos gdal 

ENV PYTHONBUFFERED 1

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .