package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *mutationResolver) CreateAccount(ctx context.Context, nickname string, email string) (*db.Account, error) {
	var err error
	acc := &db.Account{
		Nickname: nickname,
		Email:    email,
	}
	acc.Id, err = r.Db.InsertAccount(ctx, acc)
	return acc, err
}

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

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
