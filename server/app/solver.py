import requests
from bs4 import BeautifulSoup
import string

def get_text(url):
    html = requests.get(url).text
    
    soup = BeautifulSoup(html, "html.parser")
    whole_text = soup.get_text()
    return whole_text

def get_counts(text):
    output = dict()
    trans = str.maketrans('', '', string.punctuation)
    lines = (line.lower().translate(trans) for line in text.split('\n'))
    list_line = (s.rstrip() for s in lines if s is not "\n" )
    for w in list_line:
        value = output.get(output[w], 0)
        output[w] = value + 1
    return output
   
# sort, options need ascending/descending, 
# alphabet/counts/lexicographical
def sort_result(out, sort_type, asc):
    if sort_type == 'alp':
        out = out.keys()
    elif sort_type == 'counts':
        out = out.values()
    else:
        out = out.items()
    return sorted(out, asc)

def count_from_url(url, sort_type, asc):
    text = get_text(url)
    output_dict = get_counts(text)
    return sort_result(output_dict, sort_type, asc)
