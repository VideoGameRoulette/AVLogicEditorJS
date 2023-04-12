import Powers from 'components/Powers';

export default function MyComponent({ selectedPower, setSelectedPower }) {

    return (
        <div className="dropdown-container bg-gray-800 text-white px-4 py-2 w-full">
            <label htmlFor="powers" className="block mb-2">
                Select a power:
            </label>
            <select
                id="powers"
                value={selectedPower}
                onChange={(e) => setSelectedPower(parseInt(e.target.value))}
                className="block w-full bg-gray-700 text-white rounded-md py-1 px-2 text-base cursor-pointer"
            >
                {Object.entries(Powers).map(([key, value]) => (
                    <option key={key} value={value}>
                        {key}
                    </option>
                ))}
            </select>

            <p className="selected-power mt-2">
                You have selected:{' '}
                {Object.keys(Powers).find((key) => Powers[key] === selectedPower)}
            </p>
        </div>
    );
}
