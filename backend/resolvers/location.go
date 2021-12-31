package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph/generated"
)

func (r *holeResolver) Number(ctx context.Context, obj *db.Hole) (int32, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *holeResolver) Name(ctx context.Context, obj *db.Hole) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *holeResolver) Par(ctx context.Context, obj *db.Hole) (int32, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *locationResolver) Holes(ctx context.Context, obj *db.Location) ([]*db.Hole, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Location(ctx context.Context, id int64) (*db.Location, error) {
	for _, loc := range r.locations {
		if loc.ID == id {
			return loc, nil
		}
	}
	return nil, nil
}

func (r *queryResolver) Locations(ctx context.Context) ([]*db.Location, error) {
	return r.locations, nil
}

// Hole returns generated.HoleResolver implementation.
func (r *Resolver) Hole() generated.HoleResolver { return &holeResolver{r} }

// Location returns generated.LocationResolver implementation.
func (r *Resolver) Location() generated.LocationResolver { return &locationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type holeResolver struct{ *Resolver }
type locationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }