from django.db import models
import json

# Create your models here.
class Users(models.Model):
    Id=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=32)
    password=models.CharField(max_length=32)
    salt =models.CharField(max_length=32)
    name=models.CharField(max_length=10,blank=True)
    qq=models.CharField(max_length=20,blank=True)
    phone=models.CharField(max_length=20,blank=True)
    Email=models.EmailField(blank=True)
    icon=models.CharField(max_length=50,blank=True)
    introduction=models.TextField(blank=True)
    motto=models.TextField(blank=True)
    identity=models.CharField(max_length=10,blank=True)
    def __str__(self):
        return self.userId
    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))

class Theme(models.Model):
    themeId=models.AutoField(primary_key=True)
    type=models.CharField(max_length=10,blank=True)
    themeName=models.CharField(max_length=50,blank=True)
    themeContent=models.TextField(blank=True)
    userId=models.CharField(max_length=32)
    show=models.BooleanField(blank=True)
    icon=models.CharField(max_length=50,blank=True)
    point=models.BooleanField(blank=True)
    def __str__(self):
        return  '%s'%self.themeName

class Task(models.Model):
    taskId=models.AutoField(primary_key=True)
    type=models.CharField(max_length=10,blank=True)
    themeId=models.IntegerField()
    taskName=models.CharField(max_length=50,blank=True)
    taskContent=models.TextField(blank=True)
    time=models.CharField(max_length=13,blank=True)
    icon=models.CharField(max_length=50,blank=True)
    hits=models.IntegerField(blank=True)
    point=models.BooleanField(blank=True)
    def __str__(self):
        return  '%s'%self.taskName

class  Collection(models.Model):
    collectId=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=32)
    collectName=models.CharField(max_length=25,blank=True)
    description=models.TextField(blank=True)
    url=models.CharField(max_length=100,blank=True)
    time=models.CharField(max_length=13,blank=True)
    taskId=models.IntegerField()
    def __str__(self):
        return  '%s'%self.collectName

    def toJSON(self):
        return json.dumps(dict([(attr, getattr(self, attr)) for attr in [f.name for f in self._meta.fields]]))
    '''
    def toJSON(self):
    fields = []
    for field in self._meta.fields:
        fields.append(field.name)

    d = {}
    for attr in fields:
        d[attr] = getattr(self, attr)

    import json
    return json.dumps(d)
    '''

class Info(models.Model):
    infoId=models.AutoField(primary_key=True)
    infoTitle=models.CharField(max_length=50,blank=True)
    infoContent=models.TextField(blank=True)
    type=models.CharField(max_length=10,blank=True)
    read=models.BooleanField(blank=True)
    time=models.CharField(max_length=13,blank=True)
    userId=models.CharField(max_length=32)
    def __str__(self):
        return  '%s'%self.infoTitle

class Item(models.Model):
    itemId=models.AutoField(primary_key=True)
    taskId=models.IntegerField()
    oldName=models.CharField(max_length=50,blank=True)
    newName=models.CharField(max_length=50,blank=True)
    type=models.CharField(max_length=10,blank=True)
    path1=models.CharField(max_length=50,blank=True)
    path2=models.CharField(max_length=50,blank=True)
    theme=models.CharField(max_length=13,blank=True)
    introduce=models.TextField(blank=True)
    sort=models.IntegerField(blank=True)
    download=models.BooleanField(blank=True)
    def __str__(self):
        return  '%s'%self.oldName

class Note(models.Model):
    noteId=models.AutoField(primary_key=True)
    noteTitle=models.CharField(max_length=50,blank=True)
    noteUrl=models.CharField(max_length=50,blank=True)
    noteContent=models.TextField(blank=True)
    noteTime=models.CharField(max_length=13,blank=True)
    noteTag=models.CharField(max_length=10,blank=True)
    userId=models.CharField(max_length=32)
    def __str__(self):
        return  '%s'%self.noteTitle



class Tel(models.Model):
    telId=models.AutoField(primary_key=True)
    text=models.CharField(max_length=150 , blank=True)
    telName=models.CharField(max_length=30,blank=True)
    telContent=models.CharField(max_length=20,blank=True)
    code=models.CharField(max_length=10,blank=True)
    def __str__(self):
        return '%s'%self.telId



class Nu(models.Model):
    NId=models.AutoField(primary_key=True)
    NT=models.CharField(max_length=10)
    def __str__(self):
        return '%s'%self.NId


class ProxyIp(models.Model):
    Id=models.AutoField(primary_key=True)
    ip=models.CharField(max_length=22,blank=True)
    time=models.CharField(max_length=20,blank=True)
    addr=models.CharField(max_length=10,blank=True)
    def __str__(self):
        return '%s'%self.ip


























