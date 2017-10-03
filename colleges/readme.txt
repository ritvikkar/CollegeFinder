College Finder Web App
Ritvik Kar

==== Run this app on your own computer ====

1. Dependencies
- a Unix shell (e.g. Mac Terminal or cygwin)
- PostgreSQL
- python3
- psycopg2 module in python3
- Flask

2. Load the Colleges database into postgresql

You have your choice here. You can either use an existing database (that
you created earlier with "createdb databasename"), or you can create a
new one:

    createdb colleges

Then, assuming your database name is databasename, load the books tables
into that new database like so:

    psql databasename < colleges_dump.sql

Check to make sure it worked by running "psql databasename" and then
doing "\dt" to see the tables and "SELECT * FROM colleges”, etc. to check
the data.

NOTE: I used "pg_dump --no-owner --no-privileges books > colleges_dump.sql" to
create the books_dump.sql file. That fixes some problems you may have seen with
earlier versions of the books_dump.sql file.

3. Configuration

- Edit config.py and change the database/user/password to your postgresql info.

- Make sure the permissions on colleges_api.py allow execution

    ls -l colleges_api.py

should show x's in the permissions on the left side of the ls output
(for example, "-rwxr-xr-x"). If those x's aren't there, do this:

    chmod +x colleges_api.py

and then do the ls -l again to check.

4. Run the API on your machine

    ./colleges_api.py localhost 8080

I'd leave off the & at the end, just so it's easy to kill the books app using
Ctrl-C. I usually just leave one terminal tab open with the server in it, and then
do other terminal work in different tabs.

5. Test the raw API by going to http://localhost:8080/colleges/ in a browser.
You can take a look at the rest of the "route(...)" statements in API.py
to see other API possibilities.

6. Test the user interface by launching:

    ./colleges_website.py localhost 8081

and then taking your browser to http://localhost:8081/.