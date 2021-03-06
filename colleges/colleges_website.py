#!/usr/bin/env python3
'''
    colleges_website.py
    Jeff Ondich, 25 April 2016

    Simple Flask app used in the sample web app for
    CS 257, Spring 2016. This is the Flask app for the
    "books and authors" API and website. The API offers
    JSON access to the data, while the website (at
    route '/') offers end-user browsing of the data.
'''
import sys
import flask
import json
import api_config
import psycopg2

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/') 
def get_main_page():
    ''' This is the only route intended for human users '''
    return flask.render_template('index.html')

@app.route('/about/') 
def get_about_page():
    ''' This is the only route intended for human users '''
    return flask.render_template('about.htm')

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: {0} host port'.format(sys.argv[0]), file=sys.stderr)
        exit()

    host = sys.argv[1]
    port = sys.argv[2]
    app.run(host=host, port=port)

