package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *queryResolver) Account(ctx context.Context, id int64) (*db.Account, error) {
	return r.Db.GetAccount(ctx, id)
}

func (r *queryResolver) Location(ctx context.Context, id int64) (*db.Location, error) {
	return r.Db.GetLocation(ctx, id)
}

func (r *queryResolver) Locations(ctx context.Context) ([]*db.Location, error) {
	return LocationsToSlicePointer(r.Db.GetAllLocations(ctx))
}

func (r *queryResolver) CoursesAtLocation(ctx context.Context, id int64) ([]*db.Course, error) {
	return CoursesToSlicePointer(r.Db.GetCoursesAtLocation(ctx, id))
}

func (r *queryResolver) HolesAtCourse(ctx context.Context, id int64) ([]*db.Hole, error) {
	return HolesToSlicePointer(r.Db.GetHolesAtCourse(ctx, id))
}

func (r *queryResolver) Course(ctx context.Context, id int64) (*db.Course, error) {
	return r.Db.GetCourse(ctx, id)
}

func (r *queryResolver) Hole(ctx context.Context, id int64) (*db.Hole, error) {
	return r.Db.GetHole(ctx, id)
}

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
