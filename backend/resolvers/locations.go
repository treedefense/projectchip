package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"math/rand"

	"github.com/treedefense/projectchip/graph/generated"
	"github.com/treedefense/projectchip/graph/model"
)

func (r *mutationResolver) CreateLocation(ctx context.Context, name string, holes []*model.HoleInputs) (*model.Location, error) {
	var locHoles []*model.Hole
	for _, h := range holes {
		locHoles = append(locHoles, &model.Hole{
			ID:     fmt.Sprintf("%v", rand.Int()),
			Name:   h.Name,
			Number: h.Number,
			Par:    h.Par,
		})
	}

	loc := &model.Location{
		ID:    fmt.Sprintf("%v", len(r.locations)),
		Name:  name,
		Holes: locHoles,
	}
	r.locations = append(r.locations, loc)
	return loc, nil
}

func (r *queryResolver) Locations(ctx context.Context) ([]*model.Location, error) {
	return r.locations, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
