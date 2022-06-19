import sys

# Build a 2-dimensional bar chart
# The x-axis is the character in use.
# The y-axis is the number of occurrences of that character.
# The output of this can be pasted directly into google sheets
# and you should be able to make a 3 dimensional scatter plot of it.
def print_character_frequency(password_gen):
    # Build the scatter plot
    counts = {}
    for password in password_gen:
        for idx, character in enumerate(password):
            if character not in counts:
                counts[character] = 1
            else:
                counts[character] += 1

    # Print out a TSV with our desired data
    for character, count in counts.items():
        print(f"{character}\t{count}")

# Build a table that has the count of each character in each position.
# The x-axis is the character
# The y-axis is the position
# The value is the number of occurrences
def print_character_by_position_frequency(password_gen, max_length):
    counts = {}
    for password in password_gen:
        for idx, character in enumerate(password):
            if character not in counts:
                counts[character] = [0] * max_length
            counts[character][idx] += 1

    # Print character positions
    header = "\t".join([str(i) for i in range(0, max_length)])
    print(f"\t{header}")

    for character, position_data in counts.items():
        row = "\t".join([str(i) for i in position_data])
        print(f"{character}\t{row}")

def get_max_length(password_gen):
    max_length = 0
    for password in password_gen:
        max_length = max(max_length, len(password))
    return max_length

def password_generator(filename):
    with open(filename, 'r') as f:
        for p in f:
            yield p.strip()

if len(sys.argv) < 2:
    print(f"Usage: python {sys.argv[0]} <PASSWORD_FILE>")
    exit(1)

filename = sys.argv[1]
if len(sys.argv) > 2:
    max_length = get_max_length(password_generator(filename))
    print_character_by_position_frequency(password_generator(filename), max_length)
else:
    print_character_frequency(password_generator(filename))
