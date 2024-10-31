FROM python:3.10-alpine3.18

WORKDIR /code

COPY ./requirements.in /code/requirements.in

RUN pip install --no-cache-dir --upgrade -r /code/requirements.in

COPY ./src /code/src

COPY ./db /code/db

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--proxy-headers", "--port", "8000", "--host", "0.0.0.0"]