package database

type Database struct {
	Schools *SchoolCollection
}

// default constructor
func NewDatabase() *Database {
	return &Database{
		Schools: NewSchoolCollection(),
	}
}

// constructor with data - for testing
func NewDatabaseWithData(schools []*School) *Database {
	return &Database{
		Schools: NewSchoolCollectionWithData(schools),
	}
}