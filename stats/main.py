import re, sys
import difflib
import pandas as pd

DATABASE = [
    "United Schools", "Pépites", "Prologin", "Girls Can Code", "Solidarité Pyrénées", "Delta 7",
    "Nature En Jeux", "Génération Desensciel", "HexEco", "Ludothèque On Fait Un Jeu", "Patrimoine et Emploi",
    "#jesuislà", "Ateliers Amasco", "IDVETS Evreux", "NATURAMA", "LES RECITS DE CAHELA", "La Légende de Thessaba",
    "Les récoupettes", "Les Hotels Solidaires", "La Bénévolante", "Marion La main tendue",
    "Secours populaire Noeux les mines", "EHPAD Saint-Camille ARRAS", 
    "Secours populaire Haute Vienne",
    "EMERGENCE", "SEA Plastics", "Cithea", "Label Transition", "Emmaüs Défi", "A Fleur de Pierre", "L'EPOC","Bel'Karibeen",
]

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

def get_cleaned_comment(text: str) -> str:
    regex = "^je\s|\sje\s|nous|vote|votons|pour|bravo|merci|\stous\s|bonne chance|groupement|;"
    return re.sub(regex, "", text.lower())

def get_normalized_text(text, rules = {'à': 'a', 'é': 'e', 'è': 'e', 'ô': 'o', 'ü': 'u'}):
    if len(list(rules.keys())) == 0:
        return text

    regex = "|".join(list(rules.keys()))
    if not re.search(regex, text.lower()):
        return text

    first_key = list(rules.keys())[0]
    target, replace_by = first_key, rules[first_key]
    text = re.sub(target, replace_by, text.lower())
    new_rules = {k: v for k, v in rules.items() if k!= first_key}
    return get_normalized_text(text, new_rules)

def get_comments(datas: list) -> list:
    get_second_column = lambda x: re.sub("^.*;", "", x)
    return [get_second_column(data) for data in datas]

def get_match (text: str, database: list) -> str:
    matches = difflib.get_close_matches(text, database, 1, 0.1)
    if len(matches) == 0:
        return ""
    return matches[0]

def get_matches(comments: list) -> dict:
    normalized_database = [get_normalized_text(db) for db in DATABASE]

    matches = {key : [] for key in normalized_database}
    for comment in comments:
        cleaned_comment = get_cleaned_comment(get_normalized_text(comment))
        found = get_match(cleaned_comment, normalized_database)
        if found != '':
            matches[found].append(comment)
    return matches

def get_counts(matches: dict) -> dict:
    return {key: len(values) for key, values in matches.items()}

def get_counts_df(counts: dict) -> pd.DataFrame:
    df = pd.DataFrame(counts, index=['Votes']).T
    df = df.sort_values(by=['Votes'], ascending=False)
    return df

def main():
    datas = open('../data/output-v2.txt','r')
    datas = datas.read().splitlines()

    comments = get_comments(datas)
    matches = get_matches(comments)
    counts = get_counts(matches)
    df_counts = get_counts_df(counts)
    print(df_counts)
    #df_counts.to_excel("../data/occurences.xlsx")   

if __name__ == '__main__':
    main()

