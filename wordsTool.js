let letters = {
    'N': 'Noun',
    'V': 'Verb',
    "ADJ": 'Adjective',
    'ADV': 'Abverb',
    "VPAR": 'Verb Participle',
    'X': "All, None, or Unknown",
    'PRON': 'Pronoun',
    'PACK': 'Packon',
    'NUM': 'Numeral',
    'SUPINE': 'Supine',
    'PREP': 'Preposition',
    'CONJ': 'Conjunction',
    'INTERJ': 'Interjection',
    'TACKON': 'Tackon',
    'PREFIX': 'Prefix',
    'SUFFIX': 'Suffix'
}
let nounType = ['N', "ADJ", "VPAR", 'PRON']
let cases = {
    'NOM': 'Nominative',
    'GEN': 'Genitive (of)',
    'DAT': 'Dative (to/for)',
    'ACC': 'Accusative',
    'ABL': 'Ablative (with/by/from)',
    'VOC': 'Vocative',
    'X': "All, None, or Unknown",
    'LOC': 'Locative'
}
let number = {
    'S': 'Singular',
    'P': 'Plural',
    'X': "All, None, or Unknown"
}
let gender = {
    'M': 'Masculine',
    'F': 'Feminine',
    'N': 'Neuter',
    'X': "All, None, or Unknown",
    'C': 'Common (masculine and/or feminine)'
}
let comparison = {
    'X': "All, None, or Unknown",
    'POS': 'Positive',
    'COMP': 'Comparative',
    'SUPER': 'Superlative'
}
let verbType = ['V']
let tense = {
    'X': "All, None, or Unknown",
    'PRES': 'Present',
    'IMPF': 'Imperfect (was/were)',
    'FUT': 'Future (will)',
    'PERF': 'Perfect (has/have)',
    'PLUP': 'Pluperfect (had)',
    'FUTP': 'Future Perfect'
}
let voice = {
    'X': "All, None, or Unknown",
    'ACTIVE': 'Active',
    'PASSIVE': 'Passive'
}
let mood = {
    'X': "All, None, or Unknown",
    'IND': 'Indicative',
    'SUB': 'Subjunctive',
    'IMP': 'Imperfect',
    'INF': 'Infinitive',
    'PPL': 'Participle'
}
let person = {
    '1': 'First Person',
    '2': 'Second Person',
    '3': 'Third Person',
    'X': "All, None, or Unknown"
}
let numType = {
    'X': "All, None, or Unknown",
    'CARD': 'Cardinal',
    'ORD': 'Ordinal',
    'DIST': 'Distibutive',
    'ADVERB': 'Numeral Adverb'
}

function ordinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function getOutput(words) {
    let output = document.querySelector("#result > div > div > pre").innerHTML;
    return output;
}

function setOut(data) {
    let revised = []
    if (data != '') {
        for (let line of getOutput(data).split('\n')) {
            for (let item of getLine(data, line)) {
                revised.push(item)
            }
        }
        return revised
    }
}

function getLine(data, line) {
    let revised = [];
    let args = line.split(' ')
    args = args.filter(Boolean);

    if (line != '') {
        if (args[args.length - 1] == 'UNKNOWN') {
            revised.push(data.toUpperCase() + ':');
            revised.push('UNKNOWN')
        } else {
            if (args[1] in letters) {
                revised.push('');
                revised.push(args[0].toUpperCase() + ':');
                revised.push('Part of Speech: ' + letters[args[1]])
                if (nounType.includes(args[1])) {
                    if (args[1] != "VPAR") {
                        if (parseInt(args[2]) > 5) {
                            revised.push('Declension: 1st and 2nd')
                        } else {
                            revised.push('Declension: ' + ordinal(parseInt(args[2])))
                            revised.push('Form: ' + ordinal(parseInt(args[3])))
                        }
                    } else {
                        if (parseInt(args[2]) > 4) {
                            revised.push('Conjugation: Irregular')
                        } else {
                            revised.push('Conjugation: ' + ordinal(parseInt(args[2])))
                            revised.push('Declension: ' + ordinal(parseInt(args[3])))
                        }
                    }
                    revised.push('Case: ' + cases[args[4]]);
                    revised.push('Number: ' + number[args[5]]);
                    revised.push('Gender: ' + gender[args[6]])
                    if (args[1] == "ADJ") {
                        revised.push('Comparison: ' + comparison[args[7]])
                    }
                    if (args[1] == "VPAR") {
                        revised.push('Tense: ' + tense[args[7]])
                        if ('Voice: ' + voice[args[8]] !== undefined) {
                            revised.push('Voice: ' + voice[args[8]]);
                            offset = 0;
                        } else {
                            revised.push('Voice: Deponent(Active, looks like Passive)');
                            offset = -1;
                        }
                        revised.push('Mood: ' + mood[args[9 + offset]])
                    }
                } else if (verbType.includes(args[1])) {
                    if (parseInt(args[2]) > 4) {
                        revised.push('Conjugation: Irregular')
                    } else {
                        revised.push('Conjugation: ' + ordinal(parseInt(args[2])))
                    }
                    revised.push('Form: ' + ordinal(parseInt(args[3])))
                    revised.push('Tense: ' + tense[args[4]])
                    if ('Voice: ' + voice[args[5]] !== undefined) {
                        revised.push('Voice: ' + voice[args[5]]);
                        offset = 0;
                    } else {
                        revised.push('Voice: Deponent(Active, looks like Passive)');
                        offset = -1;
                    }
                    revised.push('Mood: ' + mood[args[6 + offset]])
                    if (['IND', 'IMP'].includes(args[6 + offset])) {
                        revised.push('Person: ' + ordinal(parseInt(args[7 + offset])));
                        revised.push('Number: ' + number[args[8 + offset]])

                    }
                } else if (args[1] == 'PREP') {
                    revised.push('Case: ' + cases[args[2]])
                } else if (args[1] == 'NUM') {
                    revised.push('Numeral Type: ' + numType[args[7]])
                }
            } else {
                revised.push(line)
            }
        }

    }
    return revised
}
output = setOut('word').join('\n')
console.log(output)
document.querySelector("#result > div > div > pre").innerHTML = output