import pandas as pd
from sqlalchemy import create_engine

def load_data():
	# Credentials to database connection
	hostname = 'localhost'
	dbname = 'library'
	uname = 'root'
	pwd = 'root'

	# Create dataframe
	book_df = pd.read_csv('data csv/dbbooks.csv')

	# Create SQLAlchemy engine to connect to MySQL Database
	engine = create_engine('mysql+pymysql://{user}:{pw}@{host}/{db}'.format(host=hostname, db=dbname, user=uname, pw=pwd))

	# Convert dataframe to sql table
	book_df.to_sql('books', engine, index=False)
