import requests
from bs4 import BeautifulSoup
import operator
from collections import OrderedDict
import string
from pprint import pformat

def get_text(url):
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")
    whole_text = soup.get_text()
    return whole_text

def get_counts(text):
    """ parses and collect word counts """
    output = dict()
    trans = str.maketrans('', '', string.punctuation)
    
    lines = (subtext.lower().translate(trans) for subtext in text.split('\n'))
    while True:
        try:
            line = next(lines)
            if line:
                list_line = (w.strip(' ').replace('\n', '').replace('\r', '') for w in line.split(' '))  
                for w in list_line:
                    if w != '':
                        value = output.get(w, 0)
                        output[w] = value + 1                    
              
        except StopIteration:
            break
    
    return output

def sort_result(out, sort_type, des):
    """ sort by counts and lesicographical order, in ascending and descending order"""
    if sort_type == 'counts':
        if des:
            return sorted(out.items(), key=operator.itemgetter(1),reverse=True)
        else:
            return sorted(out.items(), key=lambda item: item[1],reverse=des)
        
    #sorted(out, key=lambda kv:(kv[1], kv[0]), reverse=des)
    else: #lex order
        return sorted(out.items(),reverse=des)

def format_text(out):
    return pformat(out).strip('[]').replace('(', '').replace(')', '').replace('\',', '\':')
    
def count_from_url(url, sort_type, des):
    text = get_text(url)
    output_dict = get_counts(text)
    sorted_out = sort_result(output_dict, sort_type, des)
    return format_text(sorted_out)