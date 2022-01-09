package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/opendoor/pggen/include"
	"github.com/treedefense/projectchip/db"
	"github.com/treedefense/projectchip/graph"
)

func (r *matchResolver) Course(ctx context.Context, obj *db.Match) (*db.Course, error) {
	err := r.Db.MatchFillIncludes(ctx, obj, include.Must(include.Parse("matches.course")))
	if err != nil {
		return nil, err
	}
	return obj.Course, nil
}

func (r *matchResolver) Participants(ctx context.Context, obj *db.Match) ([]*db.Account, error) {
	return AccountsToSlicePointer(r.Db.GetMatchParticipants(ctx, obj.Id))
}

func (r *matchResolver) Strokes(ctx context.Context, obj *db.Match) ([]*db.MatchStroke, error) {
	return MatchStrokesToSlicePointer(r.Db.GetStrokesForMatch(ctx, obj.Id))
}

// Match returns graph.MatchResolver implementation.
func (r *Resolver) Match() graph.MatchResolver { return &matchResolver{r} }

type matchResolver struct{ *Resolver }
