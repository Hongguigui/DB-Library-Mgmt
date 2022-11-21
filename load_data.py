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

	book_df["concat"] = book_df["isbn13"].astype(str)+book_df["title"]+book_df["authors"]
	i = 0
	for item in book_df["concat"]:
		item = str(item)
		if not (item.isascii()):
			i += 1
			book_df.drop(book_df[book_df["concat"] == item].index,inplace=True)
	print(i)
	print(len(book_df.index))
	book_df = book_df.drop("concat", axis=1)
	book_df['authors'] = book_df['authors'].astype(str)
	book_df['title'] = book_df['title'].astype(str)
	book_df['categories'] = book_df['categories'].astype(str)

	# Credentials to database connection
	hostname = 'localhost'
	dbname = 'library'
	uname = 'root'
	pwd = 'root'

	# # Create SQLAlchemy engine to connect to MySQL Database
	engine = create_engine('mysql+pymysql://{user}:{pw}@{host}/{db}'.format(host=hostname, db=dbname, user=uname, pw=pwd))

	# Convert dataframe to sql table
	book_df.to_sql('books', engine, index=False)



load_data()

# def load_data():
# 		# Credentials to database connection
# 	hostname = 'localhost'
# 	dbname = 'library'
# 	uname = 'root'
# 	pwd = 'root'
#
# 	book_df = pd.read_csv('data csv/dbbooks.csv')
# 	book_df['authors'] = book_df['authors'].astype(str)
# 	book_df['title'] = book_df['title'].astype(str)
#
#
# 	# # Create SQLAlchemy engine to connect to MySQL Database
# 	engine = create_engine('mysql+pymysql://{user}:{pw}@{host}/{db}'.format(host=hostname, db=dbname, user=uname, pw=pwd))
#
# 	# Convert dataframe to sql table
# 	book_df.to_sql('books', engine, index=False)
#
# load_data()