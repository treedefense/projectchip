import { useNavigate } from "react-router-dom";

export function ChooseCreateMatch() {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => {navigate("/match/course")}}>
        New Match
      </button>
    </main>
  )
}
