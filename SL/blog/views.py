#coding:utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from SL.blog.models import Users,Theme,Task,Collection,Info,Item,Note
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
note编写页面
'''
@csrf_exempt
def notehtml(req):
    return render_to_response('note.html',{})

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





