from flask import Flask, render_template, request, jsonify
import os ,random ,time , json



def addNewDictionaryElement(Dictionary, DictionaryTitleList , DictionaryValueList):
	for index in range(0,len(DictionaryTitleList)-1,1) :
		DictionaryKey = DictionaryTitleList[index]
		Dictionary[DictionaryKey]=DictionaryValueList[index] # ex : {"a":"a", "b":"b" , "c":"c"}

def addDic(DictionaryTitleList , DictionaryValueList):
	Dictionary = {}
	for i in range(0,len(DictionaryTitleList)-1,1) :
		key = DictionaryTitleList[i]
		value = DictionaryValueList[i]
		Dictionary.update({key : value})
	return 	Dictionary		
		
		

def momitor_read():
    print "momitor_read"
    aa = [[],[],[]]	
    MonitorFile = open("/share/Public/md.log", "r")
    DictionaryIndex=0
    isTitle = 0
    aa_index = 0
    for MonitorFileReadLine in MonitorFile.readlines():
    	if(MonitorFileReadLine=='start\n'): 
            isTitle = 1
            aa_index = aa_index+1
    	elif(MonitorFileReadLine=='end\n'):	
    		break		
        else :
            if(isTitle==1):
                DictionaryTitleList= MonitorFileReadLine.replace(" ","").replace("\n","").split(",")
                isTitle = 0
            else:
                DictionaryValueList = MonitorFileReadLine.replace(" ","").replace("\n","").split(",")
                aa[aa_index-1].append(addDic(DictionaryTitleList,DictionaryValueList))
    aaa = {"first":aa[0] ,"middle":aa[1], "last":aa[2]}			
    return aaa


app = Flask(__name__)



@app.route('/hello_py', methods=['GET', 'POST'])
def iidex():
    if request.method == "POST":
        arge = json.loads(request.data)
        command =arge['cmd']
        print arge		
        print command
        os.system(command)
    return render_template('index.html')

		
@app.route('/get_qos_queue_data')
def qosqueue():
    f = file("/share/Public/queue.txt")
    s= json.load(f)
    return jsonify(hh = s)
	
@app.route('/get_qos_rules_data')
def qosrules():
    f = file("/share/Public/rules.txt")
    s= json.load(f)
    return jsonify(hh = s)

@app.route('/get_firwall_Status_data')
def firewallstatus():
    f = file("/share/Public/FirweallStatus.txt")
    s= json.load(f)
    return jsonify(hh = s)

@app.route('/get_firwall_rules_data')
def firewallrules():
    f = file("/share/Public/FirweallRule.txt")
    s= json.load(f)
    return jsonify(hh = s)	

@app.route('/monitor')
def monitor():
    MonitorData = momitor_read()     
    return jsonify(MonitorData)
    time.sleep(2)

@app.route('/echo')
def echo():
    i = random.randint(0,2)
    if i == 0:
        return jsonify(state="ok")
    return jsonify(state="no")


if __name__ == '__main__':
    app.run(host='140.118.20.158' ,port=90)
    #app.run(host='0.0.0.0' ,port=90)	
    #app.run(port=90)	