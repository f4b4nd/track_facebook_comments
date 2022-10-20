import re, sys
import difflib

get_normalize_text = lambda x: re.sub("é", "e", re.sub("à", "a", re.sub("ü", "u", x.lower())))

database = [
    "United Schools", "Pépites", "Prologin", "Girls Can Code", "Solidarité Pyrénées", "Delta 7",
    "Nature En Jeux", "Génération Desensciel", "HexEco", "Ludothèque On Fait Un Jeu", "Patrimoine et Emploi",
    "#jesuislà", "Ateliers Amasco", "IDVETS Evreux", "NATURAMA", "LES RECITS DE CAHELA", "La Légende de Thessaba",
    "Les récoupettes", "Les Hotels Solidaires", "La Bénévolante", "Marion La main tendue",
    "Secours populaire Noeux les mines", "EHPAD Saint-Camille ARRAS", 
    "Secours populaire Haute Vienne",
    "EMERGENCE", "SEA Plastics", "Cithea", "Label Transition", "Emmaüs Défi", "A Fleur de Pierre", "L'EPOC","Bel'Karibeen",
]

database = [get_normalize_text(db) for db in database]

comments = [
    "Je vote pour EHPAD Saint-Camille Arras (FORCEMENT ! ) ",
    "Je vote pour Les Récoupettes !",
    "Generation d essentiel",
    "ehpad saint camille arras",
    "Bravo et bonne chance à tous. Nous votons pour Delta 7 !!",
    "Bravo et bonne chance à tous. Delta 7 !!",
    "Je vote le secours populaire de noeux les Mines",
    "Je vote sans hésitation pour l’Association Marion La main tendue",
    "On fait un jeu ? ",
    "On fait un jeu ?!",
    "Amasco",
    "Je vote pour CIThéA !",
    "CIThéA !",
    "CIThéA !",
    "CIThéA-groupement associatif",
]

get_cleaned_text = lambda x: re.sub("je|nous|vote|votons|pour|bravo|merci|tous|bonne chance|groupement|;", '', x.lower())

get_match = lambda s, db: difflib.get_close_matches(s, db, 1, 0.1)[0] if len(difflib.get_close_matches(s, db, 1, 0.1)) > 0 else ""

# matches = { comment: get_match(get_cleaned_text(get_normalize_text(comment)), database) for comment in comments}

matches = {key : [] for key in database}
for comment in comments:
    db = get_match(get_cleaned_text(get_normalize_text(comment)), database)
    if db != '':
        matches[db].append(comment)
print(matches)

sys.exit()
reversed_dict = {}
for key, value in matches.items():
    reversed_dict.setdefault(value, [])
    reversed_dict[value].append(key)

counts = {key: len(values) for key, values in reversed_dict.items()}

print (reversed_dict)
sys.exit()

########################

datas = open('../data/output-v2.txt','r')
datas = datas.read().splitlines()

get_second_column = lambda x: re.sub("^.*;", "", x)

comments = [get_second_column(data) for data in datas]

matches = { comment: get_match(get_cleaned_text(get_normalize_text(comment)), database) for comment in comments }

reversed_dict = {}
for key, value in matches.items():
    reversed_dict.setdefault(value, [])
    reversed_dict[value].append(key)

counts = {key: len(values) for key, values in reversed_dict.items()}

print(reversed_dict)