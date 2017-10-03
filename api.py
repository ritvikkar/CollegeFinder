#!/usr/bin/env python3
'''
    colleges_api.py
    Ritvik Kar, 2 May 2017

    Simple Flask API used in the sample web app for
    CS 257, Spring 2016-2017. This is the Flask app for the
    "books and authors" API only. There's a separate Flask app
    for the books/authors website.
'''
import sys
import flask
import json
import api_config
import psycopg2
import urllib

app = flask.Flask(__name__)

def _fetch_all_rows_for_query(query):
    '''
    Returns a list of rows obtained from the books database by the specified SQL
    query. If the query fails for any reason, an empty list is returned.

    Note that this is not necessarily the right error-handling choice. Would users
    of the API like to know the nature of the error? Do we as API implementors
    want to share that information? There are many considerations to balance.
    '''
    try:
        connection = psycopg2.connect(database=api_config.database, user=api_config.user, password=api_config.password)
    except Exception as e:
        print('Connection error:', e, file=sys.stderr)
        return []

    rows = []
    try:
        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall() # This can be trouble if your query results are really big.
    except Exception as e:
        print('Error querying database:', e, file=sys.stderr)

    connection.close()
    return rows

@app.after_request
def set_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/colleges/')
def get_all_colleges():
    '''
    returns a list of dictionaries containg colleges, ids, and urls
    :return: 
    '''
    query = '''SELECT  id, state, name, city, zipcode, insturl, alias, in_state_tuition, out_state_tuition, adm_rate, 
                   inst_type, undergrads
               FROM colleges ORDER BY id'''

    college_list = []
    for row in _fetch_all_rows_for_query(query):
        url = flask.url_for('get_college_by_id', college_id=row[0], _external=True)
        college = {'college_id': row[0], 'state': row[1], 'name': row[2],
                  'city': row[3], 'zipcode': row[4], 'insturl':row[5], 'alias':row[6],
                   'in_state_tuition':row[7], 'out_state_tuition':row[8], 'adm_rate':row[9],
                   'inst_type':row[10], 'undergrads':row[11], 'url':url}
        college_list.append(college)

    return json.dumps(college_list)

@app.route('/college/<college_id>')
def get_college_by_id(college_id):
    '''
    returns the college with the specified id in the form of a dictionary displaying all attributes of the college
    (e.g. testing data, admission rate, demographic information, tutition, etc.)
    :param college_id: 
    :return: dictionary containing full college record
    '''
    query = '''SELECT id, state, name, city, zipcode, insturl, alias, in_state_tuition, out_state_tuition, adm_rate, 
                   inst_type, undergrads, hist_black, pred_black, al_haw_nat, tribal, aa_na_pi, hisp, na_nontribal, 
                   men_only, women_only, sat_r_mid, sat_m_mid, sat_w_mid, sat_avg, act_avg, act_en_mid, act_m_mid,
                   act_w_mid, pct_white, pct_black, pct_hisp, pct_asian, pct_ai_an, pct_nh_pi, pct_two_or_more,
                   pct_international, pct_unkwn, median_debt, median_grad_debt, median_withdraw_debt, median_female_debt,
                   median_male_debt, median_first_gen_debt, median_non_first_gen_debt, fafsa_apps, completion_fouryear,
                   completion_lessfour, transfer_fouryear, transfer_lessfour, pct_men, pct_women
                   FROM colleges 
                   WHERE id = {0}
                   ORDER BY id'''.format(college_id)

    rows = _fetch_all_rows_for_query(query)
    if len(rows) > 0:
        row = rows[0]
        url = flask.url_for('get_college_by_id', college_id=row[0], _external=True)
        college = {'college_id': row[0], 'state': row[1], 'name': row[2],
                  'city': row[3], 'zipcode': row[4], 'insturl':row[5], 'alias':row[6],
                   'in_state_tuition':row[7], 'out_state_tuition':row[8], 'adm_rate':row[9],
                   'inst_type':row[10], 'undergrads':row[11], 'hist_black':row[12], 'pred_black':row[13],
                   'al_haw_nat':row[14], 'tribal':row[15], 'aa_na_pi':row[16], 'hisp':row[17], 'na_nontribal':row[18],
                   'men_only':row[19], 'women_only':row[20], 'sat_r_mid':row[21], 'sat_m_mid':row[22],
                   'sat_w_mid':row[23], 'sat_avg':row[24], 'act_avg':row[25], 'act_en_mid':row[26], 'act_m_mid':row[27],
                   'act_w_mid':row[28], 'pct_white':row[29], 'pct_black':row[30], 'pct_hisp':row[31],
                   'pct_asian':row[32], 'pct_ai_an':row[33], 'pct_nh_pi':row[34], 'pct_two_or_more':row[35],
                   'pct_international':row[36], 'pct_unkwn':row[37], 'median_debt':row[38], 'median_grad_debt':row[39],
                   'median_withdraw_debt':row[40], 'median_female_debt':row[41], 'median_male_debt':row[42],
                   'median_first_gen_debt':row[43], 'median_non_first_gen_debt':row[44], 'fafsa_apps':row[45],
                   'completion_fouryear':row[46], 'completion_lessfour':row[47], 'transfer_fouryear':row[48],
                   'transfer_lessfour':row[49], 'pct_men':row[50], 'pct_women':row[51], 'url':url}
        return json.dumps(college)

    return json.dumps({})

