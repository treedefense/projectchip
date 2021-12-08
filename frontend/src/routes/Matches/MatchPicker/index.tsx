import { GetMatches } from 'db';
import { matchesPath } from '../../paths';
import { useNavigate } from 'react-router-dom';

export function MatchPicker() {
    const navigate = useNavigate();
    const matches = GetMatches();

    return (
        <main>
            {matches.map(match => {
                return (
                    <button
                        key={match.id}
                        onClick={() => navigate(`${matchesPath}/${match.id}`)}
                    >
                        {match.id}
                    </button>
                );
            })}
        </main>
    )
}