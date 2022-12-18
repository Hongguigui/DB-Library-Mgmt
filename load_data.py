import pandas as pd
from sqlalchemy import create_engine


def load_data():

	# Credentials to database connection
	hostname = 'localhost'
	dbname = 'library'
	uname = 'root'
	pwd = 'root'

	# # Create SQLAlchemy engine to connect to MySQL Database
	engine = create_engine('mysql+pymysql://{user}:{pw}@{host}/{db}'.format(host=hostname, db=dbname, user=uname, pw=pwd))


	# # Create dataframe
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

	# book_df.to_sql('books', engine, index=False)

	branch_df = pd.read_csv('data csv/Branch.csv')
	branch_df['Location'] = branch_df['Location'].astype(str)
	branch_df['EID'] = branch_df['EID'].astype(int)
	branch_df['Name'] = branch_df['Name'].astype(str)

	employee_df = pd.read_csv('data csv/Employee.csv')
	employee_df['UID'] = employee_df['UID'].astype(int)
	employee_df['EID'] = employee_df['EID'].astype(int)
	employee_df['Name'] = employee_df['Name'].astype(str)

	salary_df = pd.read_csv('data csv/Salary.csv')
	salary_df['EID'] = salary_df['EID'].astype(int)
	salary_df['Salary'] = salary_df['Salary'].astype(int)

	users_df = pd.read_csv('data csv/Users.csv')
	users_df['UID'] = users_df['UID'].astype(int)
	users_df['Email'] = users_df['Email'].astype(str)
	users_df['Password'] = users_df['Password'].astype(str)
	users_df['Fine'] = users_df['Fine'].astype(int)

	borrows_df = pd.read_csv('data csv/borrows.csv')
	borrows_df['borrowsID'] = borrows_df['borrowsID'].astype(int)
	borrows_df['isbn13'] = borrows_df['isbn13']
	borrows_df['UID'] = borrows_df['UID'].astype(int)
	borrows_df['timeLeft'] = borrows_df['timeLeft'].astype(int)
	borrows_df['late'] = borrows_df['late'].astype(int)


	# Convert dataframe to sql table
	book_df.to_sql('books', engine, index=False)
	branch_df.to_sql('branch', engine, index=False)
	employee_df.to_sql('employee', engine, index=False)
	salary_df.to_sql('salary', engine, index=False)
	users_df.to_sql('user', engine, index=False)
	borrows_df.to_sql('borrows', engine, index=False)


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