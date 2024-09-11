FROM python:3.10-slim

# stops python from writing cache files to disk
ENV PYTHONDONTWRITEBYTECODE 1
# stops python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# copy the django project files into the docker container
COPY . /app/

# expose port 8000
EXPOSE 8000

# start the django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
