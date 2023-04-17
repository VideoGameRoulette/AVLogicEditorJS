import json
from typing import List

def sort_flags_by_count_and_value(flags: List[int]) -> List[int]:
    counts = {}
    for flag in flags:
        count = bin(flag).count('1')
        if count in counts:
            counts[count].append(flag)
        else:
            counts[count] = [flag]
    sorted_flags = []
    for count in sorted(counts.keys()):
        sorted_flags.extend(sorted(counts[count]))
    return sorted_flags

with open('locations_custom.json', 'r') as f:
    data = json.load(f)

for item in data:
    item['requiredPowers'] = sort_flags_by_count_and_value(item['requiredPowers'])

with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
