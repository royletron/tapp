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
