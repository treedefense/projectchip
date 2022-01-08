package resolvers

import (
	"github.com/treedefense/projectchip/db"
)

// Temporarily create one function each time we need to convert
// a slice to a slice of pointers until we get generics in 1.18

func AccountsToSlicePointer(orig []db.Account, err error) ([]*db.Account, error) {
	if err != nil {
		return nil, err
	}

	ret := make([]*db.Account, len(orig))
	for i := range orig {
		ret[i] = &orig[i]
	}
	return ret, nil
}

func LocationsToSlicePointer(orig []db.Location, err error) ([]*db.Location, error) {
	if err != nil {
		return nil, err
	}

	ret := make([]*db.Location, len(orig))
	for i := range orig {
		ret[i] = &orig[i]
	}
	return ret, nil
}

func CoursesToSlicePointer(orig []db.Course, err error) ([]*db.Course, error) {
	if err != nil {
		return nil, err
	}

	ret := make([]*db.Course, len(orig))
	for i := range orig {
		ret[i] = &orig[i]
	}
	return ret, nil
}

func HolesToSlicePointer(orig []db.Hole, err error) ([]*db.Hole, error) {
	if err != nil {
		return nil, err
	}

	ret := make([]*db.Hole, len(orig))
	for i := range orig {
		ret[i] = &orig[i]
	}
	return ret, nil
}
