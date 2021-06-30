import requests
from bs4 import BeautifulSoup
import string
import pprint
import operator
from collections import OrderedDict

class Solver:
    def __init__(self):
        pass
    def get_text(url):
        print(f"getting results from url {url}...")
        html = requests.get(url).text
        
        soup = BeautifulSoup(html, "html.parser")
        whole_text = soup.get_text()
        pprint.pprint(whole_text)
        return whole_text

    def get_counts(text):
        output = dict()
        trans = str.maketrans('', '', string.punctuation)
       
        x = 1
        lines = (subtext.lower().translate(trans) for subtext in text.split('\n'))
        while True:
            try:
                print(f"iteration {x}")
                line = next(lines)
                print("print line here")
                pprint.pprint(line)
                if line:
                    list_line = (w.strip(' ').replace('\n', '').replace('\r', '') for w in line.split(' '))  
                    for w in list_line:
                        if w != '':
                            print("word here")
                            pprint.pprint(w)
                            value = output.get(w, 0)
                            output[w] = value + 1                    
                    x = x + 1
            except StopIteration:
                break
        
        #pprint.pprint(output)
        return output
    
    # sort, options need ascending/descending, 
    # counts/lexicographical
    def sort_result(out, sort_type, des):
        if sort_type == 'counts':
            print("print sorted by counts")
            if des:
                return sorted(out.items(), key=operator.itemgetter(1),reverse=True)
            else:
                return sorted(out.items(), key=lambda item: item[1],reverse=des)
                
        #sorted(out, key=lambda kv:(kv[1], kv[0]), reverse=des)
        else: #lex order
            return sorted(out.items(),reverse=des)
    
    def format_text(out):
        return pprint.pformat(out).strip('[]').replace('(', '').replace(')', '').replace('\',', '\':')
        
    def count_from_url(url, sort_type, des):
        text = get_text(url)
        output_dict = get_counts(text)
        sorted_out = sort_result(output_dict, sort_type, des)
        return format_text(sorted_out)
    
if __name__ == "__main__":
    text = Solver.get_text("http://localhost:8888/static/rand-short.html")
    output = Solver.get_counts(text)
    in_str = Solver.sort_result(output, 'lex', False)
    sort = Solver.format_text(in_str)
    print("final result")
    pprint.pprint(sort)
    
    