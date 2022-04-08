package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/opendoor/pggen"
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

func (r *mutationResolver) CreateLocation(ctx context.Context, name string, courses []*graph.CourseInputs) (int64, error) {
	loc := &db.Location{
		Name: name,
	}

	locId, err := r.Db.InsertLocation(ctx, loc)
	if err != nil {
		return 0, err
	}

	for _, courseInput := range courses {
		c := &db.Course{
			LocationId: &locId,
			Name:       courseInput.Name,
		}
		courseId, err := r.Db.InsertCourse(ctx, c)
		if err != nil {
			return 0, err
		}

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
			return 0, err
		}
	}

	return locId, nil
}

func (r *mutationResolver) CreateMatch(ctx context.Context, newMatch *graph.NewMatch) (int64, error) {
	/*
	the first participant = the sender of the request
	require JWT ( session id ) check that the participant that you passed in, is you
	as a validation step
	*/
	var err error
	match := &db.Match{
		CourseId: &newMatch.CourseID,
	}

	_, err = r.Db.GetCourse(ctx, newMatch.CourseID)
	if err != nil {
		return 0, err
	}

	matchId, err := r.Db.InsertMatch(ctx, match)
	if err != nil {
		return 0, err
	}

	var participants []db.MatchParticipant
	var strokes []db.MatchStroke
	for _, aId := range newMatch.ParticipantIds {
		participants = append(participants, db.MatchParticipant{
			MatchId:   matchId,
			AccountId: aId,
		})
		for i, holeId := range newMatch.HoleIds {
			strokes = append(strokes, db.MatchStroke{
				MatchId:    matchId,
				AccountId:  aId,
				HoleId:     holeId,
				Strokes:    0,
				MatchOrder: int64(i),
			})
		}
	}

	_, err = r.Db.BulkInsertMatchParticipant(ctx, participants)
	if err != nil {
		return 0, err
	}

	r.Db.BulkInsertMatchStroke(ctx, strokes)
	if err != nil {
		return 0, err
	}

	return matchId, nil
}

func (r *mutationResolver) PushStrokes(ctx context.Context, id int64, strokes int32) (int64, error) {
	updateFields := pggen.NewFieldSet(1).
		Set(db.MatchStrokeIdFieldIndex, true).
		Set(db.MatchStrokeStrokesFieldIndex, true)
	r.Db.UpdateMatchStroke(ctx, &db.MatchStroke{Id: id, Strokes: int64(strokes)}, updateFields)
	return id, nil
}

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
