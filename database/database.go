package database

type Database struct {
	Schools *SchoolCollection
}

// Creates a fake database
func NewDatabase() *Database {
	return &Database{
		Schools: NewSchoolCollection(),
	}
}
