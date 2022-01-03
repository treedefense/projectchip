package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *mutationResolver) CreateLocation(ctx context.Context, name string, courses []*graph.CourseInputs) (*db.Location, error) {
	loc := &db.Location{
		Name: name,
	}

	locId, err := r.Db.InsertLocation(ctx, loc)
	if err != nil {
		return nil, err
	}

	loc.Id = locId

	for _, courseInput := range courses {
		c := &db.Course{
			LocationId: &locId,
			Name:       courseInput.Name,
		}
		courseId, err := r.Db.InsertCourse(ctx, c)
		if err != nil {
			return nil, err
		}

		c.Id = courseId

		var holes []db.Hole
		for _, holeInput := range courseInput.Holes {
			holes = append(holes, db.Hole{
				CourseOrder: int64(holeInput.CourseOrder),
				Par:         int64(holeInput.Par),
				CourseId:    &courseId,
			})
		}

		_, err = r.Db.BulkInsertHole(ctx, holes)
		if err != nil {
			return nil, err
		}
	}

	return loc, nil
}

func (r *queryResolver) Location(ctx context.Context, id int64) (*db.Location, error) {
	return r.Db.GetLocation(ctx, id)
}

func (r *queryResolver) Locations(ctx context.Context) ([]*db.Location, error) {
	pls, err := r.Db.GetAllLocations(ctx)
	if err != nil {
		return nil, err
	}

	var locs []*db.Location
	for i := range pls {
		locs = append(locs, &pls[i])
	}
	return locs, nil
}

func (r *queryResolver) Course(ctx context.Context, id int64) (*db.Course, error) {
	return r.Db.GetCourse(ctx, id)
}

func (r *queryResolver) Hole(ctx context.Context, id int64) (*db.Hole, error) {
	return r.Db.GetHole(ctx, id)
}

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
