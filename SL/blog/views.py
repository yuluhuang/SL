#coding:utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from SL.blog.models import Users,Theme,Task,Collection,Info,Item,Note,Tel,Nu,ProxyIp
from django.conf import settings#must path
from django.views.decorators.csrf import csrf_exempt
import uuid
import os
from django.core import serializers
import json
#settings.MEDIA_ROOT sl/sl
#BASEDIR=os.path.dirname(__file__)#Return the directory name of pathname path.
# Create your views here.

'''
'''
@csrf_exempt
def index(req):
    return render_to_response('index.html',{})


'''
'''
@csrf_exempt
def loginhtml(req):
    return render_to_response('login.html',{})

'''
登录处理
'''
@csrf_exempt
def login(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    userId = req.POST.get('username')#从post上来的数据中取出
    password = req.POST.get('password')
    u=Users.objects.filter(userId__exact=userId,password__exact=password)
    '''
    [{"fields": {"introduction": "1", "phone": "1", "password": "a", "identity": "1", "salt": "11", "icon": "1", "userId": "a", "Email": "504367857@qq.com", "motto": "1", "name": "1", "qq": "1"}, "pk": 1, "model": "blog.users"}]
    '''
    if u:
        req.session['username']=userId
        return HttpResponse('[{"code":"1","user":['+Users.objects.get(Id="1").toJSON()+']}]', mimetype='application/javascript')#response
    else:
        return HttpResponse(userId,mimetype='application/javascript')

'''
'''
@csrf_exempt
def logout(req):
    response=HttpResponse()
    response['Content-type']='text/plain'
    try:
        if 'username' in req.session:
            del req.session['username']
        response.write('[{"code":"logout"}]')
    except KeyError:
        response.write('[{"code":"0"}]')

    return response



'''
是否登录状态
'''
@csrf_exempt
def islogin(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    if req.session['username']:
        response.write('[{"code":"1","username":"'+req.session['username']+'"}]')

    else:
        response.write('[{"code":"0"}]')
    return response

'''
note编写页面
'''
@csrf_exempt
def notehtml(req):
    return render_to_response('note.html',{})


@csrf_exempt
def collecthtml(req):
    if req.method=='POST':
        return render_to_response('mycollect.html',{})
    else:
        #collection=Collection.objects.get(collectId="1")
        #return HttpResponse(collection.collectId, mimetype='application/javascript')#response
        return render_to_response('mycollect.html',{})





@csrf_exempt
def getcollect(req):
    collection=Collection.objects.get(collectId="1")
    #return HttpResponse(json.dumps(collection,ensure_ascii = False), mimetype='application/javascript')#response object
    return HttpResponse('[{"collect":['+collection.toJSON()+']}]', mimetype='application/javascript')#response
    #return HttpResponse(serializers.serialize("json", Collection.objects.get(collectId="1")), mimetype='application/javascript')#response

@csrf_exempt
def myhomehtml(req):
    return render_to_response('myhome.html',{})

@csrf_exempt
def mydetailshtml(req):
    return render_to_response('mydetails.html',{})


@csrf_exempt
def upload_img(request):
	if request.method == 'POST':
		for field_name in request.FILES:
			uploaded_file = request.FILES[field_name]#name

			file_ext = (request.FILES['Filedata'].name.split('.')[-1])#文件后缀
			file_name=str(uuid.uuid1())#newName
			newFileName=file_name+'.'+file_ext#newfilename

			path=os.path.join(settings.MEDIA_ROOT,'./static/uploads/s/')
			if not os.path.exists(path):
				os.mkdir(path)
			destination_path =os.path.join(path,'%s'% newFileName)
			destination = open(destination_path, 'wb+')
			for chunk in uploaded_file.chunks():
				destination.write(chunk)
			destination.close()
			#write.response(destination_path)
			#context.Response.Write(destination_path);
		return HttpResponse('/static/uploads/s/'+newFileName) #render_to_response('uploadify.html',{})#HttpResponse("ok", mimetype="text/plain")
	else:
		return render_to_response('uploadify.html',{})#HttpResponse("ok", mimetype="text/plain")
'''
前台传值x（左边距），y（上边距），w（切图的图宽），h（切图的图高）div_w(用来显示图片的框框的大小，用来计算比例)
box的四个参数为左上角和右下角距（0,0）的距离
'''
@csrf_exempt
def cutimage(request):
    response=HttpResponse()
    response['Content-type']="text/plain"
    path=''
    marginTop=0
    marginLeft=0
    width=0
    height=0
    if request.POST.get('x'):
        marginLeft=int(request.POST.get('x'))
    if request.POST.get('y'):
        marginTop=int(request.POST.get('y'))
    if request.POST.get('w'):
        width=int(request.POST.get('w'))
    if request.POST.get('h'):
        height=int(request.POST.get('h'))
    if request.POST.get('filepath'):
        path=request.POST.get('filepath')
    if request.POST.get('div_w'):#页面上显示图片的div的大小，不是图片的大小
        div_w=int(request.POST.get('div_w'))
    if request.POST.get('div_h'):
        div_h=int(request.POST.get('div_h'))

    #filepath=settings.MEDIA_ROOT+path
    filepath=settings.MEDIA_ROOT+path
    #filepath='/home/yuluhuang/python/two/two/resource/upload/c231dea2-4619-11e3-8ae3-000c29176c6b.jpg'
    houz=filepath[filepath.rfind('.'):]#获得后缀
    pathnofilename=filepath[0:filepath.rfind('\\')]#获得文件名前的路径
    from PIL import Image
    f = Image.open(settings.MEDIA_ROOT+path)
    xsize,ysize=f.size#原图宽高

    bilix=float(xsize)/float(div_w)
    biliy=float(ysize)/float(div_h)

    #box变量是一个四元组(左，上，右，下)都已（0，0）为起始点
    #等比例还原
    x=int(marginLeft*bilix)
    y=int(marginTop*biliy)
    w=int((marginLeft+width)*bilix)
    h=int((marginTop+height)*biliy)


    box=(x,y,w,h)

    import random
    import re
    f.crop(box).save(settings.MEDIA_ROOT+"/static/uploads/z/"+repr(random.randrange(1000))+".jpg")
    #f.crop(box).save(filepath)
    response.write(str(marginLeft)+","+str(marginTop)+","+str(x)+","+str(y)+","+str(w)+","+str(h))
    return response


'''
post note
'''
@csrf_exempt
def note(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    if req.method=='POST' and req.session["username"]:
        try:
            content=str(req.POST.get('content',''))
            tag=str(req.POST.get('tag',''))
            time=str(req.POST.get('time',''))
            title=str(req.POST.get('title',''))
            url=str(req.POST.get('url',''))
            n=Note.objects.create(noteTitle=title,noteUrl=url,noteContent=content,noteTime=time,noteTag=tag,userId=req.session['username'])
            #n.save()
            response.write('[{"code":"1"}]')
        except Exception:
            response.write('[{"code":"0"}]')
    return response

'''
noteSearchByUsername
'''
@csrf_exempt
def noteSearchByUsername(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    if req.method=='POST' and req.session["username"]:
        try:
            notes=Note.objects.filter(userId__exact=req.session['username'])
            response.write('[{"code":"1","notes":'+serializers.serialize("json", notes)+'}]')
        except Exception:
            response.write('[{"code":"'+Exception+'"}]')
    return response

'''
爬虫spider
'''



import time
@csrf_exempt
def splice(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    if req.method=='POST':
        try:
            bug(response)
            #time.sleep(1)
            #downloadd(txt1="1.txt",path='./1/',houz='.swf')

        except Exception:
            response.write('[{"code":"'+Exception+'"}]')
    return response



import urllib.request
import os
import re
from random import choice
import uuid
def bug(response):
    urlString=[]

    nu=Nu.objects.get(NId="1")
    #response.write(nu.NT)
    #return  response
    pc=int(nu.NT)
    nu.NT=pc+1

    nu.save()
    #response.write(serializers.serialize("json", nu))
    #return response
    phone='18267833656'
    length=len(str(pc))
    #response.write(length)
    #return response
    phone=phone[0:len(str(phone))-length]+str(pc)
    #response.write(phone)
    #return response
    url1=r'http://data.haoma.sogou.com/vrapi/query_number.php?number={0}&type=json&callback=show'.format(phone)

    time.sleep(1)

    iplists=['211.138.121.38:80','118.187.37.254:80','211.162.39.98:80','61.158.173.179:9999',
             '183.57.82.74:80','119.184.120.133:6015','115.238.164.208:8080','218.64.58.122:9999']
    ips=ProxyIp.objects.all()
    for ip in ips:
        iplists.append(ip.ip[:-1])

    #response.write(iplists)
    #return response
    ip=choice(iplists)
    #ip=''
    headers={
                 "GET":url1,
                 #"HOST":"",
                 "Referer":"http://www.python.org/",
                 "User-Agent":"Mozilla/5.0",
            }
    req=urllib.request.Request(url1)
    for key in headers:
         #return  response
         req.add_header(key,headers[key])

    proxy_handler = urllib.request.ProxyHandler({'http': 'http://'+ip})
    #proxy_auth_handler = urllib.request.ProxyBasicAuthHandler()
    # proxy_auth_handler.add_password('realm', 'host', 'username', 'password')
    opener = urllib.request.build_opener(proxy_handler)
    urllib.request.install_opener(opener)
    #response.write(ip)
    #return response

    html=urllib.request.urlopen(req).read().decode('utf-8')[5:-1]
    #html=json.dumps(html)
    #response.write(html)
    #return response

    txt=html.split('"')
    #response.write((txt[3]).encode('ascii'))
    #return response
    if txt[6][1:-1]=="0":
        #response.write(html)
        #return response
        
        tel=Tel.objects.create(text=html,telName=txt[3],telContent=phone,code=txt[6][1:-1])
        tel.save()
        bug(response)
    if txt[6][1:-1]=="403":
        #response.write(html)
        #return response
        time.sleep(10)
        nu=Nu.objects.get(NId="1")
        pc=int(nu.NT)
        nu.NT=pc-1
        nu.save()
        bug(response)

    #response.write(html)
    #return response
    #response.write(str(html))
    #return response
    #txt.write(str(html))


@csrf_exempt
def showTel(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    tel=Tel.objects.filter(telName__contains='6570')#
    #response.write(tel)
    #return response
    response.write('[{"tel":'+serializers.serialize("json", tel)+'}]')
    return response

@csrf_exempt
def showtelhtml(req):
    return render_to_response('showTel.html',{})

'''
爬代理ip
'''

@csrf_exempt
def spiderIp(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    url=r'http://cn-proxy.com/'
    parrent=r'<td>(.*?)</td>'
    '''
	html=urllib.request.urlopen('http://www.python.org').read().decode('utf-8')
	'''

    #通过url获取页面源码，通过正则表达式获取图片地址,存入文件
    time.sleep(1)
    iplists=['182.254.129.123:80']
    ip=choice(iplists)
    headers={
                 "GET":url,
                 #"HOST":"",
                 "Referer":"http://www.python.org/",
                 "User-Agent":"Mozilla/5.0",
            }
    req=urllib.request.Request(url)
    for key in headers:
        req.add_header(key,headers[key])

    proxy_handler = urllib.request.ProxyHandler({'http': 'http://'+ip})
    #proxy_auth_handler = urllib.request.ProxyBasicAuthHandler()
    #proxy_auth_handler.add_password('realm', 'host', 'username', 'password')
    opener = urllib.request.build_opener(proxy_handler)
    urllib.request.install_opener(opener)

    html=urllib.request.urlopen(req).read().decode('utf-8')
    #print(html)
    prog = re.compile(parrent)
    ss = prog.findall(html)
    #response.write(ss[5:])
    #return  response
    #ss=['182.254.129.123', '80', '广东 深圳', '2014-07-31 14:39:23', '121.10.120.135', '8001', '广东 ', '2014-07-31 14:35:34', '115.236.59.194', '3128', '浙江 杭州', '2014-07-31 14:35:36', '211.138.121.37', '84', '浙江 ', '2014-07-31 14:39:49', '211.152.50.70', '80', '上海 ', '2014-07-31 14:35:52', '218.89.170.110', '8888', '四川 攀枝花', '2014-07-31 14:39:52', '111.206.125.74', '8080', '北京 ', '2014-07-31 14:39:03', '218.204.131.250', '3128', '江西 南昌', '2014-07-31 14:37:06', '202.120.83.18', '9000', '上海 ', '2014-07-31 14:36:02', '115.28.213.143', '8000', '北京 ', '2014-07-31 14:36:48', '111.206.125.76', '8080', '北京 ', '2014-07-31 14:39:18', '111.206.125.77', '8080', '北京 ', '2014-07-31 14:39:16', '116.226.61.108', '8080', '上海 ', '2014-07-31 14:36:39', '117.79.73.166', '8080', '北京 ', '2014-07-31 14:37:12', '222.87.129.29', '80', '贵州 六盘水', '2014-07-31 14:35:03', '111.1.36.25', '83', '浙江 温州', '2014-07-31 14:35:12', '123.138.184.19', '8888', '陕西 西安', '2014-07-31 14:37:28', '211.138.121.37', '83', '浙江 ', '2014-07-31 14:39:39', '182.254.129.124', '80', '广东 深圳', '2014-07-31 14:39:25', '202.103.150.70', '8088', '广东 深圳', '2014-07-31 14:37:33', '61.174.9.96', '8080', '浙江 金华', '2014-07-31 14:35:57', '114.80.136.112', '7780', '上海 ', '2014-07-31 14:35:08', '116.236.203.238', '8080', '上海 ', '2014-07-31 14:38:41', '115.29.168.245', '18080', '北京 ', '2014-07-31 14:37:23', '61.135.153.22', '80', '北京 ', '2014-07-31 14:38:44', '218.16.99.253', '8081', '广东 东莞', '2014-07-31 14:37:10', '182.118.23.7', '8081', '河南 ', '2014-07-31 14:37:41', '123.138.68.172', '8000', '陕西 西安', '2014-07-31 14:36:51', '111.205.122.222', '80', '北京 ', '2014-07-31 14:38:18', '116.228.55.217', '8003', '上海 ', '2014-07-31 14:36:21', '119.188.46.42', '8080', '山东 ', '2014-07-31 14:36:37', '121.196.141.249', '80', '北京 ', '2014-07-31 14:35:55', '116.228.55.217', '8000', '上海 ', '2014-07-31 14:36:27', '183.129.212.180', '82', '浙江 杭州', '2014-07-31 14:39:59', '125.215.37.81', '3128', '上海 ', '2014-07-31 14:37:21', '183.57.42.79', '81', '广东 佛山', '2014-07-31 14:36:46', '183.136.221.6', '3128', '浙江 ', '2014-07-31 14:35:46', '121.199.59.43', '80', '北京 ', '2014-07-31 14:37:55', '115.29.225.229', '80', '北京 ', '2014-07-31 14:37:48', '122.227.8.190', '80', '浙江 金华', '2014-07-31 14:37:01', '218.75.155.242', '8888', '湖南 常德', '2014-07-31 14:39:35', '115.29.164.195', '8081', '北京 ', '2014-07-31 14:35:36', '115.29.28.137', '8090', '北京 ', '2014-07-31 14:36:46', '115.29.184.17', '82', '北京 ', '2014-07-31 14:37:19', '183.63.149.103', '80', '广东 广州', '2014-07-31 14:39:14', '116.236.216.116', '8080', '上海 ', '2014-07-31 14:36:14', '117.59.217.237', '83', '重庆 ', '2014-07-31 14:36:07', '111.206.125.75', '8080', '北京 ', '2014-07-31 14:35:49', '115.28.15.118', '82', '北京 ', '2014-07-31 14:37:02', '211.151.76.25', '80', '北京 ', '2014-07-31 14:36:36', '服务器地址', '端口', '位置', '速度', '上次检查', '211.151.59.251', '80', '北京 ', '2014-07-31 14:38:36', '210.73.220.18', '8088', '上海 ', '2014-07-31 14:35:49', '210.14.138.102', '8080', '北京 ', '2014-07-31 14:35:50', '61.234.123.64', '8080', '广东 珠海', '2014-07-31 14:36:54', '120.198.230.31', '80', '广东 ', '2014-07-31 14:37:36', '111.1.36.26', '83', '浙江 温州', '2014-07-31 14:40:03', '111.1.36.21', '80', '浙江 温州', '2014-07-31 14:36:30', '111.1.36.162', '80', '浙江 温州', '2014-07-31 14:39:20', '120.198.230.93', '80', '广东 ', '2014-07-31 14:38:12', '111.1.36.22', '80', '浙江 温州', '2014-07-31 14:36:00', '111.1.36.26', '82', '浙江 温州', '2014-07-31 14:40:01', '111.1.36.25', '85', '浙江 温州', '2014-07-31 14:35:07', '111.1.36.163', '80', '浙江 温州', '2014-07-31 14:37:25', '111.1.36.26', '84', '浙江 温州', '2014-07-31 14:35:06', '111.1.36.165', '80', '浙江 温州', '2014-07-31 14:37:26', '120.198.230.30', '80', '广东 ', '2014-07-31 14:37:35', '111.1.36.25', '80', '浙江 温州', '2014-07-31 14:35:39', '111.1.36.23', '80', '浙江 温州', '2014-07-31 14:35:31', '111.1.36.26', '85', '浙江 温州', '2014-07-31 14:35:29', '111.1.36.164', '80', '浙江 温州', '2014-07-31 14:37:56', '120.198.230.31', '81', '广东 ', '2014-07-31 14:39:53', '111.1.36.26', '80', '浙江 温州', '2014-07-31 14:35:37', '222.74.6.10', '8000', '内蒙古 呼和浩特', '2014-07-31 14:35:59', '120.198.230.31', '82', '广东 ', '2014-07-31 14:35:09', '222.89.155.62', '9000', '河南 驻马店', '2014-07-31 14:35:11', '120.198.243.130', '80', '广东 ', '2014-07-31 14:37:58', '211.151.50.179', '81', '北京 ', '2014-07-31 14:35:54', '211.138.121.38', '80', '浙江 ', '2014-07-31 14:36:08', '115.28.54.149', '80', '北京 ', '2014-07-31 14:35:12', '211.138.121.36', '80', '浙江 ', '2014-07-31 14:39:47', '211.138.121.37', '82', '浙江 ', '2014-07-31 14:39:41', '211.138.121.37', '80', '浙江 ', '2014-07-31 14:39:45', '211.138.121.36', '82', '浙江 ', '2014-07-31 14:39:36', '211.138.121.36', '81', '浙江 ', '2014-07-31 14:39:43', '211.138.121.38', '84', '浙江 ', '2014-07-31 14:36:11', '111.1.36.133', '80', '浙江 温州', '2014-07-31 14:36:19', '211.138.121.37', '81', '浙江 ', '2014-07-31 14:37:08', '218.240.156.82', '80', '福建 福州', '2014-07-31 14:35:32', '211.138.121.38', '81', '浙江 ', '2014-07-31 14:37:06', '114.112.91.116', '90', '江苏 ', '2014-07-31 14:37:04', '61.235.249.165', '80', '辽宁 沈阳', '2014-07-31 14:36:52', '124.238.238.50', '80', '河北 廊坊', '2014-07-31 14:38:37', '114.112.91.114', '90', '江苏 ', '2014-07-31 14:37:30', '114.112.91.115', '90', '江苏 ', '2014-07-31 14:37:04', '183.57.78.124', '8080', '广东 佛山', '2014-07-31 14:39:27', '61.155.169.11', '808', '江苏 苏州', '2014-07-31 14:37:14', '180.153.32.93', '8088', '上海 ', '2014-07-31 14:35:47', '110.232.64.93', '8080', '北京 ', '2014-07-31 14:37:10', '202.98.123.126', '8080', '四川 成都', '2014-07-31 14:35:05', '116.228.55.217', '80', '上海 ', '2014-07-31 14:36:29']
    ss=ss[5:]
    count=0
    ip=""
    for  x  in ['服务器地址', '端口', '位置', '速度', '上次检查']:
        ss.remove(x)
    for sss in ss:
        if count%4<2:
            ip+=sss+":"

        if count%4==2:
            proxy=ProxyIp.objects.create(ip=ip,time=time.time())
            proxy.save()
            ip=""
        count=count+1
    response.write(ss)
    return  response


'''
['182.254.129.123', '80', '广东 深圳', '2014-07-31 14:39:23', '121.10.120.135', '8001', '广东 ', '2014-07-31 14:35:34', '115.236.59.194', '3128', '浙江 杭州', '2014-07-31 14:35:36', '211.138.121.37', '84', '浙江 ', '2014-07-31 14:39:49', '211.152.50.70', '80', '上海 ', '2014-07-31 14:35:52', '218.89.170.110', '8888', '四川 攀枝花', '2014-07-31 14:39:52', '111.206.125.74', '8080', '北京 ', '2014-07-31 14:39:03', '218.204.131.250', '3128', '江西 南昌', '2014-07-31 14:37:06', '202.120.83.18', '9000', '上海 ', '2014-07-31 14:36:02', '115.28.213.143', '8000', '北京 ', '2014-07-31 14:36:48', '111.206.125.76', '8080', '北京 ', '2014-07-31 14:39:18', '111.206.125.77', '8080', '北京 ', '2014-07-31 14:39:16', '116.226.61.108', '8080', '上海 ', '2014-07-31 14:36:39', '117.79.73.166', '8080', '北京 ', '2014-07-31 14:37:12', '222.87.129.29', '80', '贵州 六盘水', '2014-07-31 14:35:03', '111.1.36.25', '83', '浙江 温州', '2014-07-31 14:35:12', '123.138.184.19', '8888', '陕西 西安', '2014-07-31 14:37:28', '211.138.121.37', '83', '浙江 ', '2014-07-31 14:39:39', '182.254.129.124', '80', '广东 深圳', '2014-07-31 14:39:25', '202.103.150.70', '8088', '广东 深圳', '2014-07-31 14:37:33', '61.174.9.96', '8080', '浙江 金华', '2014-07-31 14:35:57', '114.80.136.112', '7780', '上海 ', '2014-07-31 14:35:08', '116.236.203.238', '8080', '上海 ', '2014-07-31 14:38:41', '115.29.168.245', '18080', '北京 ', '2014-07-31 14:37:23', '61.135.153.22', '80', '北京 ', '2014-07-31 14:38:44', '218.16.99.253', '8081', '广东 东莞', '2014-07-31 14:37:10', '182.118.23.7', '8081', '河南 ', '2014-07-31 14:37:41', '123.138.68.172', '8000', '陕西 西安', '2014-07-31 14:36:51', '111.205.122.222', '80', '北京 ', '2014-07-31 14:38:18', '116.228.55.217', '8003', '上海 ', '2014-07-31 14:36:21', '119.188.46.42', '8080', '山东 ', '2014-07-31 14:36:37', '121.196.141.249', '80', '北京 ', '2014-07-31 14:35:55', '116.228.55.217', '8000', '上海 ', '2014-07-31 14:36:27', '183.129.212.180', '82', '浙江 杭州', '2014-07-31 14:39:59', '125.215.37.81', '3128', '上海 ', '2014-07-31 14:37:21', '183.57.42.79', '81', '广东 佛山', '2014-07-31 14:36:46', '183.136.221.6', '3128', '浙江 ', '2014-07-31 14:35:46', '121.199.59.43', '80', '北京 ', '2014-07-31 14:37:55', '115.29.225.229', '80', '北京 ', '2014-07-31 14:37:48', '122.227.8.190', '80', '浙江 金华', '2014-07-31 14:37:01', '218.75.155.242', '8888', '湖南 常德', '2014-07-31 14:39:35', '115.29.164.195', '8081', '北京 ', '2014-07-31 14:35:36', '115.29.28.137', '8090', '北京 ', '2014-07-31 14:36:46', '115.29.184.17', '82', '北京 ', '2014-07-31 14:37:19', '183.63.149.103', '80', '广东 广州', '2014-07-31 14:39:14', '116.236.216.116', '8080', '上海 ', '2014-07-31 14:36:14', '117.59.217.237', '83', '重庆 ', '2014-07-31 14:36:07', '111.206.125.75', '8080', '北京 ', '2014-07-31 14:35:49', '115.28.15.118', '82', '北京 ', '2014-07-31 14:37:02', '211.151.76.25', '80', '北京 ', '2014-07-31 14:36:36', '服务器地址', '端口', '位置', '速度', '上次检查', '211.151.59.251', '80', '北京 ', '2014-07-31 14:38:36', '210.73.220.18', '8088', '上海 ', '2014-07-31 14:35:49', '210.14.138.102', '8080', '北京 ', '2014-07-31 14:35:50', '61.234.123.64', '8080', '广东 珠海', '2014-07-31 14:36:54', '120.198.230.31', '80', '广东 ', '2014-07-31 14:37:36', '111.1.36.26', '83', '浙江 温州', '2014-07-31 14:40:03', '111.1.36.21', '80', '浙江 温州', '2014-07-31 14:36:30', '111.1.36.162', '80', '浙江 温州', '2014-07-31 14:39:20', '120.198.230.93', '80', '广东 ', '2014-07-31 14:38:12', '111.1.36.22', '80', '浙江 温州', '2014-07-31 14:36:00', '111.1.36.26', '82', '浙江 温州', '2014-07-31 14:40:01', '111.1.36.25', '85', '浙江 温州', '2014-07-31 14:35:07', '111.1.36.163', '80', '浙江 温州', '2014-07-31 14:37:25', '111.1.36.26', '84', '浙江 温州', '2014-07-31 14:35:06', '111.1.36.165', '80', '浙江 温州', '2014-07-31 14:37:26', '120.198.230.30', '80', '广东 ', '2014-07-31 14:37:35', '111.1.36.25', '80', '浙江 温州', '2014-07-31 14:35:39', '111.1.36.23', '80', '浙江 温州', '2014-07-31 14:35:31', '111.1.36.26', '85', '浙江 温州', '2014-07-31 14:35:29', '111.1.36.164', '80', '浙江 温州', '2014-07-31 14:37:56', '120.198.230.31', '81', '广东 ', '2014-07-31 14:39:53', '111.1.36.26', '80', '浙江 温州', '2014-07-31 14:35:37', '222.74.6.10', '8000', '内蒙古 呼和浩特', '2014-07-31 14:35:59', '120.198.230.31', '82', '广东 ', '2014-07-31 14:35:09', '222.89.155.62', '9000', '河南 驻马店', '2014-07-31 14:35:11', '120.198.243.130', '80', '广东 ', '2014-07-31 14:37:58', '211.151.50.179', '81', '北京 ', '2014-07-31 14:35:54', '211.138.121.38', '80', '浙江 ', '2014-07-31 14:36:08', '115.28.54.149', '80', '北京 ', '2014-07-31 14:35:12', '211.138.121.36', '80', '浙江 ', '2014-07-31 14:39:47', '211.138.121.37', '82', '浙江 ', '2014-07-31 14:39:41', '211.138.121.37', '80', '浙江 ', '2014-07-31 14:39:45', '211.138.121.36', '82', '浙江 ', '2014-07-31 14:39:36', '211.138.121.36', '81', '浙江 ', '2014-07-31 14:39:43', '211.138.121.38', '84', '浙江 ', '2014-07-31 14:36:11', '111.1.36.133', '80', '浙江 温州', '2014-07-31 14:36:19', '211.138.121.37', '81', '浙江 ', '2014-07-31 14:37:08', '218.240.156.82', '80', '福建 福州', '2014-07-31 14:35:32', '211.138.121.38', '81', '浙江 ', '2014-07-31 14:37:06', '114.112.91.116', '90', '江苏 ', '2014-07-31 14:37:04', '61.235.249.165', '80', '辽宁 沈阳', '2014-07-31 14:36:52', '124.238.238.50', '80', '河北 廊坊', '2014-07-31 14:38:37', '114.112.91.114', '90', '江苏 ', '2014-07-31 14:37:30', '114.112.91.115', '90', '江苏 ', '2014-07-31 14:37:04', '183.57.78.124', '8080', '广东 佛山', '2014-07-31 14:39:27', '61.155.169.11', '808', '江苏 苏州', '2014-07-31 14:37:14', '180.153.32.93', '8088', '上海 ', '2014-07-31 14:35:47', '110.232.64.93', '8080', '北京 ', '2014-07-31 14:37:10', '202.98.123.126', '8080', '四川 成都', '2014-07-31 14:35:05', '116.228.55.217', '80', '上海 ', '2014-07-31 14:36:29']
'''





'''
noteSearchByNoteId
'''
@csrf_exempt
def noteSearchByNoteId(req):
    response=HttpResponse()
    response['Content-type']="text/plain"
    if req.method=='POST' and req.session["username"]:
        try:
            noteid=str(req.POST.get('id',''))
            note=Note.objects.filter(noteId__exact=noteid)
            response.write('[{"code":"1","note":'+serializers.serialize("json", note)+'}]')
        except Exception:
            response.write('[{"code":'+Exception+'}]')
    return response