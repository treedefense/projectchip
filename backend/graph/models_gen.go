// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package graph

type CourseInputs struct {
	Name  string        `json:"name"`
	Holes []*HoleInputs `json:"holes"`
}

type HoleInputs struct {
	CourseOrder int32 `json:"course_order"`
	Par         int32 `json:"par"`
}

type NewMatch struct {
	CourseID       int64   `json:"course_id"`
	ParticipantIds []int64 `json:"participant_ids"`
	HoleIds        []int64 `json:"hole_ids"`
}
