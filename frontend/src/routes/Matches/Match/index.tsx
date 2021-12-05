import { GetMatch } from "db";
import { useParams } from "react-router-dom";
import { matchIdKey } from '../../paths';
import './Match.css'

export function Match() {
    const params = useParams();
    const matchId = params[matchIdKey];

    if (!matchId) {
        return <div></div>
    }

    const match = GetMatch(parseInt(matchId, 10));
    console.log(match);

    return (
      <main>
        <h2>This Match</h2>
        <div className="container">
            <div>1</div>
            <div>3</div>
            <div>5</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
            <div>3</div>
            <div>4</div>
            <div>4</div>
        </div>
      </main>
    );
  }