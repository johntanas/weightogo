from bs4 import BeautifulSoup
import re
def insert_food(con,html_doc):
    cur = con.cursor()
    soup = BeautifulSoup(html_doc, 'html.parser')
    for i in soup.findAll("div",{"class":"MuiBox-root css-1cheb17"}):
        name= i.find("p",{"class":"css-qumjp8"}).text
        values={}
        values["name"]=name
        cond=1
        for j in i.findAll("p",{"class":"MuiTypography-root MuiTypography-body1 css-w1kjmb"}):
            if cond:
                cond=0
                val=re.search("[^,]*$",j.text).group(0).strip()
                values["size"]=val
            else:
                key,val= j.text.split(": ")
                out=re.findall("\d+",val)
                values[key]=float(".".join(out))
        columns = ', '.join(values.keys())
        placeholders = ', '.join('?' * len(values))
        sql = 'INSERT OR REPLACE INTO food ({}) VALUES ({})'.format(columns, placeholders)
        values = [int(x) if isinstance(x, bool) else x for x in values.values()]
        cur.execute(sql, values)
    con.commit()