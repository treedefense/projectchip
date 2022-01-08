package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/opendoor/pggen/include"
	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *courseResolver) Holes(ctx context.Context, obj *db.Course) ([]*db.Hole, error) {
	err := r.Db.CourseFillIncludes(ctx, obj, include.Must(include.Parse("courses.holes")))
	if err != nil {
		return nil, err
	}
	return obj.Holes, nil
}

func (r *locationResolver) Courses(ctx context.Context, obj *db.Location) ([]*db.Course, error) {
	err := r.Db.LocationFillIncludes(ctx, obj, include.Must(include.Parse("locations.courses")))
	if err != nil {
		return nil, err
	}
	return obj.Courses, nil
}

// Course returns graph.CourseResolver implementation.
func (r *Resolver) Course() graph.CourseResolver { return &courseResolver{r} }

// Location returns graph.LocationResolver implementation.
func (r *Resolver) Location() graph.LocationResolver { return &locationResolver{r} }

type courseResolver struct{ *Resolver }
type locationResolver struct{ *Resolver }