@app.route('/college/name/<college_name>')
def get_college_by_name(college_name):
    '''
    returns a list of dictionaries containing names, ids, and location information for colleges whose names match the search text
    :param search_text: 
    :return: 
    '''
    query = '''SELECT id, state, name, city, zipcode, insturl, alias, in_state_tuition, out_state_tuition, adm_rate, 
                   inst_type, undergrads
               FROM colleges
               WHERE UPPER(name) LIKE UPPER('%{0}%')
               ORDER BY id'''.format(college_name)

    college_list = []
    for row in _fetch_all_rows_for_query(query):
        url = flask.url_for('get_college_by_id', college_id=row[0], _external=True)
        college = {'college_id': row[0], 'state': row[1], 'name': row[2],
                  'city': row[3], 'zipcode': row[4], 'insturl':row[5], 'alias':row[6],
                   'in_state_tuition':row[7], 'out_state_tuition':row[8], 'adm_rate':row[9],
                   'inst_type':row[10], 'undergrads':row[11]}
        college_list.append(college)

    return json.dumps(college_list)

@app.route('/help')
def help():
    rule_list = []
    for rule in app.url_map.iter_rules():
        rule_text = rule.rule.replace('<', '&lt;').replace('>', '&gt;')
        rule_list.append(rule_text)
    return json.dumps(rule_list)

@app.route('/college/city/<city_name>')
def get_city_colleges(city_name):
    '''
    returns a list of dictionaries containing names and ids, and zip codes for colleges in a specified city
    :param search_text: 
    :return: 
    '''
    query = '''SELECT  id, state, name, city, zipcode, insturl, alias, in_state_tuition, out_state_tuition, adm_rate, 
                   inst_type, undergrads
               FROM colleges
               WHERE UPPER(city) LIKE UPPER('%{0}%')
               ORDER BY id'''.format(city_name)

    college_list = []
    for row in _fetch_all_rows_for_query(query):
        url = flask.url_for('get_college_by_id', college_id=row[0], _external=True)
        college = {'college_id': row[0], 'state': row[1], 'name': row[2],
                  'city': row[3], 'zipcode': row[4], 'insturl':row[5], 'alias':row[6],
                   'in_state_tuition':row[7], 'out_state_tuition':row[8], 'adm_rate':row[9],
                   'inst_type':row[10], 'undergrads':row[11], 'url':url}
        college_list.append(college)

    return json.dumps(college_list)

@app.route('/college/state/<state>')
def get_state_colleges(state):
    '''
    returns a list of dictionaries of college names, ids, and cities in the specified state
    :param state: 
    :return: 
    '''
    query = '''SELECT  id, state, name, city, zipcode, insturl, alias, in_state_tuition, out_state_tuition, adm_rate, 
                       inst_type, undergrads
                   FROM colleges
                   WHERE UPPER(state) LIKE UPPER('%{0}%')
                   ORDER BY id'''.format(state)

    college_list = []
    for row in _fetch_all_rows_for_query(query):
        url = flask.url_for('get_college_by_id', college_id=row[0], _external=True)
        college = {'college_id': row[0], 'state': row[1], 'name': row[2],
                   'city': row[3], 'zipcode': row[4], 'insturl': row[5], 'alias': row[6],
                   'in_state_tuition': row[7], 'out_state_tuition': row[8], 'adm_rate': row[9],
                   'inst_type': row[10], 'undergrads': row[11], 'url': url}
        college_list.append(college)

    return json.dumps(college_list)


if __name__ == '__main__':
    #app.run(host='localhost', port=5121, debug=True)
    app.run(host='thacker.mathcs.carleton.edu', port=5121, debug=True)