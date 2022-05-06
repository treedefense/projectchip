import { matchesPath } from '../../paths';
import { useNavigate } from 'react-router-dom';
import { useGetMyMatchesQuery } from '../../../graphql';

export function MatchPicker() {
    const navigate = useNavigate();
    const { data, loading, error } = useGetMyMatchesQuery();

    return (
        <main>
            { loading && <div>Loading matches</div> }
            { error && <div>Unable to load matches</div> }
            { data && !data.matchesForAccount && <div>Unable to find matches</div> }
            {data?.matchesForAccount?.map(match => {
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