The "books and authors" webapp sample
CS257 Software Design, Spring 2016
Jeff Ondich

==== PART I: Run this app on your own computer ====

1. Dependencies
- a Unix shell (e.g. Mac Terminal or cygwin)
- PostgreSQL
- python3
- psycopg2 module in python3
- Flask

2. Load the books database into postgresql

You have your choice here. You can either use an existing database (that
you created earlier with "createdb databasename"), or you can create a
new one:

    createdb books

Then, assuming your database name is databasename, load the books tables
into that new database like so:

    psql databasename < books_dump.sql

Check to make sure it worked by running "psql databasename" and then
doing "\dt" to see the tables and "SELECT * FROM authors", etc. to check
the data.

NOTE: I used "pg_dump --no-owner --no-privileges books > books_dump.sql" to
create the books_dump.sql file. That fixes some problems you may have seen with
earlier versions of the books_dump.sql file.

3. Configuration

- Edit config.py and change the database/user/password to your postgresql info.

- Make sure the permissions on books_api.py allow execution

    ls -l books_api.py

should show x's in the permissions on the left side of the ls output
(for example, "-rwxr-xr-x"). If those x's aren't there, do this:

    chmod +x books_api.py

and then do the ls -l again to check.

4. Run the API on your machine

    ./books_api.py localhost 8080

I'd leave off the & at the end, just so it's easy to kill the books app using
Ctrl-C. I usually just leave one terminal tab open with the server in it, and then
do other terminal work in different tabs.

5. Test the raw API by going to http://localhost:8080/authors/ in a browser.
You can take a look at the rest of the "route(...)" statements in API.py
to see other API possibilities.

6. Test the user interface by launching:

    ./books_website.py localhost 8081

and then taking your browser to http://localhost:8081/. Play around.
(There's not much to do, of course.)

7. Look at all the pieces. Start trying to figure out how this website works,
and what all the various pieces of code are for. What happens and when?
Write down questions.


==== PART II: Run this app on thacker ====

0. Download the books package to your web directory
/var/www/html/cs257/yourusername on thacker. You can do that like so:

    cd /var/www/html/cs257/yourusername
    git clone https://github.com/ondich/cs257_2017.git

1. Dependencies
- All the stuff shown above is already installed

2. Load the books database into postgresql
- Same as in #2 above, but you have to use your user name as your database name (Mike already did "createdb username" for all the usernames in the class)

3. Configuration
- Same as in #3 above

4. Run the app on thacker

    ./books_api.py thacker.mathcs.carleton.edu YOURFIRSTPORT &
    ./books_website.py thacker.mathcs.carleton.edu YOURSECONDPORT &

5, 6. Test by going to http://thacker.mathcs.carleton.edu:YOURSECONDPORT/...

