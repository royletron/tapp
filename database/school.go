package database

import (
	"errors"

	gonanoid "github.com/matoous/go-nanoid/v2"
)

type School struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type SchoolCollection struct {
	Schools []*School `json:"schools"`
}

// Creates an accessible 'model' for schools
func NewSchoolCollection() *SchoolCollection {
	return &SchoolCollection{
		Schools: []*School{},
	}
}

// Returns the index of the school with the given id or -1 if not found
func (sc *SchoolCollection) GetSchoolIndex(id string) int {
	for i, school := range sc.Schools {
		if school.ID == id {
			return i
		}
	}
	return -1
}

// Returns the school with the given id or nil if not found
func (sc *SchoolCollection) GetSchool(id string) *School {
	index := sc.GetSchoolIndex(id)
	if index == -1 {
		return nil
	}
	return sc.Schools[index]
}

// Lists all schools
func (sc *SchoolCollection) ListSchools() []*School {
	return sc.Schools
}

// Adds a school to the collection
func (sc *SchoolCollection) AddSchool(name string) (*School, error) {
	id, err := gonanoid.New()
	if err != nil {
		return nil, err
	}
	newSchool := &School{
		ID:  id,
		Name: name,
	}
	sc.Schools = append(sc.Schools, newSchool)
	return newSchool, nil
}

// Deletes the school with the given id or returns an error if not found
func (sc *SchoolCollection) DeleteSchool(id string) error {
	index := sc.GetSchoolIndex(id)
	if index == -1 {
		return errors.New("school not found")
	}
	sc.Schools = append(sc.Schools[:index], sc.Schools[index+1:]...)
	return nil
}

// Updates the school with the given id or returns an error if not found
func (sc *SchoolCollection) UpdateSchool(id string, name string) (*School, error) {
	index := sc.GetSchoolIndex(id)
	if index == -1 {
		return nil, errors.New("school not found")
	}
	sc.Schools[index].Name = name
	return sc.Schools[index], nil
}