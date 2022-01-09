package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *queryResolver) Account(ctx context.Context, accountID int64) (*db.Account, error) {
	return r.Db.GetAccount(ctx, accountID)
}

func (r *queryResolver) Location(ctx context.Context, locationID int64) (*db.Location, error) {
	return r.Db.GetLocation(ctx, locationID)
}

func (r *queryResolver) Locations(ctx context.Context) ([]*db.Location, error) {
	return LocationsToSlicePointer(r.Db.GetAllLocations(ctx))
}

func (r *queryResolver) CoursesAtLocation(ctx context.Context, locationID int64) ([]*db.Course, error) {
	return CoursesToSlicePointer(r.Db.GetCoursesAtLocation(ctx, locationID))
}

func (r *queryResolver) HolesAtCourse(ctx context.Context, courseID int64) ([]*db.Hole, error) {
	return HolesToSlicePointer(r.Db.GetHolesAtCourse(ctx, courseID))
}

func (r *queryResolver) Course(ctx context.Context, courseID int64) (*db.Course, error) {
	return r.Db.GetCourse(ctx, courseID)
}

func (r *queryResolver) Hole(ctx context.Context, holeID int64) (*db.Hole, error) {
	return r.Db.GetHole(ctx, holeID)
}

func (r *queryResolver) Match(ctx context.Context, matchID int64) (*db.Match, error) {
	return r.Db.GetMatch(ctx, matchID)
}

func (r *queryResolver) MatchesForAccount(ctx context.Context, accountID int64) ([]*db.Match, error) {
	matches, err := MatchesToSlicePointer(r.Db.GetMatchesForAccount(ctx, accountID))
	if err != nil {
		return nil, err
	}

	err = r.Db.MatchBulkFillIncludes(ctx, matches, db.MatchAllIncludes)

	return matches, err
}

func (r *queryResolver) MatchStrokes(ctx context.Context, matchID int64) ([]*db.MatchStroke, error) {
	strokes, err := MatchStrokesToSlicePointer(r.Db.GetStrokesForMatch(ctx, matchID))
	if err != nil {
		return nil, err
	}

	err = r.Db.MatchStrokeBulkFillIncludes(ctx, strokes, db.MatchStrokeAllIncludes)

	return strokes, err
}

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
