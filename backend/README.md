# Steps to start the backend django server

### If Running Locally

* cd into /backend and run the following to start the django server

```
python3 -m venv myenv
source myenv/bin/activate
```

```
pip install -r requirements.txt
```

```
python3 manage.py runserver 
```

To run the api tests, execute the following commands in another terminal

```
source myenv/bin/activate
python3 manage.py test myapi 
```

Feel free to call the apis manually by entering

http://127.0.0.1:8000/api/candlestick-data/

into your browser.

### To Deploy With Docker

The following command will start the django server in a docker container exposed to port 8000

```
docker-compose up --build
```

To run the api tests

```
docker-compose run django python manage.py test myapi
```

Feel free to call the apis manually by entering

http://127.0.0.1:8000/api/candlestick-data/

into your browser.

# Libraries & Tools Used

For the backend I didn't use any major libraries, just the django rest framework. I then deployed with Docker.
